var events = require('events');
var util = require('util');
var book = require('../book');
util.inherits(Library, events.EventEmitter);

// ---- Library Object Constructor ----

function Library(libraryName,address) {
	this.libraryName = libraryName; 
	this.address = address;
	this.books = [];
}

// ---- Library Object prototypes ----

Library.prototype.addBook = function(newBook) {
	this.books.push(newBook);
};

Library.prototype.getAllBooks = function() {
	return this.books;
};

Library.prototype.getAllAvailableBooks = function() {
	var availableBooks = [];
	for(var i=0;i < this.books.length; i++) {
		if (this.books[i].available_copies > 0)
			availableBooks.push(this.books[i]);
	}
	return availableBooks;
};

Library.prototype.getBookNameByBarcode = function(barcode) {
	for(var i=0;i < this.books.length; i++) {
		if (this.books[i].barcode == barcode)
			return {"name" : this.books[i].bookName };
	}
};

Library.prototype.getBookByBarcode = function(barcode) {
	for(var i=0;i < this.books.length; i++) {
		if (this.books[i].barcode == barcode)
			return this.books[i];
	}
};

Library.prototype.getAllGenreBooks = function(genre) {
	var genreBooks = [];
	for(var i=0;i < this.books.length; i++) {
		if (this.books[i].genre == genre)
			genreBooks.push(this.books[i]);
	}
	return genreBooks;
};

// ---- Create Library instance to export ----

exports.getLibrary = function(libraryName,address) {
	var myLibrary = new Library(libraryName,address);
	return myLibrary;
};
