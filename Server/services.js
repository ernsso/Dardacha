/**
 * Created by server-pc on 07/05/14.
 */

var MongoClient = require('mongodb').MongoClient;

exports.Authentification=function (_username, _password, callback) {
    select('users', { 'username' : {$eq: _username},'password':{$eq:_password}}, function(results){
		callback(results.length > 0);
	});
}

exports.insertUser = function(_firstname, _lastname, _email, _username, _password){
	insert('users', {nom:_lastname, prenom:_firstname, email:_email, username:_username, password:_password});
}

function connect(callback) {
	var dbUrl = 'mongodb://'+global.config.mongo.host+':'+global.config.mongo.port+'/'+global.config.mongo.db;
	MongoClient.connect(dbUrl, function(err, db){
		if(err){
			console.log('Connexion to \''+dbUrl+'\' has fail.');
			console.log(err);
		}
		else{
			callback(db);
		}
	});
}

function select(collectionName, where, callback) {
	connect(function(db){
		db.collection(collectionName).find(where).toArray(function(err, docs){
			if(err)
				console.log(err);
			else
				callback(docs);
		});
	});
}

function insert(collectionName, data){
	connect(function(db){
		db.collection(collectionName).findOne({'username':data.username}, function(err, doc){
			if(null == doc)
				db.collection(collectionName).insert(data, function(err, result){
					if(err)
						console.log('an error has occured');
					else
						console.log('insert done');
				});
			else
				console.log('this user already exists');
		});
	});
}