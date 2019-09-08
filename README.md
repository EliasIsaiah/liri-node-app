# liri-node-app
#### LIRI is a command line node app that takes in parameters and gives you back data.

Specifically, Liri provides information on concerts, songs, and movies.

Technologies used on this application:

* Node.js

Dependencies:
* [dotenv](https://www.npmjs.com/package/dotenv)
* [axios](https://www.npmjs.com/package/axios)
* [inquirer](https://www.npmjs.com/package/inquirer)
* [moment.js](https://momentjs.com/)

How to use Liri:

Prequisites: 
* you must have node.js installed on your system as that is what Liri runs on.
* you will need a Spotify ID and a Spotify Secret stored in a local .env file in order for this application to run

DISCLAIMER:
This application requires the user to be familiar with node.js and how to run CLI applications.

Steps:

1. download or clone the liri-node-app repository
2. navigate to the repo on your local machine and run `npm install` in order to install the required packages for the application
![npm install gif](./media/npm_install.gif)
3. From the terminal run the application by running `node app`. At that point you can use the Inquirer interface to select four different functions:

       
    ```javascript
    switch(input) {

        case "Look up a concert":
            [...]
        case "Look up a song":
            [...]
        case "Look up a movie":
            [...]
        case "Do what it says":
            [...]
            
    }
    ```
        

gif examples:
* Look up a concert: (returns multiple concerts)
>![concert-this gif](./media/inquirer_concert.gif)

* spotify-this-song: (returns three songs)
>![spotify-this-song gif](./media/inquirer_spotify.gif)

* movie-this:
>![movie-this gif](./media/inquirer_movie.gif)

The last argument "do-what-it-says" reads what is written in "random.txt" and executes it. The text in random.txt must follow a fairly strict format as there not much cleaning done to it (read:none) as it is passed directly into the program.

All text in random.txt must follow the format of ARGUMENT,SEARCH STRING

The arguments available are:
* concert-this
* spotify-this-song
* movie-this

you can see movie-this and spotify-this-song in action below:
>![do-what-it-says gif](./media/inquirer_do_what_it_says.gif)



