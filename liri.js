//Start with step 7 of the homework instructions
var myTwitterKeys = require("./keys.js");

var keys = myTwitterKeys.twitterKeys;


for (var key in keys) {
  if (keys.hasOwnProperty(key)) {
    console.log(key + " -> " + keys[key]);
  }
}

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
		
		break;
	case "spotify-this-song":
		console.log("spotify-this-song");
		
		break;
	case "movie-this":
		console.log("movie-this");
		
		break;
	case "do-what-it-says":
		console.log("do-what-it-says");
		
		break;
	
	default:
		console.log("Did not recognize the command");
		break;

}
