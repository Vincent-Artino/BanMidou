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
	duck(str,res);
} 
else if(req.body.result.action == "test"){
	console.log("vgb");
	request({
	headers:{
	Authorization: "Bearer bc8afaee2fd248449d275ec15a782b97"		
	},	
	url : "https://api.api.ai/v1/query?v=20150910",
	json : true,
	body : {
		query : ["who are you"]
		
	}	
	},function(error,res,body){
		if(!error){
			console.log("in help");		
		}
	});
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
function duck(query,res){
	Burl = "http://api.duckduckgo.com/?q="+query+"&format=json&pretty=1";
	request({
	url : Burl,
	json : true 	
	},function(error,response,body){
	if(!error){
		if(body!=null){
			if(body.Abstract==null){
			if(body.Definition==null){
				str = body.Results;
			}
			else
			str = body.Definition;
			}
			else
			str = body.Abstract;
			sendMessage(str,res);	
		}	
	}	
});
}

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
function sendGMessage(data,res){

}

app.listen(port);
