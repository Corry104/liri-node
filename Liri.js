//At the top of the liri.js file, add code to read and set any 
//environment variables with the dotenv package:

var Spotify = require('node-spotify-api');

require("dotenv").config();

var spotify = new Spotify(keys.spotify);
