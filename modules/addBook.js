const addBook = (book, bookList) => {
  bookList.push(book);
  localStorage.setItem('books', JSON.stringify(bookList));
};

export default addBook;
