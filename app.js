//Book class: Represents a book
class Book{
	constructor(title, author, isbn){
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}
//UI Class: Handle UI tasks
class UI {
	static displayBooks(){
		const StoredBooks = [
          {
          	title: 'Book One',
          	author: 'John Doe',
          	isbn: '3434434'
          },
          {
          	title: 'Book Two',
          	author: 'Jane Doe',
          	isbn: '45545'
          }
		];

		const books = StoredBooks;

		books.forEach((book) => UI.addBookToList(book));
	}

	static addBookToList(book) {
		const list =document.getElementById('#book-list');

		const row = document.createElement('tr');

		row.innerHTML = `
		  <td>${book.title}</td>
		  <td>${book.author}</td>
		  
		`; 
	}
}

//Store Class:Handles strorage
//Event: Display Book
//Event: Add a book
//Event: Remove a book