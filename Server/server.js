/**
 * Created by server-pc on 05/05/14.
 */
//console.log("Salut");
/*
 * Application server 
 *
 */
var http = require('http');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

//-- Importation mongoDB

//--------------------------
// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('../Client/index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand on client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
	//socket.emit('message', 'Vous êtes bien connecté !');
	
	socket.on('login',function(user){
		//console.log(user);

        //-------- ------Requette BD
        if(Authentification(user.username,user.password)==true)
        {
            console.log('OK');


        }
   //  -----------------------------



	});
	
	socket.on('signup',function(user){
		user = encodeHtmlSpecialChar(user);
		console.log(user);
	});
});

server.listen(8080);


//------------------------------------
/**
 * Created by server-pc on 06/05/14.
 */
//function GetTable()

function Authentification( _username, _password)
{


// Call our 'run_query' function to find all documents in the
// 'users' collection with a field 'age' greater than 30.
    run_query('users',{ 'username' : {$eq: _username},'password':{$eq:_password}});


// Function used to get a collection object
    function connect_collection(db, collection_name,next_step) {
        var col_connected = function(err,collection) {
            if(!err) {
                next_step(null, collection);
            } else {
                console.log("Failed to connect collection. Details: "
                    + err.message);
                next_step(new Error("Failed to connect collection: "
                    + err.message));
            }
        };

        // Get a specific collection object from the database
        db.collection(collection_name,col_connected);
    };

// Function used to connect to the database, select a collection,
// run the query, and output the results to the console.
    function run_query(collection_name, query_object) {
        var database;
        // Called for each document in the collection
        var each_document = function(err, doc) {
            if(!err) {

                if(doc) {
                    console.log("Result:");
                    console.dir(doc);
                    console.log("------------------");
                    database.close();
                    return true;
                } else {
                    // Close our database connection
                    database.close();
                }
            } else {
                database.close();
                return false;
                console.log("Error getting document. " + err.message);
            }
        };

        // Result after executing "find"
        var receive_cursor = function(err, cursor) {
            if(!err) {
                console.log("------------------");
                // Call the "each" function to specify that the
                // "each_document" function should be called for
                // every document in the result set
                cursor.each(each_document);
            } else {
                console.log("Error reading database results. "
                    + err.message);
            }
        };

        // Result from collection object request
        var col_connected = function(err, collection) {
            if(!err) {
                // Call the "find" function of the collection object
                // which performs a query and returns the cursor
                // to the "receive_cursor" function
                collection.find(query_object,receive_cursor);
            }
        }

        // Result from database connection request
        var db_connected = function(err,db) {
            if(!err) {
                database = db;
                // Connect the collection we are using
                connect_collection(database, collection_name,
                    col_connected);
            }
        }

        // Connect to the database
        connect_database(db_connected);
    }
}

function addUser(){

    var MongoClient = require('mongodb').MongoClient;
	// Set our collection
	var collection = db.get('usercollection');

	// Submit to the DB
	collection.insert({
		"username" : userName,
		"email" : userEmail
	}, function (err, doc) {
		if (err) {
			// If it failed, return error
			res.send("There was a problem adding the information to the database.");
		}
		else {
			// If it worked, set the header so the address bar doesn't still say /adduser
			res.location("userlist");
			// And forward to success page
			res.redirect("userlist");
		}
	});
}