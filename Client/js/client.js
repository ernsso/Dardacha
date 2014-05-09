/**
 * Created by server-pc on 05/05/14.
 */
var socket=io.connect("http://localhost:8080");
var _username=location.search.substring(1).split('=')[1];
$('#loginform').submit(function(event){
	event.preventDefault();
	socket.emit('login',{
		username: $('#username').val(),
		password: $('#password').val()
	});
});

socket.on('loginSuccess',function(username,success){
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
	$('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
});


function getUser(){

   $('#member').append('<b>'+_username + '</b>' );
  // $('#tagName').val('');
}



