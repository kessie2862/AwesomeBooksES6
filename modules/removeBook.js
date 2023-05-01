const removeBook = (index, bookList) => {
  bookList.splice(index, 1);
  localStorage.setItem('books', JSON.stringify(bookList));
};

export default removeBook;
