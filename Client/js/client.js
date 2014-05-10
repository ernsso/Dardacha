/**
 * Created by server-pc on 05/05/14.
 */
var socket=io.connect(location.search);
var _username=location.search.substring(1).split('=')[1];
var users;
$('#loginform').submit(function(event){
	event.preventDefault();
   // alert(location.search)
	socket.emit('login',{
		username: $('#username').val(),
		password: $('#password').val()
	});
});

socket.on('loginSuccess',function(users_,username, success){
	if(success)
    {
        window.location.href = 'chat.html?username='+username;
        if(users_.length>0)
        {
            sessionStorage.setItem("NB",users_.length);
        }
       for(i=0;i<users_.length;i++)
       {
           if(sessionStorage == null)
           {document.write("Storage not supported by the browser, please use Chrome,Filezilla,Internet Expo 8");}
           else
           {

               sessionStorage.setItem(i,users_[i]);
           }
       }

    }

});

socket.on('Erreur',function(message__){
alert('erreur');
    $('#error').empty();
    $('#error').append('<B style="color: #ff0000;">'+message__+'</B></br>');
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
    var color= "#"+((1<<24)*Math.random()|0).toString(16);
	$('#conversation').append('<tr><td class="td1">'+username + ':</b> ' + data + '</td><td class="td2" style="background-color: '+color+';">'+Hours+'</td><tr>');
});

socket.on('NewUser',function(NewUser){
    var color= "#"+((1<<24)*Math.random()|0).toString(16);
    $('#member').append('<p style="background-color: '+color+';">'+NewUser+'</p>');
    $('#member').append('<br/>');
   // $('#member').append('<p style="background-color: burlywood;">--------------------</p>');
});



function getUser(){
   for(i=0;i<sessionStorage.getItem("NB");i++)
    {  //alert(users[i]);
       var color= "#"+((1<<24)*Math.random()|0).toString(16);
	 $('#member').append('<p style="background-color: '+color+';">'+sessionStorage.getItem(i)+'</p>');
     $('#member').append('<br/>');
    }
}