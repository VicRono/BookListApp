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

		const books = Store.getBooks();

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

		//Clear alert in 4 seconds
		setTimeout(() => document.querySelector('.alert').remove(), 4000);
	}

	static clearFields(){
		document.querySelector('#title').value = '';
		document.querySelector('#author').value = '';
		document.querySelector('#isbn').value = '';
	}
}

//Store Class:Handles strorage
class Store{
	static getBooks(){
		let books;
		if(localStorage.getItem('books') === null){
			books = [];
		}else{
			books = JSON.parse(localStorage.getItem('books'));
		}
		return books;
	}

	static addBook(book){
		const books = Store.getBooks();
		books.push(book);
		localStorage.setItem('books', JSON.stringify(books));
	}

	static removeBooks(isbn){
		const books = Store.getBooks();

		//foreach loop to check book at index, if ISBN number matches-book will be deleted.
		books.forEach((book, index) => {
			if(book.isbn === isbn){
				books.splice(index, 1);
			}
		});

		localStorage.setItem('books', JSON.stringify(books));
	}
}

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

			//add book to store
			store.addBook(book);

			//Show success message
			UI.showAlert('Book Added!', 'success')

			//Clear fields
			UI.clearFields();
		}
	});
//Event: Remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
	UI.deleteBook(e.target)

	//Show delete message
	UI.showAlert('Book deleted!', 'info')
});