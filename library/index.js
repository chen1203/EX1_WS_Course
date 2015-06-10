var events = require('events');
var util = require('util');
var book = require('../book');
util.inherits(Library, events.EventEmitter);

// Json data object about all the library

var libData = {
	"libraryName":"Ariela",
	"address":"Shaul Ameleh 50, Tel-Aviv",
	"books":[
			{"barcode":"1","bookName":"book1","author":"author1","year":"1908","genre":"Drama","total_copies":"50","available_copies":"12"},
			{"barcode":"2","bookName":"book2","author":"author2","year":"1908","genre":"Comedy","total_copies":"70","available_copies":"0"},
			{"barcode":"3","bookName":"book3","author":"author3","year":"2001","genre":"Thriller","total_copies":"30","available_copies":"0"},
			{"barcode":"4","bookName":"book4","author":"author4","year":"2010","genre":"Drama","total_copies":"20","available_copies":"1"},
			{"barcode":"5","bookName":"book5","author":"author5","year":"1999","genre":"Thriller","total_copies":"80","available_copies":"31"},
			{"barcode":"6","bookName":"book6","author":"author6","year":"1990","genre":"Thriller","total_copies":"800","available_copies":"40"}
		]
};

// ---- Library Object Constructor ----
function Library() {
	this.libraryName = ""; 
	this.address = "";
	this.books = [];
	console.log("C'tor of library called.\n\n");
}

// initialize the library fields by read from the json above all the data
Library.prototype.init = function() {
	console.log("Function 'init()' called, the library object got data from json.");
	console.log("Return value: none.\n\n");
	this.libraryName = libData.libraryName;
	this.address = libData.address;
	for (var i = 0; i < libData.books.length; i++) {
		var aBook = book.getBook(libData.books[i].barcode,libData.books[i].bookName,libData.books[i].author,libData.books[i].year,libData.books[i].genre,libData.books[i].total_copies,libData.books[i].available_copies);
		this.addBook(aBook);
	};
}

// ---- Library Object prototypes ----

Library.prototype.addBook = function(newBook) {
	console.log("Function 'addBook(newBook)' called.");
	console.log("Return value: none.");
	// checking if the newBook has barcode thar already exist in the library
	var flag = 0;
	for(var i=0;i < this.books.length; i++) {
		if (this.books[i].barcode == newBook.barcode) {
			console.log("The new book was not added because barcode is already exist in the library.\n\n");
			flag = 1;
		}
	}
	if (flag == 0) { // the barcode is not exist, so we can add the book.
		this.books.push(newBook);
		console.log("New book was added : ");
		newBook.printBookDetails();
		console.log("\n\n");
	}
};

Library.prototype.getAllBooks = function() {
	console.log("Function 'getAllBooks()' called.");
	console.log("Return value: json with all books in the library.");
	this.printAllBooks(this.books);
	return this.books;
};

Library.prototype.getAllAvailableBooks = function() {	
	var availableBooks = [];
	for(var i=0;i < this.books.length; i++) {
		if (this.books[i].available_copies > 0)
			availableBooks.push(this.books[i]);
	}
	console.log("Function 'getAllAvailableBooks()' called.");
	console.log("Return value: json with all available books in the library.");
	if (availableBooks.length == 0)
		console.log("There are no available books in the library right now.\n\n");
	else {	// available.length > 0
		console.log("There are "+availableBooks.length+" available books in the library right now : ");
		this.printAllBooks(availableBooks);
		console.log("\n\n");
	}
	return availableBooks;
};

Library.prototype.getBookNameByBarcode = function(barcode) {
	for(var i=0; i < this.books.length; i++) {
		if (this.books[i].barcode === barcode) 
			var name = {"name" : this.books[i].bookName };
	}
	console.log("Function 'getBookNameByBarcode(barcode)' called.");
	console.log("Return value: json with the name of the book that fit to the barcode.");
	if (name) {
		console.log("The book's barcode : "+barcode+" was found in the library. The name is : '"+name.name+"'.\n\n");
		return name;
	}
	console.log("The book's barcode : "+barcode+" was not found in the library.\n\n");
	return {};	
};

Library.prototype.getBookByBarcode = function(barcode) {
	console.log("Function 'getBookByBarcode(barcode)' called.");
	console.log("Return value: json with all the book details that fit to the barcode.");
	for(var i=0;i < this.books.length; i++) {
		if (this.books[i].barcode == barcode) {
			console.log("The book's barcode : "+barcode+" was found in the library : ");
			this.books[i].printBookDetails();
			console.log("\n\n");
			return this.books[i];
		}
	}
	console.log("The book's barcode : "+barcode+" was not found in the library.\n\n");
	return {};
};

Library.prototype.getAllGenreBooks = function(genre) {
	var genreBooks = [];
	for(var i=0;i < this.books.length; i++) {
		if (this.books[i].genre == genre)
			genreBooks.push(this.books[i]);
	}
	console.log("Function 'getAllGenreBooks(genre)' called.");
	console.log("Return value: json with all books in the library which fit the required genre.");
	if (genreBooks.length == 0) 
		console.log("There are no books in genre : "+genre+" in the library right now.\n\n");
	else {	// genreBooks.length > 0
		console.log("There are "+genreBooks.length+" books in genre : "+genre+" in the library right now : ");
		this.printAllBooks(genreBooks);
		console.log("\n\n");
	}
	return genreBooks;
};

Library.prototype.printAllBooks = function(arr) {
	if (arr.length > 0) {
		for (var i = 0; i < arr.length; i++) {
				console.log("\n-----\nBook number "+(i+1));
				arr[i].printBookDetails();
			}
	} else 
	console.log("The array is empty.");
};

// ---- Create Library instance to export ----
exports.getLibrary = function() {
	console.log("Function 'getLibrary()' called, so new library instance was created.\n");
	var myLibrary = new Library();
	myLibrary.init();
	return myLibrary;
};
