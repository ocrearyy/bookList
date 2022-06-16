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
        const storedBooks = [
            {
                title: 'Book One',
                author: 'John Doe',
                isbn: '1234'
            },
            {
                title: 'Book two',
                author: 'Jane Mary',
                isbn: '5678'
            }
        ];
      const books = storedBooks;

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

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

    }
}
// Store Class: Handles Storage

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
        swal({
            title: 'Hoooolddd Up',
            text: 'Please fill in all the fields before you can proceed', 
            icon: 'error'
        });
     } else {

    // Instatiate a new Book

    const book = new Book(title, author, isbn);

    UI.addBookToList(book);

    // clear fields

    UI.clearFields();
     }
})



// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target)
})