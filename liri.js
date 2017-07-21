

var inquirer = require("inquirer");
var callAction = "";
var nodeArgs = process.argv;
inquirer
  .prompt([
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
    {
      type: "confirm",
      message: "Are you sure:",
      name: "confirm",
      default: true
    }    
  ]).then(function(inquirerResponse) {
    
    if (inquirerResponse.confirm == true) {
      callAction = inquirerResponse.reqaction;
      		switch(inquirerResponse.reqaction[0])
			{
				case "my-tweets":
					fnGetTweets(inquirerResponse.username);
					break;
				case "spotify-this-song":
					inquirer
						  .prompt([
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
						    	fnSpotify(inquirerResponse.songname, inquirerResponse.numResults);
						    });
					
					
					break;
				case "movie-this":
					inquirer
						  .prompt([
						    {
						      type: "input",
						      message: "What Movie?",
						      name: "moviename"
						    }
						    ]).then(function(inquirerResponse) {
						    	fnGetMovieInfo(inquirerResponse.moviename);
						    });
					break;
				case "do-what-it-says":
					fnDoWhatItSays();					
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
	
	var params = {screen_name: 'Champ Toby'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (!error) {
    	for(i=0; i < tweets.length; i++){
    		var tweet_date = new Date(Date.parse(tweets[i].created_on));
			console.log("==================== \n" +
    			"Tweeted on: " + tweet_date + "\n" +
    			"Message: " + tweets[i].text + "\n" +
    			"====================");
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
	var SongName = ""
	var defaultSong = false;
	if(songname === ""){
		SongName = "Ace of Base";//use band since song list is static
		defaultSong = true;
		numResults = 20;
	}
	else{
		SongName = songname;
	}
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
		  	if(defaultSong == true){
		  		//loop through results and find "Ace of Base", "The Sign"
		  		//node-spotify-api only has one search function that can
		  		//search artist OR song but not both
		  		//use "Ace of Base" as default since their songs are static vs. "the sing"
		  		//which brings back varying results
		  		var firstPageResults = data.tracks.items;
	  			firstPageResults.forEach(function(track, index) {
					if(track.name == "The Sign"){
						console.log("==================== \n" + 
						   	" Artist: " + track.artists[0].name + "\n" + 
						    " Track Name: " + track.name + "\n" + 
						    " Preview Here: " + track.preview_url + "\n" +
						    " Track HRef: " + track.href + "\n" + 
						    "====================");
					}  
				});

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
			}
 	});
}

function fnDoWhatItSays(){
	var fs = require("fs");
	fs.readFile("random.txt", "utf8", function(error, data) {
  	  if (error) {
	    return console.log(error);
	  }
	  var dataArr = data.split(",");
	  fnSpotify(dataArr[1], 1);

	  });




}