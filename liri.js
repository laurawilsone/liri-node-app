

var keys = require("./keys.js");

var request = require('request');
var Twitter = require('twitter');
var Spotify = require('spotify');
var fs = require('fs');

var userCommand = process.argv[2];
var secondCommand = process.argv[3];


for(i=4; i<process.argv.length; i++){
    secondCommand += '+' + process.argv[i];
}

function theGreatSwitch(){
	switch(userCommand){

		case 'my-tweets':
		showTweets();
		break;

		case 'spotify-this-song':
		spotifySong();
		break;

		case 'movie-this':
		omdbData();
		break;

		case 'do-what-it-says':
		followTheTextbook();
		break;
		
	}
  
};

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
    

        function spotifySong(){
            console.log("Music for DAYS!");
        
            //variable for search term, test if defined.
        
            var searchTrack;
            if(secondCommand === undefined){
                searchTrack = "What's My Age Again?";
            }else{
                searchTrack = secondCommand;
            }
            //launch spotify search
            spotify.search({type:'track', query:searchTrack}, function(err,data){
                if(err){
                    console.log('Error occurred: ' + err);
                    return;
                }else{
                    //tried searching for release year! Spotify doesn't return this!
                      console.log("Artist: " + data.tracks.items[0].artists[0].name);
                    console.log("Song: " + data.tracks.items[0].name);
                    console.log("Album: " + data.tracks.items[0].album.name);
                    console.log("Preview Here: " + data.tracks.items[0].preview_url);
                }
            });
        };//end spotifyMe



      function omdbData(movie){
        var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';
      
        request(omdbURL, function (error, response, body){
          if(!error && response.statusCode == 200){
            var body = JSON.parse(body);
      
            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMdB Rating: " + body.imdbRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
            console.log("Rotten Tomatoes URL: " + body.tomatoURL);
      
            //adds text to log.txt
            fs.appendFile('log.txt', "Title: " + body.Title);
            fs.appendFile('log.txt', "Release Year: " + body.Year);
            fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
            fs.appendFile('log.txt', "Country: " + body.Country);
            fs.appendFile('log.txt', "Language: " + body.Language);
            fs.appendFile('log.txt', "Plot: " + body.Plot);
            fs.appendFile('log.txt', "Actors: " + body.Actors);
            fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
            fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);
      
          } else{
            console.log('Error occurred.')
          }
          if(movie === "Mr. Nobody"){
            console.log("-----------------------");
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");
      
            //adds text to log.txt
            fs.appendFile('log.txt', "-----------------------");
            fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            fs.appendFile('log.txt', "It's on Netflix!");
          }
        });
      
      }

      function doThing(){
        fs.readFile('random.txt', "utf8", function(error, data){
          var txt = data.split(',');
      
          spotifySong(txt[1]);
        });
      }
