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