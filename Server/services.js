/**
 * Created by server-pc on 07/05/14.
 */

var MongoClient = require('mongodb').MongoClient;

exports.Authentification=function (_username, _password, callback) {
    select('users', { 'username' : {$eq: _username},'password':{$eq:_password}}, function(results){
		callback(results.length > 0);
	});
}

exports.insertUser = function(user, callback){
	insert('users', {nom:user.lastname, prenom:user.firstname, email:user.email, username:user.username, password:user.password}, function(success){
		callback(success);
	});
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

function insert(collectionName, data, callback){
	connect(function(db){
		db.collection(collectionName).findOne({'username':data.username}, function(err, doc){
			if(null == doc)
				db.collection(collectionName).insert(data, function(err, result){
					if(err)
						console.log('Insert has fail : '+err);
					else
						console.log('insert done');
					callback(!err);
				});
			else
            {
                console.log('this user already exists');
            }

		});
	});
}