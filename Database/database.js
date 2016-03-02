var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'pokemon'
});/*
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});*/
module.exports = {
	query: function (query, callback) {
		//console.log("do query");
		/*connection.connect(function(err) {
		  if (err) {
		    console.error('error connecting: ' + err.stack);
		    return;
		  }
		  console.log('connected as id ' + connection.threadId);
		});*/
		connection.query(query, function(err, rows, fields) {
		  	console.log("get query data");
		  	//console.log("err: "+ err);
		  	if (err){
		  		console.error('error connecting: ' + err);
		  	};
		  	//console.log("sql rows: "+ rows.length);
			callback(rows);		

		});/*
		connection.end();*/
	}
}