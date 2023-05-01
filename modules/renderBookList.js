const renderBookList = (books, removeBook) => {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';

  const h1 = document.createElement('h1');
  h1.textContent = 'All Awesome Books';
  bookList.appendChild(h1);

  books.forEach((book, index) => {
    const li = document.createElement('li');
    li.textContent = `${book.title} by ${book.author}`;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      removeBook(index);
      renderBookList(books, removeBook);
    });
    li.appendChild(removeBtn);
    bookList.appendChild(li);
  });
};

export default renderBookList;
