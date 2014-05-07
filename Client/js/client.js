/**
 * Created by server-pc on 05/05/14.
 */
var socket=io.connect("http://localhost:8080");
//var Notify=require("./Observateur.js");

$('#loginform').submit(function(event){
	event.preventDefault();

	socket.emit('login',{
		username: $('#username').val(),
		password: $('#password').val()
	});
});

// Call to tchatch

$('#chatform').submit(function(event){
    event.preventDefault();

    socket.emit('Packet',{

        ID: $('#tagName').text(),
        message: $('#message').val()
       // password: $('#password').val()
    });
    $('#message').val('');
});

// listener, whenever the server emits 'updatechat', this updates the chat body
socket.on('updatechat', function (username, data) {
 //$('#chatarea').value=username+':'+data;
  $('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
});
// Get Members
socket.on('getmembers', function (username) {
    //$('#chatarea').value=username+':'+data;
    $('#member').append('<b>'+username + ':</b>' );
});


