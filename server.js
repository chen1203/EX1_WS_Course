var book = require('./book');
var library = require('./library');
var express = require('express');
var http = require('http');
var app = express();
app.set('json spaces',3);

var mylibrary = library.getLibrary();

// create server and print the response JSON to browser
http.createServer(app);

// get all library details
app.get('/library',function(req,res) { 		
	console.log("\n---------------------------------------\n");	
	console.log("PATH : '/library' ");
	console.log("Getting all library details.\n\n");
	res.status(200).json(mylibrary);
});

// get all books in library
app.get('/book/all',function(req,res) { 
	console.log("\n---------------------------------------\n");	
	console.log("PATH : '/book/all' ");
	res.status(200).json(mylibrary.getAllBooks());
});

// get all available books
app.get('/book/available', function(req,res) {
	console.log("\n---------------------------------------\n");	
	console.log("PATH : '/book/available' ");
	res.status(200).json(mylibrary.getAllAvailableBooks());
});

// get the book name by his id
app.get('/book/name/:bookId', function(req,res) {
	console.log("\n---------------------------------------\n");	
	console.log("PATH : '/book/name/"+req.params.bookId+"' ");
	res.status(200).json(mylibrary.getBookNameByBarcode(req.params.bookId));
});

// get the book all details by his id
app.get('/book/:bookId', function(req,res) {
	console.log("\n---------------------------------------\n");	
	console.log("PATH : '/book/"+req.params.bookId+"' ");
	res.status(200).json(mylibrary.getBookByBarcode(req.params.bookId));
});

// get all books with the required genre
app.get('/book/genre/:genre', function(req,res) {
	console.log("\n---------------------------------------\n");	
	console.log("PATH : '/book/genre/"+req.params.genre+"' ");
	res.status(200).json(mylibrary.getAllGenreBooks(req.params.genre)); 
});


var port = process.env.PORT || 3000;
app.listen(port);
console.log("listening on port "+port+"...\n\n");
