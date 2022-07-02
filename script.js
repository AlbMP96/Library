let library = [];
let newBook;

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const read = document.querySelector('#read');

const submit = document.querySelector('#submit');
const remove = document.querySelector('#remove-all');

submit.addEventListener('click', () => {
    if (title.value && author.value != '')
        storeBook()
});

remove.addEventListener('click', clearAll);

function Book() {
    this.title = title.value;
    this.author = author.value;
    this.read = read.checked;
}

function storeBook() {
    newBook = new Book();
    library.push(newBook);

    localStorage.setItem('library', JSON.stringify(library));
    saveData();
    form.reset();

    console.log(library)
}

function saveData() {
    localStorage.setItem('library', JSON.stringify(library));
}

function getData() {
    if (localStorage.library) {
        library = JSON.parse(localStorage.getItem('library'));
    }
}

function clearAll() {
    localStorage.clear();
    library.splice(0, library.length);
}

getData();