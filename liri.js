const keys = require("./keys.js");
const axios = require("axios");

const command = process.argv[2];
const input = process.argv.splice(3).join("+");
// const spotify = keys.spotify;

require("dotenv").config();

var Spotify = require('node-spotify-api');

//   axios.get("https://accounts.spotify.com/authorize?client_id=b0a904ec1a93415bbdb50f17e873480c&response_type=code&redirect_uri=localhost:8888").then(
//       function(response) {
//           console.log(response);
//       }
//   )

const getSongInfo = function (song) {
    const spotify = new Spotify(keys.spotify);
    spotify.search({
        type: 'track',
        query: song,
        limit: 1,
    }, function(err, data){
        if(err){
            return console.log(`error occurred: ${err}`);
        }
        let firstResult = data.tracks.items[0];
        let returnString =`
        Artist: ${firstResult.artists[0].name}
        Song: ${firstResult.name}
        Preview Link: ${firstResult.preview_url}
        Album: ${firstResult.album.name}
        `

        console.log(returnString);
    })
}

const getConcertInfo = function(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response) {
            response.data.map(concertObject => {
                let concertString =`
                Name: ${concertObject.venue.name}
                Location: ${concertObject.venue.city}, ${concertObject.venue.region} ${concertObject.venue.country}
                Date: ${concertObject.on_sale_datetime}
                `

                console.log(concertString);

            })
        },
    ).catch(function(error) {
        console.log(error);
    })
}

switch (command) {
    case "concert-this":
        getConcertInfo(input);
        break;
    case "spotify-this-song":
        if(!input){
            getSongInfo("The Sign - Ace of Base")
            break
        }
        getSongInfo(input);
        break;
    case "movie-this":
        break;
    case "do-what-it-says":
        break;
    default:
        console.log("invalid input");
        break;
}

// process.exit();