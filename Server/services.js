/**
 * Created by server-pc on 07/05/14.
 */
/**
 * Created by server-pc on 06/05/14.
 */
//function GetTable()


var MongoClient = require('mongodb').MongoClient;

exports.Authentification=function (_username,_password)
{
    run_query('users',{ 'username' : {$eq: _username},'password':{$eq:_password}});
}

// Function used to connect to the MongoDB database
function connect_database(next) {
    var db_cli = new MongoClient();

    var connection_result = function(err,db) {
        if(!err) {
            // Call the callback with the new DB object
            next(null,db);
        } else {
            console.log("DB connection failed. Details: "
                + err.message);
            next(err);
        }
    };

    var mongo_url = "mongodb://localhost:27017/Dardacha";
    db_cli.connect(mongo_url,connection_result);
};

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

// run the query, and output the results to the console.
function run_query(collection_name, query_object) {
    var database;
    // Called for each document in the collection
    var each_document = function(err, doc) {
        if(!err) {

            if(doc) {
                console.log("Connexion OK:");
              //  console.dir(doc);
                console.log("------------------");
                database.close();
                return true;
            } else {
                // Close our database connection
                console.log("Connexion failed:");
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
    var db_connected = function(err,db)
    {
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


// Function Authentification



