//Start with step 7 of the homework instructions


//8. Make it so liri.js can take in one of the following commands:

//   * `my-tweets`

//   * `spotify-this-song`

//   * `movie-this`

//   * `do-what-it-says`
switch(process.argv[2])
{

	case "my-tweets":
		console.log("my-tweets");
		//* This will show your last 20 tweets and when they were created at in your terminal/bash window.
		fnGetTweets();
		break;
	case "spotify-this-song":
		console.log("spotify-this-song");
		
		break;
	case "movie-this":
		//console.log("movie-this");
		fnGetMovieInfo();
		
		break;
	case "do-what-it-says":
		console.log("do-what-it-says");
		
		break;
	
	default:
		console.log("Did not recognize the command");
		break;

}


function fnGetTweets(){

	var Twitter = require('twitter');
 	var myTwitterKeys = require("./keys.js");
	var keys = myTwitterKeys.twitterKeys;


	/*for (var key in keys) {
	  if (keys.hasOwnProperty(key)) {
	    console.log(key + " -> " + keys[key]);
	  }
	}*/
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
    	console.log(tweets);
  	}
  	else{
  		console.log("error somewhere");
  	}
});





}

function fnGetMovieInfo(){

	var nodeArgs = process.argv;
	var movieName = "";

	for(var i = 2; i < nodeArgs.length; i++){

		if (i > 2 && i < nodeArgs.length){
			if(movieName === ""){
				movieName = nodeArgs[i];
			}
			else{
				movieName = movieName + "+" + nodeArgs[i];
			}
			
			
		}
	}
		//console.log(movieName);
		var request = require("request");
		// Then run a request to the OMDB API with the movie specified
		var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
		// This line is just to help us debug against the actual URL.
		//console.log(queryUrl);
		request(queryUrl, function(error, response, body) {
		  // If the request was successful...
		  if (!error && response.statusCode === 200) {
		    // Then log the body from the site!
		    var json = JSON.parse(body);
		    //console.log(json);
		    //* Title of the movie.
       		console.log(json["Title"]);
       		//* Year the movie came out.
		    console.log(json["Year"]);
		    //* IMDB Rating of the movie.
       		console.log(json["imdbRating"]);
       		//* Rotten Tomatoes Rating of the movie.
       		var ratings = JSON.stringify(json["Ratings"]);
		    console.log(ratings);
       		//* Country where the movie was produced.
       		console.log(json["Country"]);
       		//* Language of the movie.
       		console.log(json["Language"]);
       		//* Plot of the movie.
       		console.log(json["Plot"]);
       		//* Actors in the movie.
       		console.log(json["Actors"]);
		  }
		});
	



}