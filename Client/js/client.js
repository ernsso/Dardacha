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
    var Hours = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
  //  var Hours=currentdate.getHours() + ":"+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
	$('#conversation').append('<tr><td class="td1">'+username + ':</b> ' + data + '</td><td class="td2">'+Hours+'</td><tr>');
});

socket.on('newUser', function (username) {
	addMember(username);
	$('#conversation').append('<p>'+username+' joined the chat.</p>');
});

socket.on('userDisconnect', function (username) {
	$('#conversation').append('<p>'+username+' has left the chat.</p>');
});

socket.on('sendUsers', function(users){
	$('#member').empty();
	for(var user in users)
		addMember(user);
});

function addMember(name){
	$('#member').append('<p>'+name+'</p>');
}

function getUser(){
	$('#member').append('<p>'+_username+'</p>');
}