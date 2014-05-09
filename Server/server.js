/**
 * Created by server-pc on 05/05/14.
 */
//console.log("Salut");
/*
 * Application server 
 *
 */
var http = require('http');
var url = require("url");
var ent = require('ent');
global.config = require('./config.js');
var router=require('./router.js');
var DB=require('./services.js');
var requestHandlers = require('./requestHandlers.js');

var handle = {};
handle["css"] = requestHandlers.css;
handle["js"] = requestHandlers.js;
handle["/"] = requestHandlers.index;
handle["/index.html"] = requestHandlers.index;
handle["/signup.html"] = requestHandlers.signup;
handle["/chat.html"] = requestHandlers.chat;

//--------------------------
// Chargement du fichier index.html affiché au client
var server = http.createServer(function(request, response) {
	var postData = "";
    var pathname = url.parse(request.url).pathname;
	request.setEncoding("utf8");
	request.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
		console.log("Paquet POST reçu '"+ postDataChunk + "'.");
	});
	request.addListener("end", function() {
		router.route(handle, pathname, response, postData);
	});
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand on client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
	//socket.emit('message', 'Vous êtes bien connecté !');
	
	socket.on('login',function(user){
        var success = DB.Authentification(user.username, user.password, function(success){
			//if(success)
				//socket.set('pseudo', user.username);
			socket.emit('loginSuccess', user.username,success);
			console.log(success?'Authentification success':'Authentification fail');

		});
	});
	
	socket.on('signup',function(user){
		user = encodeHtmlSpecialChar(user);
		DB.insertUser(user.firstname, user.lastname, user.email, user.username, user.password);
		console.log(user);
	});
	
	socket.on('Packet',function(PackClient){
		console.log('Un client envoie un message !')
		console.log(PackClient);
		// we tell the client to execute 'updatechat' with 2 parameters
		io.sockets.emit('updatechat', PackClient.ID, PackClient.message);
	});
});

server.listen(8080);

function encodeHtmlSpecialChar(object){
	for(var property in object)
		object[property] = ent.encode(object[property]);
	return object;
}