express = require('express');
https = require('https'),  
request = require('request');
var bodyParser = require('body-parser')

var app = express();
port = Number(process.env.PORT || 5000);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

console.log("jhvd jd");

app.post('/webhook', function (req, res) {
	console.log(req.body.result.action)	 
});
  
app.listen(port);
