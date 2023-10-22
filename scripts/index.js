const myLibrary = [];

function Books(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
  };
}

const book1 = new Books(
  "The Communist Manifiesto",
  "Karl Marx",
  64,
  "Read Completely"
);

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

function addBookToLibrary() {
  const myBookShelf = document.getElementsByClassName("library-bookshelf")[0];
  console.log(myLibrary);

  for (let x = 1; x <= 6; x++) {
    myLibrary.push(createBookElements(book1));
  }

  myBookShelf.append(...myLibrary);
}

addBookToLibrary();
