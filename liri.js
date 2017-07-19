
//Use inquirer to prompt for user actions
var inquirer = require("inquirer");
var callAction = "";
//8. Make it so liri.js can take in one of the following commands:
var nodeArgs = process.argv;
inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "What is your name?",
      name: "username"
    },
    {
      type: "checkbox",
      message: "What would you like to do?",
      choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'],
      name: "reqaction"
    },
    // Here we ask the user to confirm.
    {
      type: "confirm",
      message: "Are you sure:",
      name: "confirm",
      default: true
    }    
  ]).then(function(inquirerResponse) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    if (inquirerResponse.confirm == true) {
      callAction = inquirerResponse.reqaction;
      //console.log(inquirerResponse.reqaction);
      //console.log(callAction);

			switch(inquirerResponse.reqaction[0])
			{

				case "my-tweets":
					//console.log("my-tweets");
					//* This will show your last 20 tweets and when they were created at in your terminal/bash window.
					fnGetTweets(inquirerResponse.username);
					break;
				case "spotify-this-song":
					//console.log("spotify-this-song");
					inquirer
						  .prompt([
						    // Here we create a basic text prompt.
						    {
						      type: "input",
						      message: "What Song?",
						      name: "songname"
						    },
							{
						      type: "list",
						      message: "How many results?",
						      choices: ["1", "5", "10"],
						      name: "numResults"
						    }
						    ]).then(function(inquirerResponse) {
						    	//console.log(inquirerResponse.songname)
						    	fnSpotify(inquirerResponse.songname, inquirerResponse.numResults);
						    });
					
					
					break;
				case "movie-this":
					//console.log("movie-this");
					inquirer
						  .prompt([
						    // Here we create a basic text prompt.
						    {
						      type: "input",
						      message: "What Movie?",
						      name: "moviename"
						    }
						    ]).then(function(inquirerResponse) {
						    	//console.log(inquirerResponse.songname)
						    	fnGetMovieInfo(inquirerResponse.moviename);
						    });
					
					
					break;
				case "do-what-it-says":
					console.log("do-what-it-says");
					
					break;
				
				default:
					console.log("Did not recognize the command");
					break;

			}
		}
		else {
		      console.log("\nThat's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
		    }
	});
  



function fnGetTweets(username){
	var name = username;
	var Twitter = require('twitter');
 	var myTwitterKeys = require("./keys.js");
	var keys = myTwitterKeys.twitterKeys;
	var client = new Twitter({
	  consumer_key: keys['consumer_key'],
	  consumer_secret: keys['consumer_secret'],
	  access_token_key: keys['access_token_key'],
	  access_token_secret: keys['access_token_secret']
	});
	//*
	 
	var params = {screen_name: 'Champ Toby'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (!error) {
    	//console.log(tweets);
    	//var RecentTweets = JSON.parse(tweets);
    	for(i=0; i < tweets.length; i++){
    		console.log(tweets[i].text);


    	}

  	}
  	else{
  		console.log("error somewhere");
  	}
});





}

function fnGetMovieInfo(moviename){

	var nodeArgs = process.argv;
	//Sets Movie default to 'Mr. Nobody' in case one was not entered
	if (moviename == ""){
		moviename = "Mr. Nobody";
	}
		var request = require("request");
		// Then run a request to the OMDB API with the movie specified
		var queryUrl = "http://www.omdbapi.com/?t=" + moviename + "&y=&plot=short&apikey=40e9cece";
		// This line is just to help us debug against the actual URL.
		request(queryUrl, function(error, response, body) {
		  // If the request was successful...
		  if (!error && response.statusCode === 200) {
		    // Then log the body from the site!
		    var json = JSON.parse(body);
		    var ratings = json["Ratings"];
		    	console.log("==================== \n" +
		    	" Title: " + json["Title"] + "\n" +
       			" Released in: " + json["Year"] + "\n" +
		    	" IMDB Rating: " + json["imdbRating"] + "\n" + 
       		    " Rotten Tomatoes Rating: " + ratings[1].Value + "\n" +
       		    " Country Released: " + json["Country"] + "\n" +
       		    " Language: " + json["Language"] + "\n" +
       		    " Plot: " + json["Plot"] + "\n" +
       		    " Actors: " + json["Actors"] + "\n" +
       		    "====================");
		  }
		});
	



}

function fnSpotify(songname, numResults){
	var nodeArgs = process.argv;
	var SongName = songname;
	//console.log("got herer : " + songname);
 	var mySpotKeys = require("./keys.js");
	var keys = mySpotKeys.spotifyKeys;
	var Spotify = require('node-spotify-api');
 
	var spotify = new Spotify({
	  id: keys['client_id'],
	  secret: keys['client_secret']
	});
 
	spotify.search({ type: 'track', query: SongName, limit: numResults }, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }
		  else{
		  	var firstPageResults = data.tracks.items;
  			firstPageResults.forEach(function(track, index) {
			console.log("==================== \n" + 
			   	" Artist: " + track.artists[0].name + "\n" + 
			    " Track Name: " + track.name + "\n" + 
			    " Preview Here: " + track.preview_url + "\n" +
			    " Track HRef: " + track.href + "\n" + 
			    "====================");
			  });
			}
 	});
}