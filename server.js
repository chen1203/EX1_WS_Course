var book = require('./book');
var library = require('./library');
var express = require('express');
var http = require('http');
//var fs = require('fs');
var app = express();
app.set('json spaces',3);

//var lib = fs.readFileSync('./data.json','utf8');
//console.log(lib);


// data --> move it to new file ?
var libData = {
	"libraryName":"Ariela",
	"address":"Shaul Ameleh 50, Tel-Aviv",
	"books":[
			{"barcode":"1","bookName":"Lucy Maud Montgomery","author":"author1","year":"1908","genre":"Drama","total_copies":"50","available_copies":"12"},
			{"barcode":"2","bookName":"book2","author":"author2","year":"1908","genre":"Comedy","total_copies":"70","available_copies":"0"},
			{"barcode":"3","bookName":"book3","author":"author3","year":"2001","genre":"Thriller","total_copies":"30","available_copies":"0"},
			{"barcode":"4","bookName":"book4","author":"author4","year":"2010","genre":"Drama","total_copies":"20","available_copies":"1"},
			{"barcode":"5","bookName":"book5","author":"author5","year":"1999","genre":"Thriller","total_copies":"80","available_copies":"31"}
		]
};

var mylibrary = library.getLibrary(libData.libraryName,libData.address);

for (var i = 0; i < libData.books.length; i++) {
	var booki = book.getBook(libData.books[i].barcode,libData.books[i].bookName,libData.books[i].author,libData.books[i].year,libData.books[i].genre,libData.books[i].total_copies,libData.books[i].available_copies);
	mylibrary.addBook(booki);
};

// create server and print the response JSON to browser
http.createServer(app);

// get all books in library
app.get('/book/all',function(req,res) { 
	console.log("\nAll books in library and all their deatils : \n"+ JSON.stringify(mylibrary.getAllBooks()));
	res.status(200).json(mylibrary.getAllBooks());
});

// get all available books
app.get('/book/available', function(req,res) {
	console.log("\nAll available books, which are now in the library : \n" + JSON.stringify(mylibrary.getAllAvailableBooks()));
	res.status(200).json(mylibrary.getAllAvailableBooks());
});

// get the book name by his id
app.get('/book/name/:bookId', function(req,res) {
	console.log("\nThe name of the book with barcode : "+ req.params.bookId + " is :\n" + JSON.stringify(mylibrary.getBookNameByBarcode(req.params.bookId)));
	res.status(200).json(mylibrary.getBookNameByBarcode(req.params.bookId));
});

// get the book all details by his id
app.get('/book/:bookId', function(req,res) {
	console.log("\nAll details about the book with barcode : "+ req.params.bookId + " are :\n" + JSON.stringify(mylibrary.getBookByBarcode(req.params.bookId)));
	res.status(200).json(mylibrary.getBookByBarcode(req.params.bookId));
});

// get all books with the required genre
app.get('/book/genre/:genre', function(req,res) {
	console.log("\nAll books in the library with genre : "+ req.params.genre + " are :\n" + JSON.stringify(mylibrary.getAllGenreBooks(req.params.genre)));
	res.status(200).json(mylibrary.getAllGenreBooks(req.params.genre)); 
});

// default path - print all the library details in json
app.all('*',function(req,res) { 		// ther is a meaning here ?
	res.status(200).json(mylibrary);
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log("listening on port 8080...");
