let library = [];

const bookshelf = document.querySelector('#bookshelf');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const read = document.querySelector('#read');

const submit = document.querySelector('#submit');
const removeAll = document.querySelector('#remove-all');

submit.addEventListener('click', () => {
    if (title.value && author.value != '')
        storeBook();
});

removeAll.addEventListener('click', clearAll);

function Book() {
    this.title = title.value;
    this.author = author.value;
    this.read = read.checked;
}

function storeBook() {
    const book = new Book();
    library.push(book);

    localStorage.setItem('library', JSON.stringify(library));
    saveData();
    form.reset();

    console.log(library);
    render();
}

function saveData() {
    localStorage.setItem('library', JSON.stringify(library));
    render();
}

function clearAll() {
    localStorage.clear();
    library.splice(0, library.length);
    render();
}

function getData() {
    if (localStorage.library)
        library = JSON.parse(localStorage.getItem('library'));
    render();
}

//----------------------------------------------------------------------------------------------------------------------------------------

function render() {
    const books = document.querySelectorAll('.book-card');
    books.forEach(book => bookshelf.removeChild(book));

    for (let i = 0; i < library.length; i++) {
        createBook(library[i]);
    }
}

function createBook(book) {

    const card = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const read = document.createElement('p');
    const remove = document.createElement('button');

    card.classList.add('book-card');
    card.setAttribute('id', library.indexOf(book));

    title.classList.add('title');
    title.textContent = book.title;
    card.appendChild(title);

    author.classList.add('author');
    author.textContent = book.author;
    card.appendChild(author);

    read.classList.add('read');
    read.style.cursor = 'pointer';
    book.read ? (read.textContent = 'Read', read.style.backgroundColor = 'green') : (read.textContent = 'Not read', read.style.backgroundColor = 'red');

    read.addEventListener('click', () => {
        book.read ? book.read = false : book.read = true;
        book.read ? (read.textContent = 'Read', read.style.backgroundColor = 'green') : (read.textContent = 'Not read', read.style.backgroundColor = 'red');
        saveData();
    });

    card.appendChild(read);

    remove.classList.add('remove-book');
    remove.textContent = 'Remove';

    remove.addEventListener('click', () => {
        library.splice(card.id, 1);
        saveData();
    });

    card.appendChild(remove);

    bookshelf.appendChild(card);
}

getData();