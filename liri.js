const keys = require("./keys.js");
const axios = require("axios");
const fs = require("fs")
const Spotify = require('node-spotify-api');

const command = process.argv[2];
// let command = "do-what-it-says";
const input = process.argv.splice(3).join("+");
// console.log(`input: ${input}`)
// const spotify = keys.spotify;

require("dotenv").config();


//   axios.get("https://accounts.spotify.com/authorize?client_id=b0a904ec1a93415bbdb50f17e873480c&response_type=code&redirect_uri=localhost:8888").then(
//       function(response) {
//           console.log(response);
//       }
//   )

const Liri = {

    getSongInfo: function (song) {
        const spotify = new Spotify(keys.spotify);
        spotify.search({
            type: 'track',
            query: song,
            limit: 5,
        }, function (err, data) {
            if (err) {
                return console.log(`error occurred: ${err}`);
            }
            let firstResult = data.tracks.items.map((result) =>{

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
            function (response) {
                response.data.map(concertObject => {
                    let concertString = `
                Name: ${concertObject.venue.name}
                Location: ${concertObject.venue.city}, ${concertObject.venue.region} ${concertObject.venue.country}
                Date: ${concertObject.on_sale_datetime}
                `

                    console.log(concertString);

                })
            },
        ).catch(function (error) {
            console.log(error);
        })
    },

    getMovieInfo: function (movie) {
        axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + movie).then(
            function (response) {
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
        ).catch(function (error) {
            console.log(error);
        })
    },
}

let doAction = function (inputData, commandData) {

    switch (commandData) {
        case "concert-this":
            Liri.getConcertInfo(inputData);
            break;
        case "spotify-this-song":
            if (!inputData) {
                Liri.getSongInfo("The Sign - Ace of Base");
                break;
            }
            Liri.getSongInfo(inputData);
            break;
        case "movie-this":
            if (!inputData) {
                Liri.getMovieInfo("Mr. Nobody");
                break;
            }
            Liri.getMovieInfo(inputData);
            break;
        case "do-what-it-says":
            readfile();
        default:
            console.log("invalid input");
            break;
    }
}

let readfile = function () {

    fs.readFile("random.txt", "utf8", (error, data) => {
        // console.log("do what it says first function");
        if (error) throw err

        let dataArr = data.split(",");

        console.log(dataArr);

        fsCommand = dataArr[0];
        console.log(`command: ${fsCommand}`);
        fsInput = dataArr.splice(1).join("+");
        console.log(`input: ${fsInput}`);

        doAction(fsInput, fsCommand);
    })
}

doAction(input, command);