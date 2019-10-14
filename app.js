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
		const list =document.querySelector('#book-list');

		const row = document.createElement('tr');

		row.innerHTML = `
		  <td>${book.title}</td>
		  <td>${book.author}</td>
		  <td>${book.isbn}</td>
		  <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
		`;

		list.appendChild(row); 
	}
}

//Store Class:Handles strorage
//Event: Display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks);
//Event: Add a book..need to handle collecting data from the form, instantiating new book and add book to list
document.querySelector('#book-form').addEventListener('submit', (e) 
	=>{
		//get form values
		const title = document.querySelector('#title').value;
		const author = document.querySelector('#author').value;
		const isbn = document.querySelector('#isbn').value;

		
	});
//Event: Remove a book