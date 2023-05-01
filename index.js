import addBook from './modules/addBook.js';
import removeBook from './modules/removeBook.js';
import { DateTime } from './modules/luxon.js';
import renderBookList from './modules/renderBookList.js';

class BookList {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];

    this.errorElements = {
      author: document.getElementById('authorError'),
      title: document.getElementById('titleError'),
    };
  }

  init() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();

        navLinks.forEach((navLink) => {
          navLink.classList.remove('active');
        });

        link.classList.add('active');

        const sectionId = link.getAttribute('href').substring(1);
        this.showSection(sectionId);
      });
    });

    const addButton = document.getElementById('add-button');
    addButton.addEventListener('click', (event) => {
      event.preventDefault();
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      if (title && author !== '') {
        const book = { title, author };
        addBook(book, this.books);
        renderBookList(this.books, this.removeBook.bind(this));

        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
      } else if (title === '') {
        this.showError('title', 'Title cannot be empty.');
      } else if (author === '') {
        this.showError('author', 'Author cannot be empty.');
      }
    });

    window.addEventListener('load', () => {
      renderBookList(this.books, this.removeBook.bind(this));
    });
  }

  removeBook(index) {
    removeBook(index, this.books);
    renderBookList(this.books, this.removeBook.bind(this));
  }

  showError(type, message) {
    const errorElement = this.errorElements[type];
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    document.getElementById(type).style.marginBottom = '1rem';
    this.resetInputError();
  }

  resetInputError() {
    setTimeout(() => {
      this.errorElements.title.style.display = 'none';
      this.errorElements.author.style.display = 'none';
    }, 2000);
  }

  showSection = (sectionId) => {
    // Hide all content sections
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach((section) => {
      section.classList.add('hidden');
    });

    // Show the selected content section
    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.remove('hidden');
  };
}

const bookList = new BookList();
bookList.init();

const updateDateTime = () => {
  const now = DateTime.local();
  const date = now.toFormat('yyyy-MM-dd');
  const time = now.toFormat('HH:mm:ss');
  document.getElementById('datetime').innerHTML = `${date} ${time}`;
};

setInterval(updateDateTime, 1000);
