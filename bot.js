var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /[Rr]ickybot/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;
  
  
  botResponse = generateResponse();
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function generateResponse() {
  console.log('generating response');
  var responseArray = [
    'This is shitty beer',
    'is it still worth going?',
    'sorry Im having sex with my girlfriend',
    'yo where are the bonz',
    'berkeley is a real college town',
    'K',
    'You all failed me',
    'Somebody bring me a bone for the rally in the morning pls',
    'Hurry up bonz, youre so slow',
    'Come on, you know me better than that',
    'dafuq?',
    'Where is this? Can I come?',
    'fucking tanicia',
    'Everyone but calrpicz',
    'boooooo',
    'uhhhhh',
    'Sanders definitely still has a chance',
    'my girlfriend Kiely goes to Cal',
    'Sippy are you kidding me?',
    
  ];  
  return responseArray[Math.floor(Math.random()*responseArray.length)];
}

exports.respond = respond;
