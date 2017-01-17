express = require('express');
https = require('https'),  
request = require('request');
var app = express();
port = Number(process.env.PORT || 5000);
var city,text,temp,temperature;
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var speech;
var DDG = require('node-ddg-api').DDG;
var ddg = new DDG('sarah');
options = {
        "useragent": "My duckduckgo app",
        "no_redirects": "1",
        "no_html": "0",
}
//okay
app.post('/webhook', function (req, res) {
if(req.body.result.action == "weather"){
	console.log("weather request");
	weather(req,res);
	console.log("hello");
}
else if(req.body.result.action == "duck"){
	console.log("in ddg");
	str = req.body.result.resolvedQuery;
	console.log(str);	
	if(str.includes("tell me about "))
		str = str.replace("tell me about ","");
	console.log(str);
	ddg.instantAnswer(str, {skip_disambig: '0'}, function(err, response) {
	  console.log("yea ... ");	
	  //console.log(response);
	  console.log(response);	  
	//sendMessage(response);
	});	
	/*ddg.query(str, options, function(err, data){
	console.log("yea ... ");
   	console.log(data.AbstractText);
	link = "\n\nfor more info refer : \n\n" + data.AbstractURL;
	if(data.AbstractText!="")
	sendMessage(data.AbstractText + link,res);
	else 
	sendMessage("no info available",res);
	
});*/
} 
else if(req.body.result.action == "help"){
	//sendButtonMessage("Choose any action",res);
}
else if(req.body.result.action == "Gifs"){
	console.log("hjdv skd");
	request({
	url : "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC",	    
	json: true
	}, function (error, response, body) {
		sendIMessage(response.body.data['image_url'],res);
		console.log(response.body.data['image_url']);
	});
}


});

function weather(req,res){
	baseurl = "api.openweathermap.org/data/2.5/weather?q=";
	city = req.body.result.parameters["geo-city"];
	if(city == null)
		return ;
	else{
	request({
	    url: "http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=2a50a876284147f4c8e58ae96e610bc6",
	    json: true
	}, function (error, response, body) {
	console.log("error");
	if (!error)
	 {
		console.log("just kidding");
		if(body!=null){ 
			text = "";
			city = body['name'];
			if(body.weather!=null)	{		
			text = body.weather[0].description;
			temp = body.main.temp;
			temperature =  "° celcius";
			speech1 = "Today in " + city + ": "+text+", the temperature is " + temp + " " + temperature;
			console.log(speech);	
			sendMessage(speech1,res);	
			}
			else
			console.log("messed up");
   	        }
	}
	});
	}	
}
function sendMessage(text,res){
	res.writeHead(200, {"Content-Type": "application/json"});
	var json = JSON.stringify({ 
	speech : text, 
        displayText : text, 
        source : "item"
  	});
   	res.end(json);		
}

function sendButtonMessage(text,res){
	console.log("dvbn");	
	res.writeHead(200, {"Content-Type": "application/json"});
	var json = JSON.stringify({ 
	speech : text, 
        displayText : text, 
	data : {
	facebook: {
    	attachment: {
      	type: "template",
      	payload: {
      	    template_type: "button",
      	    text : "what next",
      	    buttons:[{
      	      type: "postback",
      	      title: "weather",
      	      payload: "not much"
          }]
      }
    }
  }	},
        source : "item"
  	});
   	res.end(json);				
}
function sendIMessage(url1,res){
	res.writeHead(200, {"Content-Type": "application/json"});
	var json = JSON.stringify({ 
	speech : "enjoy random Gif", 
        displayText : "enjoy random Gif", 
	data : {
	facebook : {
	attachment : {
	type : "image",
	payload : {
	url : url1	
	}	
	}	
	}	
	},
        source : "item"
  	});
   	res.end(json);		

}
app.listen(port);
