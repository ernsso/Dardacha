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

var users = [];
var AllSocket={};
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
			if(success){
				console.log(user);

			}
            users.push(user.username);
            socket.broadcast.emit('NewUser',user.username);
			socket.emit('loginSuccess',users, user, success);
			console.log(success?'Authentification success':'Authentification fail');
		});
	});
	
	socket.on('signup',function(user){
		user = encodeHtmlSpecialChar(user);
		DB.insertUser(user, function(success){
            console.log(success);
            if(success)
            {

                socket.emit('loginSuccess', user.username, success);
                console.log(user);
            }

		});


	});
	
	socket.on('Packet',function(PackClient){
		console.log('Un client envoie un message !')
		console.log(PackClient);
        var date_today = new Date();
        var date=date_today.getDate()+"/"+(date_today.getMonth()+1)+"/"+date_today.getFullYear();
      var  Hours = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
		// we tell the client to execute 'updatechat' with 2 parameters
		io.sockets.emit('updatechat', PackClient.username, PackClient.message,Hours);
        DB.storeHistory(PackClient.username,PackClient.message,date+' '+ Hours);
	});
	

	

});

server.listen(global.config.port);

setInterval(function(){


},3000);



function encodeHtmlSpecialChar(object){
	for(var property in object)
		object[property] = ent.encode(object[property]);
	return object;
}