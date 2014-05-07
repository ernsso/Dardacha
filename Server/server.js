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
    console.log('Serveur en ecoute....');
	//socket.emit('message', 'Vous êtes bien connecté !');
	
	socket.on('login',function(user){
        console.log('Un client est connecté !');
        io.sockets.emit('getmembers', user.username);
        DB.Authentification(user.username,user.password);

	});

    socket.on('Packet',function(PackClient){
        console.log('Un client envoie un message !')
        console.log(PackClient);
        // we tell the client to execute 'updatechat' with 2 parameters
        io.sockets.emit('updatechat', PackClient.ID, PackClient.message);


    });
	
	socket.on('signup',function(user){
		user = encodeHtmlSpecialChar(user);
		console.log(user);
	});
});

server.listen(8080);



