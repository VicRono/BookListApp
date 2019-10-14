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

    //parentElement 2* because it will remove the whole row
	static deleteBook(el){
		if(el.classList.contains('delete')){
			el.parentElement.parentElement.remove();
		}
	}

	static showAlert(message, className){
		const div = document.createElement('div');
		div.className = `alert alert-${className}`;
		div.appendChild(document.createTextNode(message));
		const container = document.querySelector('.container');
		const form = document.querySelector('#book-form');
		//inserting div alert before the form(between lines 14 & 15 in index.html)
		container.insertBefore(div, form);
	}

	static clearFields(){
		document.querySelector('#title').value = '';
		document.querySelector('#author').value = '';
		document.querySelector('#isbn').value = '';
	}
}

//Store Class:Handles strorage
//Event: Display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks);
//Event: Add a book..need to handle collecting data from the form, instantiating new book and add book to list
document.querySelector('#book-form').addEventListener('submit', (e) => {
		// prevent default submit
		e.preventDefault();
		
		//get form values
		const title = document.querySelector('#title').value;
		const author = document.querySelector('#author').value;
		const isbn = document.querySelector('#isbn').value;

		//Validate fields
		if(title === '' || author === '' || isbn === '') {
			UI.showAlert('Please, fill in all fields', 'danger');
		} else{
			//instantiate book
			const book = new Book(title, author, isbn);

			// Add book to UI
			UI.addBookToList(book);

			//Clear fields
			UI.clearFields();
		}
	});
//Event: Remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
	UI.deleteBook(e.target)
});