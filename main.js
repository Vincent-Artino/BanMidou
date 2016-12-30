express = require('express');
https = require('https'),  
request = require('request');

var app = express();
port = Number(process.env.PORT || 5000);

console.log("jhvd jd");

app.post('/webhook', function (req, res) {
console.log("vh hdv");
	console.log(req.result); 
 /*// Make sure this is a page subscription
  if (data.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          receivedMessage(event);
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });
    res.sendStatus(200);
  }*/
});
  
function receivedMessage(event) {
  // Putting a stub for now, we'll expand it in the following steps
  console.log("Message data: ", event.message);
}  
app.listen(port);
