//Twitter API Credentials
var TwitterPackage = require('twitter');

var secret = {
  consumer_key: 'Rwb9XLEI1IepiKGFHOAaJLIuz',
  consumer_secret: 'DrWWt7Yk0w0v49Os41TixSCN6pcnPtvSS85ieGb8IambkmFao2',
  access_token_key: '819789708876124162-tCYxnTWibQ7yB1hsWZWArD6qjTN39de',
  access_token_secret: 'ECNtZJc1wYmJMBA6AocB4mX0YGAGFIhPcMtul9DeXKPo4'
}

var Twitter = new TwitterPackage(secret);

//The voice of Angry Weather Bot
var Response = [
  'why don\'t you look out a fucking window',
  'I hope you realize you could have googled "weather" in half the time it took you to tweet me',
  'just get off your ass and go look outside',
  'sorry, can\'t, just crashed',
  'that\'s what they made Google for bro',
  'what do I look like, the fucking weather man?',
  'idk, why don\'t you tell me',
  'I could tell you, but I don\'t really feel like it'
];

//Randomize the responses
var randomIndex = Math.floor(Math.random() * Response.length);

var randomElement = Response[randomIndex];

//Streaming Twitter API - listen for #angryweatherbot hashtag
Twitter.stream('statuses/filter', {track: '#angryweatherbot'}, function(stream) {
  
  //Send a tweet when we hear the hashtag used
  stream.on('data', function(tweet) {

    //Create the tweet
    var statusObj = {status: "@" + tweet.user.screen_name + " " + randomElement}
  
  	//Post the tweet
    Twitter.post('statuses/update', statusObj, function(error, tweet, response){
  
      if(error){
    		
        console.log(error);

  		}

  });

  });

  stream.on('error', function(error) {

    console.log(error);

});

});