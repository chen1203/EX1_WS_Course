var events = require('events');
var util = require('util');
var stream = require('stream');
util.inherits(Book, events.EventEmitter);

// ---- Book Object Constructor ----
function Book(barcode,bookName,author,year,genre,total_copies,available_copies) {
	this.barcode = barcode;
	this.bookName = bookName;
	this.author = author;
	this.year = year;
	this.genre = genre;
	this.total_copies = total_copies;
	this.available_copies = available_copies;
}

// ---- Book Object prototypes ----

Book.prototype.setBookName = function(bookName) {
	if (bookName != null)
		this.bookName = bookName;
	console.log("The book name was changed to :" + bookName);
};

Book.prototype.setAuthor = function(author) {
	if (author != null)
		this.author = author;
	console.log("The book author was changed to :" + author);
};

Book.prototype.setYear = function(year) {
	if (year != null)
		this.year = year;
	console.log("The book year was changed to :" + year);
};

Book.prototype.setGenre = function(genre) {
	if (genre != null)
		this.genre = genre;
	console.log("The book genre was changed to :" + genre);
};

Book.prototype.setTotal_copies = function(total_copies) {
	if (total_copies >= 0)
		this.total_copies = total_copies;
	console.log("The book total copies number was changed to :" + total_copies);
};

Book.prototype.setAvailable_copies = function(available_copies) {
	if (available_copies >= 0)
		this.available_copies = available_copies;
	console.log("The book available copies number was changed to :" + available_copies);
};

Book.prototype.printBookDetails = function() {
	console.log("barcode : "+this.barcode);
	console.log("name : "+this.bookName);
	console.log("author : "+this.author);
	console.log("year : "+this.year);
	console.log("genre : "+this.genre);
	console.log("total copies : "+this.total_copies);
	console.log("available copies : "+this.available_copies);
};

// ---- Create Book instance to export ----

exports.getBook = function(barcode,bookName,author,year,genre,total_copies,available_copies) {
	var myBook = new Book(barcode,bookName,author,year,genre,total_copies,available_copies);
	return myBook;
};
