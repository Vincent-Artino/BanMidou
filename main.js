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
	city = req.body.result.parameters["geo-city"];
	if(city == null)
		return {}
	else{
	query = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "')";
	urlQuery = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
	request({
	    url: urlQuery,
	    json: true
	}, function (error, response, body) {
	console.log("error");
    	if (!error && response.statusCode === 200) {
		console.log("just kidding");
	        console.log(body) // Print the json response
	    }
	});
	}	
}

app.listen(port);
