const keys = require("./keys.js");
const axios = require("axios");

const command = process.argv[2];
const input = process.argv.splice(3).join("+");
const spotify = keys.spotify;
// const spotify = new Spotify(keys.spotify);

// require("dotenv").config();

  /* Load the HTTP library */
  var http = require("http");

  /* Create an HTTP server to handle responses */

  http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }).listen(8888);

  
  axios.get("https://accounts.spotify.com/authorize?client_id=b0a904ec1a93415bbdb50f17e873480c&response_type=code&redirect_uri=localhost:8888").then(
      function(response) {
          console.log(response);
      }
  )

  console.log(spotify);




const getSongInfo = function (song) {
    axios.get("")
}

switch (command) {
    case "concert-this":
        break;
    case "spotify-this-song":
        console.log(getSongInfo(input));
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