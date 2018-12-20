//At the top of the liri.js file, add code to read and set any 
//environment variables with the dotenv package:


// Here we declare our variables
var fs = require("fs");
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");
var dotenv = require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


// we start the program by asking user what they are looking for
inquirer.prompt([
    {
        type: "list",
        message: "ask Liri what you are looking for",
        choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
        name: "userCommand"
    },

]).then(function (userResponse) {
    myFunction(userResponse.userCommand);
    if (userResponse.userCommand === "do-what-it says") {
        doWhatItSays();
    }
});

// list of actions the user can choose from 
const myFunction = action => {
    switch (action) {
        case "concert-this": concertThis();
            break;
        case "movie-this": movieThis();
            break;
        case "spotify-this-song": spotifyThis();
            break;
    }
}

// Here we run the bands in town function
function concertThis() {
    inquirer.prompt([
        {
            type: "input",
            message: "Which band(s) are you interested in?: ",
            name: "band"
        },
    ]).then(function (response) {
        fs.appendFile("log.txt", response.band + "\n", function (err) {

            // If an error was experienced we will log it.
            if (err) {
                console.log(err);
            }

            // If no error is experienced, we'll log the phrase "Content Added" to our node console.
            else {
                console.log("Content Added!");
            }

        });

        axios.get("https://rest.bandsintown.com/artists/" + response.band + "/events?app_id=codingbootcamp")
            .then(function (response) {
                console.log("~~~~~~~~~~~~~");
                console.log("Band: " + response.data[0].lineup[0]);
                console.log("Venue: " + response.data[0].venue.name);
                console.log("Location: " + response.data[0].venue.country);
                console.log(response.data[0].venue.city);
                console.log(response.data[0].venue.region);
                console.log("Date of event: " + response.data[0].datetime);
                console.log("~~~~~~~~~~~~~");
                if (response === undefined) {
                    console.log("Sorry " + response.band + "has no scheduled concerts anytime soon!")
                }
            }

            );
    })
}

// Here we run the movies function
function movieThis() {
    inquirer.prompt([
        {
            type: "input",
            message: "Which movie are you interested in?: ",
            name: "movie"
        },
    ]).then(function (response) {
        fs.appendFile("log.txt", response.movie + "\n", function (err) {

            // If an error was experienced we will log it.
            if (err) {
                console.log(err);
            }

            // If no error is experienced, we'll log the phrase "Content Added" to our node console.
            else {
                console.log("Content Added!");
            }

        });


        axios.get("http://www.omdbapi.com/?t=" + response.movie + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log("~~~~~~~~~~~~~");
                console.log("Movie Title: " + response.data.Title);
                console.log("Year of the movie: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Movie Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("~~~~~~~~~~~~~");

            }
        );
    })

}

// Here we run the spotify function
function spotifyThis() {
    inquirer.prompt([
        {
            type: "input",
            message: "Which song do you want to play: ",
            name: "song"
        },
    ]).then(function (response) {
        fs.appendFile("log.txt", response.song + "\n", function (err) {

            // If an error was experienced we will log it.
            if (err) {
                console.log(err);
            }

            // If no error is experienced, we'll log the phrase "Content Added" to our node console.
            else {
                console.log("Content Added!");
            }

        });


        spotify.search({ type: 'track', query: response.song }, function (err, data) {
            if (err) {
                return console.log(data);
            }
            console.log("~~~~~~~~~~~~~~~~~~~");
            console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
            console.log("Name Of The Song: " + data.tracks.items[0].name);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("~~~~~~~~~~~~~~~~~~~");


        });
    })

}
