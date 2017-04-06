// Write the code you need to grab the data from keys.js. 
// Then store the keys in a variable.

// Make it so liri.js can take in one of the following commands:
// my-tweets - show your last 20 tweets and when they were created at in your terminal/bash window.
// spotify-this-song - 
// This will show the following information about the song in your terminal/bash window
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// If no song is provided then default to "The Sign" by Ace of Base
// movie-this
// do-what-it-says

var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var program = process.argv[2];

switch (program) {
    case "my-tweets":
        tweets();
        break;

    case "spotify-this-song":
        spotifyPlay();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        doit();
        break;
}

function tweets() {

    var client = new twitter({
        consumer_key: 'c11tiHn2Rnc8TaPINc0Tjj0c9',
        consumer_secret: 'nPJTLw28BIxb9tUXa6seIx9lWqOWZPSUL3LTeVbmUy4hUCLFj8',
        access_token_key: '846452511653478403-Wblgx6xXGLMMlCYYoWwRzhv2DMZFNv0',
        access_token_secret: 'TYpxR3BuV3IDty3xKDcCnXd5JUeQp7hrcNMeGML7iPGCM'
    });

    var params = {
        screen_name: "Caroline_Dough",
        count: 1
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(JSON.stringify(tweets, null, 2));
        }
    });
}

function spotifyPlay() {

    var songName = "";
    var nodeSongArgs = process.argv;

    // Create an empty string for holding the song

    // Capture all the words in the song (ignoring the first three Node arguments)
    for (var i = 3; i < nodeSongArgs.length; i++) {

        // Build a string with the address.
        songName = songName + " " + nodeSongArgs[i];
    }

    // Log the address we built
    console.log("I want to listen to" + songName);

    spotify.search({ type: 'track', query: songName}, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

    });
}


function movie() {

    var movieName = "";
    var nodeMovieArgs = process.argv;

    for (var i = 3; i < nodeMovieArgs.length; i++) {

        if (i > 3 && i < nodeMovieArgs.length) {

            movieName = movieName + "+" + nodeMovieArgs[i];

        } else {

            movieName += nodeMovieArgs[i];

        }
        console.log(movieName);
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";
    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {

            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            // console.log("IMBD Rating: " + JSON.parse(body).Rating[0].value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
        // else if (movieName = "") {
        // 	movieName = "Mr. Nobody"
        // }
    });
}