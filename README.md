# liri-node-application

The Language Interpretation and Recognition Interface (LIRI) is a command line node application that takes in parameters and returns data. 

Using the command line, LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

**What Each Command Does**
1. Concert-This --- node liri.js concert-this <artist/band name here>
  * This will search the Bands in Town Artist API for an artist and render the following information to the terminal: (View screenshot). 
    * Name of the venue
    * Venue location
    * Date of the event
  * ![COMMANDS] (images/liri-commands.png)

2. Spotify-This-Song --- node liri.js spotify-this-song <'song name here'>
  * This will search the Spotify API and return the following information in terminal: (View screenshot).
    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song appears  on
  * If no song is provided, the program will default to "The Sign" by Ace of Base.

3. Movie-This --- node liri.js movie-this <'movie name here'>
  * This will search the OMDB API for a movie and render the following information to the terminal: (View screenshot).
    * Title of the movie
    * Year the movie came out
    * IMDB Rating of the movie
    * Rotten Tomatoes Rating of the movie
    * Country where the movie was produced
    * Language of the movie
    * Plot of the movie
    * Actors in the movie.
  * If no movie is provided, the program will output data for the movie 'Mr. Nobody.' (View screenshot)

4. Do-What-It-Says --- node liri.js do-what-it-says
  * Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands. (View screenshot).
