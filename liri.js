const keys = require("./keys.js");
const axios = require("axios");
const fs = require("fs")

let command = process.argv[2];
// let command = "do-what-it-says";
let input = process.argv.splice(3).join("+");
console.log(`input: ${input}`)
// const spotify = keys.spotify;

require("dotenv").config();

var Spotify = require('node-spotify-api');

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
            limit: 1,
        }, function (err, data) {
            if (err) {
                return console.log(`error occurred: ${err}`);
            }
            let firstResult = data.tracks.items[0];
            let returnString = `
        Artist: ${firstResult.artists[0].name}
        Song: ${firstResult.name}
        Preview Link: ${firstResult.preview_url}
        Album: ${firstResult.album.name}
        `

            console.log(returnString);
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

    // doWhatItSays: function () {
    //     fs.readFile("random.txt", "utf8", function (error, data) {
    //         if (error) {
    //             return console.log(error);
    //         }
    //         let dataArr = data.split(",");
    //         console.log(dataArr);

    //         fsCommand = dataArr[0];
    //         console.log(`command: ${fsCommand}`);
    //         fsInput = dataArr.splice(1).join("+");
    //         console.log(`input: ${fsInput}`);

    //         switch (fsCommand) {
    //             case "concert-this":
    //                 this.getConcertInfo(fsInput);
    //                 break;
    //             case "spotify-this-song":
    //                 if (!fsInput) {
    //                     this.getSongInfo("The Sign - Ace of Base");
    //                     break;
    //                 }
    //                 this.getSongInfo(fsInput);
    //                 break;
    //             case "movie-this":
    //                 if (!fsInput) {
    //                     this.getMovieInfo("Mr. Nobody");
    //                     break;
    //                 }
    //                 this.getMovieInfo(fsInput);
    //                 break;
    //             default:
    //                 console.log("invalid input");
    //                 break;
    //         }
    //     })
    // },
}

doWhatItSays = function () {
    console.log("do what it says");
    fs.readFile("random.txt", "utf8", function (error, data) {
        console.log("do what it says first function");
        if (error) {
            return console.log(error);
        }
        let dataArr = data.split(",");
        console.log(dataArr);

        fsCommand = dataArr[0];
        console.log(`command: ${fsCommand}`);
        fsInput = dataArr.splice(1).join("+");
        console.log(`input: ${fsInput}`);

        switch (fsCommand) {
            case "concert-this":
                Liri.getConcertInfo(fsInput);
                break;
            case "spotify-this-song":
                if (!fsInput) {
                    Liri.getSongInfo("The Sign - Ace of Base");
                    break;
                }
                Liri.getSongInfo(fsInput);
                break;
            case "movie-this":
                if (!fsInput) {
                    Liri.getMovieInfo("Mr. Nobody");
                    break;
                }
                Liri.getMovieInfo(fsInput);
                break;
            default:
                console.log("invalid input");
                break;
        }
    })
}

if (command === "do-what-it-says") {
    doWhatItSays();
    command = null;
}

switch (command) {
    // case "do-what-it-says":
    //     Liri.doWhatItSays();
    //     break;
    case "concert-this":
        Liri.getConcertInfo(input);
        break;
    case "spotify-this-song":
        if (!input) {
            Liri.getSongInfo("The Sign - Ace of Base");
            break;
        }
        Liri.getSongInfo(input);
        break;
    case "movie-this":
        if (!input) {
            Liri.getMovieInfo("Mr. Nobody");
            break;
        }
        Liri.getMovieInfo(input);
        break;
    default:
        console.log("invalid input");
        break;
}

// process.exit();