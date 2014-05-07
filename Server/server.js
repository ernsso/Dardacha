/**
 * Created by server-pc on 05/05/14.
 */
//console.log("Salut");
/*
 * Application server 
 *
 */
var http = require('http');
var fs = require('fs');
var ent = require('ent');
global.config = require('./config.js');
var DB=require('./services.js');

//-- Importation mongoDB

//--------------------------
// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
  //  fs.readFile('../Client/index.html', 'utf-8', function(error, content) {
   //     res.writeHead(200, {"Content-Type": "text/html"});
    //    res.end(content);
   // });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand on client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
	//socket.emit('message', 'Vous êtes bien connecté !');
	
	socket.on('login',function(user){
        var success = DB.Authentification(user.username,user.password);
		console.log(success?'Authentification success':'Authentification fail');
		socket.emit('loginSuccess', success);
	});
	
	socket.on('signup',function(user){
		user = encodeHtmlSpecialChar(user);
		DB.insertUser(user.firstname, user.lastname, user.email, user.username, user.password);
		console.log(user);
	});
});

server.listen(8080);

function encodeHtmlSpecialChar(object){
	for(var property in object)
		object[property] = ent.encode(object[property]);
	return object;
}