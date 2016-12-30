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
	return weather(req);
}

});

function weather(req){
	baseurl = "https://query.yahooapis.com/v1/public/yql?q=";
	city = req.body.result.parameters["geo-city"];
	if(city == null)
		return {}
	else{
	query = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "')";
	urlQuery = baseurl + query + "&format=json";
	console.log(query);
	resp = request({
	    url: urlQuery,
	    json: true
	}, function (error, response, body) {
	console.log("error");
    	if (!error && response.statusCode === 200) {
		console.log("just kidding");
	        console.log(body.query.results); 
		city = body.query.results.channel.location.city;
		text = body.query.results.channel.item.condition.text;
		temp = body.query.results.channel.item.condition.temp;
		temperature =  body.query.results.channel.units.temperature;
		speech = "Today in " + city + ": " + text + ", the temperature is " + temp + " " + temperature;
		console.log(speech);
		 return {
			"speech": speech,
			"displayText": speech,
			"source": "apiai-weather-webhook-sample"
		    }
	    }
	});
	return resp;
	}	
}

app.listen(port);
