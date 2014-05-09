/**
 * Created by server-pc on 05/05/14.
 */
var socket=io.connect(location.search);
var _username=location.search.substring(1).split('=')[1];

$('#loginform').submit(function(event){
	event.preventDefault();
   // alert(location.search)
	socket.emit('login',{
		username: $('#username').val(),
		password: $('#password').val()
	});
});

socket.on('loginSuccess',function(username, success){
	if(success)
    {
        window.location.href = 'chat.html?username='+username;
    }
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
        ID:_username, // $('#tagName').text(),
        message: $('#message').val()
    });
    $('#message').val('');
});

// listener, whenever the server emits 'updatechat', this updates the chat body
socket.on('updatechat', function (username, data) {
    var currentdate = new Date();
    var Hours=currentdate.getHours() + ":"+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
	$('#conversation').append('<b>'+username + ':</b> ' + data + '<p></p>'+Hours+'</p><br>');
});

// listener, whenever the server emits 'updatechat', this updates the chat body
socket.on('newUser', function (username) {
	$('#member').append('<p>'+username+'</p>');
});

function getUser(){
	$('#member').append('<p>'+_username+'</p>');
}