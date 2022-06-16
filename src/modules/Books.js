// Book Class: Represents a Book
export class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//UI Class: Handle UI tasks
class UI {
    static displayBooks() {
     
      const books = Store.getBooks();

      books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-info btn-sm"><i class="fa-solid fa-pen-to-square"></i></a></td>
        <td><a href="#" class="btn btn-danger btn-sm delete"><i class="fa-solid fa-trash"></i></a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      } else {
        el.parentElement.parentElement.parentElement.remove();
      }
    }

    static showAlert(message, className) { 
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form)

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);


    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

    }
}
// Store Class: Handles Storage
class Store {
    static getBooks() {
       let books;
       if(localStorage.getItem('books') === null) {
        books = [];
       } else {
        books = JSON.parse(localStorage.getItem('books'));
        
       }
       return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }
        // remove by isbn since it is unique
    static removeBook(isbn) {
        const books = store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1)
            }
        })

            localStorage.setItem('books', JSON.stringify(books));
    }
}


// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event: Add a Book

document.querySelector('#book-form').addEventListener('submit', (e) => {
    
    //prevent default on submit 
    e.preventDefault(); 
    
    // Get form Values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

     // Validate 
     if(title === '' || author === '' || isbn === '') {
        // swal({
        //     title: 'Hoooolddd Up',
        //     text: 'Please fill in all the fields before you can proceed', 
        //     icon: 'error'
        // });
        UI.showAlert('Please fill in all fields', 'danger')
     } else {
    // Instatiate a new Book
    const book = new Book(title, author, isbn);


    //add book to UI
    UI.addBookToList(book);

    //add book to store
        Store.addBook(book);


    //Show success message 
      //UI.showAlert('Book Added', 'success')
    swal({
            title: 'Congratulations!!!!',
            text: 'You have successfully added a book', 
            icon: 'success'
        });

    // clear fields

    UI.clearFields();
     }
})



// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    //remove book from UI
    UI.deleteBook(e.target)

    //remove book from local store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // show success message
    UI.showAlert('Book Removed', 'success')
})


