const fs = require('fs')
const inquirer = require('inquirer')
const Liri = require('./liri.js');


require("dotenv").config();

const doAction = (inputData, commandData) => {

    switch (commandData) {
        case "concert-this":
            inputData ? Liri.getConcertInfo(inputData) : console.log("invalid input");
            break;

        case "spotify-this-song":
            inputData ? Liri.getSongInfo(inputData) : Liri.getSongInfo("The Sign - Ace of Base");
            break;

        case "movie-this":
            inputData ? Liri.getMovieInfo(inputData) : Liri.getMovieInfo("Mr. Nobody");
            break;
        case "do-what-it-says":
            readTheFile();
        default:
            console.log("invalid input");
            break;
    }
}

const readTheFile = () => {

    fs.readFile("random.txt", "utf8", (error, data) => {
        if (error) throw error 

        let dataArr = data.split(",");

        fsCommand = dataArr[0];
        console.log(`command: ${fsCommand}`);
        fsInput = dataArr.splice(1).join("+");
        console.log(`input: ${fsInput}`);

        doAction(fsInput, fsCommand);
    })
}

const doPrompt = () => {
    inquirer.prompt([{
        type: "list",
        name: "command",
        message: "What would you like to do?",
        choices: ["Look up a concert", "Look up a song", "Look up a movie", "Do what it says"]
    }]).then((answers) => {
        console.log(answers);

        switch (answers.command) {
            case "Look up a concert":
                inquirer.prompt([{
                    name: "concertThis",
                    message: "Enter concert search string here."
                }]).then((userInput) => {
                    doAction(userInput.concertThis, "concert-this");
                });
                break;

            case "Look up a song":
                inquirer.prompt([{
                    name: "spotifyThisSong",
                    message: "Enter song search string here."
                }]).then((userInput) => {
                    doAction(userInput.spotifyThisSong, "spotify-this-song");
                });
                break;

            case "Look up a movie":
                inquirer.prompt([{
                    name: "movieThis",
                    message: "Enter movie search string here."
                }]).then((userInput)=>{
                    doAction(userInput.movieThis, "movie-this");
                })
                break;

            case "Do what it says":
                readTheFile();
                break;

            default:
                console.log("invalid input");
        }

    })
}
doPrompt();