//At the top of the liri.js file, add code to read and set any 
//environment variables with the dotenv package:

var Spotify = require('node-spotify-api');

var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var movieTitle = "titanic";
var artistName = "Maroon 5";

axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy").then(
    function(response) {
    //   console.log(response.data);
    }
   );

axios.get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp").then(
    function(response) {
    console.log(response.data[0].lineup[0]);
    console.log(response.data[0].venue.name);
    console.log(response.data[0].datetime);
    }
   );
      
