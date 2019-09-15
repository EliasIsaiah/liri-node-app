const keys = require('./keys.js');
const axios = require('axios');
const Spotify = require('node-spotify-api');
const moment = require('moment')

require("dotenv").config();

const Liri = {

    getSongInfo: function (song) {
        const spotify = new Spotify(keys.spotify);
        spotify.search({
            type: 'track',
            query: song,
            limit: 3,
        }, (err, data) => {
            if (err) {
                return console.log(`error occurred: ${err}`);
            }
            data.tracks.items.map((result) => {

                let returnString = `
            Artist: ${result.artists[0].name}
            Song: ${result.name}
            Preview Link: ${result.preview_url}
            Album: ${result.album.name}
            `

                console.log(returnString);
            });
        })
    },

    getConcertInfo: function (artist) {
        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
            (response) => {
                response.data.map(concertObject => {
                    let concertString = `
                Name: ${concertObject.venue.name}
                Location: ${concertObject.venue.city}, ${concertObject.venue.region} ${concertObject.venue.country}
                Date: ${concertObject.on_sale_datetime ? moment(concertObject.on_sale_datetime).format("MM-DD-YYYY") : `N/A`}
                `

                    console.log(concertString);

                })
            },
        ).catch((error) => {
            console.log(error);
        })
    },

    getMovieInfo: function (movie) {
        axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + movie).then(
            (response) => {
                let movieString = `
                    Title: ${response.data.Title}
                    Year: ${response.data.Year}
                    IMDB Rating: ${response.data.imdbRating}
                    Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
                    Country where the movie was produced: ${response.data.Country}
                    Language: ${response.data.Language}
                    Plot: ${response.data.Plot}
                    Actors: ${response.data.Actors}
                    `

                console.log(movieString)

            },
        ).catch((error) => {
            console.log("An error has occurred. Please check your internet connection or try a different movie.\n" + error);
        })
    },
}

module.exports = Liri;