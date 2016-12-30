express = require('express');
https = require('https'),  
request = require('request');
var app = express();
port = Number(process.env.PORT || 5000);

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.post('/webhook', function (req, res) {
if(req.body.result.action == "weather"){
	console.log("weather request");
	city = weather(req);
}

});

function weather(req){
	baseurl = "https://query.yahooapis.com/v1/public/yql?";
	city = req.body.result.parameters;
	console.log(city);
	return city;
}

app.listen(port);
