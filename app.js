'use scrict'

var path=require('path')
var mongodb=require('mongodb');
var MongoClient=mongo.MongoClient;
var bodyParser=require('body-parser');
var express=require('express');
var app=express();
var server=require('http').Server(app);
var io=require('socker.io')(server);
var http=require('http');
var location=function(pos){
	return __dirname+'/'+pos+'.html';
}

app.use('/static',express.static(__dirname+'/static'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
	res.sendFile(location(index));
})

io.sockets.on('connection',function(socket){
	var id=socket.id

	setInteval(function(){
		var month = new Date().getMonth()+1;
		var now = new Date().getFullYear().toString()+"-"+month.toString()+"-"+new Date().getDate().toString()+" ";
		if(new Date().getHours()<10){var nnow=now+"0"+new Date().getHours().toString()+":";}
			else{var nnow=now+new Date().getHours().toString()+":";}
		if(new Date().getMinutes()<10){var nnnow=nnow+"0"+new Date().getMinutes().toString()+":";}
			else{var nnnow=nnow+new Date().getMinutes().toString()+":";}
		if(new Date().getSeconds()<10){var nnnnow=nnnow+"0"+new Date().getSeconds().toString();}
			else{var nnnnow=nnnow+new Date().getSeconds().toString();}
		io.emit('now', {'date':nnnnow});
	},1000);
})