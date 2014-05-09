var fs = require('fs');
var querystring = require("querystring");

function index(response, postData) {
    sendHtmlFile('index.html', response, postData);
}

function signup(response, postData) {
    sendHtmlFile('signup.html', response, postData);
}

function chat(response, postData) {
    sendHtmlFile('chat.html', response, postData);
}

function css(path, response) {
    fs.readFile(global.config.base_dir+path, 'utf-8', function(error, content) {
		response.writeHead(200, {'Content-Type': 'text/css','Content-Length':content.length});
        response.end(content);
    });
}

function js(path, response) {
    fs.readFile(global.config.base_dir+path, 'utf-8', function(error, content) {
		response.writeHead(200, {'Content-Type': 'text/javascript','Content-Length':content.length});
        response.end(content);
    });
}

function sendHtmlFile(path, response, postData){
    fs.readFile(global.config.base_dir+path, 'utf-8', function(error, content) {
	if(!(error || 'undefined' === content)){
		response.writeHead(200, {'Content-Type': 'text/html','Content-Length':content.length});
        response.end(content);
    }});
}

exports.index = index;
exports.signup = signup;
exports.chat = chat;
exports.css = css;
exports.js = js;