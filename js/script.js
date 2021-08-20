console.log('This is library management website');
showAll();
function showAll() {
    let allBooks = JSON.parse(localStorage.getItem('books')) ?? [];
    allBooks.forEach(function (book, index) {
        let table = document.querySelector('.books-details');
        table.innerHTML += `
            <tr>
                <td>${book.bookName}</td>
                <td>${book.authorName}</td>
                <td>${book.genre}</td>
                <td><button class="book-delete" onclick="removeEl(${index})"><i class="fa fa-minus-circle" aria-hidden="true"></i></button></td>
            </tr>`;
            let rows = table.getElementsByTagName("tr");
            for (let i = 0; i < rows.length; i++) {
                if (i % 2 != 0) {
                    rows[i].className = 'odd';
                }
                else {
                    rows[i].className = 'even';
                }
            }
    });
}

function removeEl(index) {
    let allBooks = JSON.parse(localStorage.getItem('books'));
    allBooks.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(allBooks));
    let table = document.querySelector('.books-details');
    table.innerHTML = '';   
    showAll();

}

class Book {
    constructor(bookName, authorName, genre) {
        this.bookName = bookName;
        this.authorName = authorName;
        this.genre = genre;
    }
}
class User {
    constructor(personName, age, address, gender) {
        this.personName = personName;
        this.age = age;
        this.address = address;
        this.gender = gender;
    }
}

class Display {
    addBook(book) {
        let existingBooks = JSON.parse(localStorage.getItem('books')) ?? [];
        console.log(existingBooks);
        existingBooks.push({
            'bookName': book.bookName,
            'authorName': book.authorName,
            'genre': book.genre
        });
        localStorage.setItem('books', JSON.stringify(existingBooks));
        let table = document.querySelector('.books-details');
        table.innerHTML += `
            <tr>
                <td>${book.bookName}</td>
                <td>${book.authorName}</td>
                <td>${book.genre}</td>
                <td><button class="book-delete"><i class="fa fa-minus-circle" aria-hidden="true"></i></button></td>
            </tr>`;
        let rows = table.getElementsByTagName("tr");
        for (let i = 0; i < rows.length; i++) {
            if (i % 2 != 0) {
                rows[i].className = 'odd';
            }
            else {
                rows[i].className = 'even';
            }
        }
    }
    validateBook(book) {
        if (book.bookName.length < 3 || book.authorName.length < 3) {
            return false;
        }
        return true;
    }
}

let addBookButton = document.getElementById('addbook');
addBookButton.addEventListener('click', afterBookSubmit);


function afterBookSubmit(e) {
    e.preventDefault();
    console.log('You have submitted form');
    const bookName = document.getElementById('bookName').value;
    const authorName = document.getElementById('authorName').value;
    const fiction = document.getElementById('fiction');
    const nonFiction = document.getElementById('non-fiction');
    const literature = document.getElementById('literature');
    let genre;

    if (fiction.checked) {
        genre = fiction.value;
    }
    else if (nonFiction.checked) {
        genre = nonFiction.value;
    }
    else {
        genre = literature.value;
    }
    const bookToAdd = new Book(bookName, authorName, genre);
    const myDisplay = new Display();
    console.log(bookToAdd);
    if (myDisplay.validateBook(bookToAdd)) {
        myDisplay.addBook(bookToAdd);
        const form = document.getElementById('book-enroll');
        form.reset();
    }
    else {
        console.log('Please enter valid book and author name');
    }
}