//jshint esversion: 6

const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

var unit = Number(req.body.units);
const cryptocurency = req.body.crypto;
const currency = req.body.fiat;

var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
var finalURL = baseURL + cryptocurency + currency;
const public_key = "ZGJiOGM2MTEzYTE2NDMyMTgzMTUwOGExYjg5MGRmYmM";


var options = {
	"method": "GET",
	"headers": {
	'x-ba-key': public_key,

	}
};


https.get(finalURL, options, function(response){
  console.log(response.statusCode);
  response.on("data",function(data){
    var TickerData = JSON.parse(data);
    console.log(TickerData);

    var parseData = TickerData.open.hour * unit;

    res.send("<h1> The Current market Rate is  " + parseData +"&nbsp;"+ cryptocurency);
  });
});

});

app.listen(3000,function(){
  console.log("Server started on port 3000");
});
