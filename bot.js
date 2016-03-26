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
    'Wine & Cheese is Wednesday',
    'Brad and I are married',
    'I dont remember. I just know Brad and I made out.',
    'Im old',
    'Kristeeeeeeeeeeeeeeeeeeeeeeeeeeen',
    '*makes cat noise*',
    'It was Dans fault he fell out of the tree',
    'Was I not drunk?',
    'lulz good luck',
    'GAAAAAAAAAAAYYYYYYYYYYYYYYY',
    'thats too hetero',
    'I dont care',
    'booooo',
    '*insert high-pitched female scream*',
    'Remember the eKlue of Adorable Animals?',
    'goatsie',
    'Im sooooooooo old',
    'I WILL BREAK YOU!',
    'ughhhh',
    'Ewww beer',
    'Not gay enough',
    'wine',
    'Do better',
    'Dan I will kick you out my my room!',
    'Its like the movie Teeth',
    'Penis',
    'mmmmm alcohol',
    
  ];  
  return responseArray[Math.floor(Math.random()*responseArray.length)];
}

exports.respond = respond;
