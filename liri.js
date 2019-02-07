//Required NPM modules and files.


//Relative file path to .env, which contains Spotify keys
require("dotenv").config();

//Relative file path to random.txt
var fs = require("fs");

//Require Keys
var keys = require("./keys.js")

// Require Spotify API
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

//Require Axios
var axios = require("axios");

//Require Moment
var moment = require('moment');

//Other variables

var command = process.argv[2];

var songName = process.argv[3];

var Artist = process.argv[3];

var movie = process.argv[3];

//Switch case statements for 'concert-this' command.

switch (command) {

    case "concert-this":

        if (Artist == null) {

            var text = (command + " :: " + Artist + "\n" + "I'm sorry nobody is playing in your neighborhood, please try your search again...");

            console.log("I'm sorry nobody is playing in your neighborhood, please try your search again...");

        } else {

            axios.get("https://rest.bandsintown.com/artists/" + Artist + "/events?app_id=codingbootcamp")

                .then(function (response) {

                        console.log(Artist + " is playing at the...");

                        console.log("Name of the venue: " + response.data[0].venue.name);

                        console.log("Location: " + response.data[0].venue.city);

                        console.log("Date of event: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));

                    },
                    function (error) {

                        if (error.response) {

                            console.log(error.response.data);

                            console.log(error.response.status);

                            console.log(error.response.headers);

                        } else if (error.request) {

                            console.log(error.request);

                        } else {

                            console.log('Error', error.message);

                        }

                        console.log(error.config);
                    }
                )
        }

        break;

//Switch case statement for 'spotify-this-song' command. 

    case "spotify-this-song":

        if (songName == null) {

            if (command) {

                spotify.request('https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc')

                    .then(function (data) {

                        var artists = data.artists[0].name;

                        var songTitle = data.name;

                        var songUrl = data.preview_url;

                        var songAlbum = data.album.name;

                        console.log("Artist(s): " + data.artists[0].name);

                        console.log("The Song's Name: " + data.name);

                        console.log("Spotify Preview Link: " + data.preview_url);

                        console.log("Album: " + data.album.name);

                    });
            }

        } else {

            if (command) {

                spotify.search({

                        type: "track",

                        query: songName,

                        limit: 10
                    },

                    function (err, data) {

                        if (err) {

                            console.log('Error occurred: ' + err);

                            return;

                        } else {

                            var songInfo = data.tracks.items[0];

                            var artists = songInfo.artists[0].name;

                            var songTitle = songInfo.name;

                            var songUrl = songInfo.preview_url;

                            var songAlbum = songInfo.album.name;

                            console.log("Artist(s): " + artists);

                            console.log("The Song's Name: " + songInfo.name);

                            console.log("Spotify Preview Link: " + songInfo.preview_url);

                            console.log("Album: " + songInfo.album.name);
                                }

                            });
                        };
        }

        break;


    //Switch case statement for 'movie-this' command.    
        case "movie-this" :
        
        if (movie == null) {

            axios.get("https://omdbapi.com/?t=mr.nobody&apikey=trilogy")

                .then(function (resp) {
                    //console.log(resp.data);
                    console.log("Movie Title: " + resp.data.Title);
                    console.log("Year Released: " + resp.data.Year);
                    console.log("IMDB Rating: " + resp.data.imdbRating);
                    console.log("Rotten Tomatoes Rating: " + resp.data.Ratings[1].Value);
                    console.log("Country Produced: " + resp.data.Country);
                    console.log("Language of the Movie: " + resp.data.Language);
                    console.log("Movie Plot: " + resp.data.Plot);
                    console.log("Movie Actors: " + resp.data.Actors);

                }, function (error) {

                    if (error.resp) {
                        
                        console.log(error.resp.data);
                        console.log(error.resp.status);
                        console.log(error.resp.headers);

                    } else if (error.request) {
                       
                        console.log(error.request);

                    } else {
                        
                        console.log('Error', error.message);
                    }
                        console.log(error.config);
                })

        } else {

            axios.get("https://omdbapi.com/?t=" + movie  + "&apikey=trilogy")
            
            .then(function(resp) {
            
                console.log("Movie Title: " + resp.data.Title);
                console.log("Year Released: " + resp.data.Year);
                console.log("IMDB Rating: " + resp.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + resp.data.Ratings[1].Value);
                console.log("Country Produced: " + resp.data.Country);
                console.log("Language of the Movie: " + resp.data.Language);
                console.log("Movie Plot: " + resp.data.Plot);
                console.log("Movie Actors: " + resp.data.Actors);

            }, function(error) {

                if (error.resp) {
                    
                    console.log(error.resp.data);
                    console.log(error.resp.status);
                    console.log(error.resp.headers);

                } else if (error.request) {
                
                    console.log(error.request);

                } else {
                    
                    console.log('Error', error.message);

                }

                console.log(error.config);
            })
        }

    break;

// Switch case statement for 'do-what-it-says' command.
case "do-what-it-says" :
        fs.readFile("random.txt", "utf8", function (error, data) {

            if (error) {
                return console.log(error);
            }

            var dataArr = data.split(",");

            var song = dataArr[1];

            spotify.search({

                type: "track",

                query: song,

                limit: 1
            },

            function (err, data) {

                if (err) {

                    console.log('Error occurred: ' + err);

                    return;

                } else {

                    var songInfo = data.tracks.items[0];

                    var artists = songInfo.artists[0].name;

                    var songTitle = songInfo.name;

                    var songUrl = songInfo.preview_url;

                    var songAlbum = songInfo.album.name;

                    console.log("Artist(s): " + artists);

                    console.log("The Song's Name: " + songInfo.name);

                    console.log("Spotify Preview Link: " + songInfo.preview_url);

                    console.log("Album: " + songInfo.album.name);

                };

            })
            
        });
        
    break;

    default : 

        console.log("I'm so sorry, but your search returned no valuable results...");
    
} 