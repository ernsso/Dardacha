/**
 * Created by server-pc on 05/05/14.
 */
var socket=io.connect("http://localhost:8080");

$('#loginform').submit(function(event){
	event.preventDefault();
	socket.emit('login',{
		username: $('#username').val(),
		password: $('#password').val()
	});
});

socket.on('loginSuccess',function(success){
	if(success)
		window.location.href = 'chat.html';
});

$('#signupform').submit(function(event){
	event.preventDefault();
	socket.emit('signup',{
		firstname: $('#firstname').val(),
		lastname: $('#lastname').val(),
		email: $('#email').val(),
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
	$('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
});
// Get Members
socket.on('getmembers', function (username) {
    $('#member').append('<b>'+username + ':</b>' );
});

