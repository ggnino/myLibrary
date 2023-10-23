// const myLibrary = [];

function Books(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
  };
}

function createMyBooks() {
  const book1 = createBookElements(
    new Books("Eloquent JavaScript", "Marijn Haverbeke", 474, "Read")
  );
  const book2 = createBookElements(
    new Books("You Don't Know JS Yet", "Kyle Simpson", 143, "Read")
  );
  const book3 = createBookElements(
    new Books("A Clash of Kings", "George R. R. Martin", 761, "Read")
  );
  const book4 = createBookElements(
    new Books("Alice in Wonderland", "Lewis Carroll", 101, "Read")
  );
  const book5 = createBookElements(
    new Books(
      "Harry Potter and the Sorcerer's Stone",
      "J.K. Rowling",
      145,
      "Read"
    )
  );
  const book6 = createBookElements(
    new Books("Pete the Cat: Trick or Pete", "James Dean", 16, "Read")
  );
  let myBooks = [book1, book2, book3, book4, book5, book6];

  return myBooks;
}

function createBookElements(book) {
  const myBook = document.createElement("div");
  const myBookTitle = document.createElement("h2");
  const myBookAuthor = document.createElement("p");
  const myBookPages = document.createElement("p");
  const myBookRead = document.createElement("p");
  const myBookBtn = document.createElement("button");
  let bookClassName = "library-book";

  myBook.setAttribute("class", bookClassName);
  myBookTitle.setAttribute("class", `${bookClassName}-title`);
  myBookAuthor.setAttribute("class", `${bookClassName}-author`);
  myBookPages.setAttribute("class", `${bookClassName}-pages`);
  myBookRead.setAttribute("class", `${bookClassName}-read`);
  myBookBtn.setAttribute("class", `${bookClassName}-btn`);
  myBookBtn.textContent = "Delete";

  for (let prop in book) {
    if (prop === "title") myBookTitle.textContent = book[prop];
    if (prop === "author") myBookAuthor.textContent = book[prop];
    if (prop === "pages") myBookPages.textContent = book[prop];
    if (prop === "read") myBookRead.textContent = book[prop];
  }
  myBook.append(myBookTitle, myBookAuthor, myBookPages, myBookRead, myBookBtn);

  return myBook;
}

function addBookToLibrary(book = null) {
  const myBookShelf = document.getElementsByClassName("library-bookshelf")[0];

  const myLibrary = createMyBooks();
  if (!book) myBookShelf.append(...myLibrary);
  else myBookShelf.append(book);
}

function clickHandler(e) {
  const dialog = document.getElementsByTagName("dialog")[0];

  if (e.target.className.includes("add")) dialog.showModal();
  else dialog.close();
}
document
  .getElementsByClassName("library-add-btn")[0]
  .addEventListener("click", (e) => clickHandler(e));
document
  .getElementById("modal-close-btn")
  .addEventListener("click", (e) => clickHandler(e));

addBookToLibrary();
