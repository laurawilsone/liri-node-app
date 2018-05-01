

var keys = require("./keys.js");

var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');
var fs = require('fs');
var client = new Twitter(keys.twitterKeys);

var nodeArgv = process.argv;
var command = process.argv[2];
var x = "";

for (var i=3; i<nodeArgv.length; i++){
    if(i>3 && i<nodeArgv.length){
        x = x + "+" + nodeArgv[i];
    } else {
        x = x + nodeArgv[i];
    }
}

switch(command){
    case "my-tweets":
      showTweets();
    break;
  
    case "spotify-this-song":
      if(x){
        spotifySong(x);
      } else{
        spotifySong("Fluorescent Adolescent");
      }
    break;
  
    case "movie-this":
      if(x){
        omdbData(x)
      } else{
        omdbData("Mr. Nobody")
      }
    break;
  
    case "do-what-it-says":
      doThing();
    break;
  
    default:
      console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
    break;
  }

function showTweets(inputs) {

    var screenName = {screen_name: 'laura_wils204'};

        client.get('statuses/user_timeline', screenName, function(error, tweets, response) {
                    if(!error) {
                    for(i = 0; i < tweets.length; i ++){
                        var date = tweet[i].create_at;
                    console.log("@laura_wils204: " + tweets[i].text + " Created At: " + date.substring(0,19));

                    fs.appendFile('log.txt', "@laura_wils204: " + tweets[i].text + " Created At: " + date.substring(0, 19));
                    fs.appendFile('log.txt', "-----------------------");
                  }
                }else{
                  console.log('Error occurred');
                   
                }
            });
        };
    

    function spotifySong(song){
        spotify.search({ type: 'track', query: song}, function(error, data){
          if(!error){
            for(var i = 0; i < data.tracks.items.length; i++){
              var songData = data.tracks.items[i];
              //artist
              console.log("Artist: " + songData.artists[0].name);
              //song name
              console.log("Song: " + songData.name);
              //spotify preview link
              console.log("Preview URL: " + songData.preview_url);
              //album name
              console.log("Album: " + songData.album.name);
              console.log("-----------------------");
              
              //adds text to log.txt
              fs.appendFile('log.txt', songData.artists[0].name);
              fs.appendFile('log.txt', songData.name);
              fs.appendFile('log.txt', songData.preview_url);
              fs.appendFile('log.txt', songData.album.name);
              fs.appendFile('log.txt', "-----------------------");
            }
          } else{
            console.log('Error occurred.');
          }
        });
      }



function movie(inputs) {

    var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&tt3896198&apikey=e32f11f6";

    request(queryURL, function(error, response, body) {
        if (!inputs) {
            inputs = "Mr Nobody";
        }
            if (!error && response.statusCode === 200) {

                console.log("Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            }
    });
};

function doit() {
    fs.readFile('random.txt', "utf8", function(error,data) {

        if (error) {
        return console.log(error);
        }

        // Split it with commas
        var dataArr = data.split(",");

        if (dataArr[0] === "spotify-this-song") {
            var songcheck = dataArr[1].slice(1, -1);
            spotify(songcheck);

        } else if (dataArr[0] === "my-tweets") {
            var tweetname = dataArr[1].slice(1, -1);
            twitter(tweetname);

        } else if(dataArr[0] === "movie-this") {
            var movie_name = dataArr[1].slice(1, -1);
            movie(movie_name);
        }
    });

};