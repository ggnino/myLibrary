function Books(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
  };
}
let userBook = new Books();
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
  const bookClassName = "library-book";

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
  eventAdder();
  if (!book) myBookShelf.append(...myLibrary);
}

function clickHandler(e) {
  const dialog = document.getElementsByTagName("dialog")[0];
  const form = document.getElementsByClassName("library-modal-form")[0];
  const closeBtn = document.getElementById("modal-close-btn");

  console.log(e.target.id);

  if (e.target.className.includes("add")) dialog.showModal();
  else {
    const myBookShelf = document.getElementsByClassName("library-bookshelf")[0];
    const myLibrary = document.getElementsByClassName("library-book");
    let inLibrary = false;
    for (let book of myLibrary) {
      if (
        book.children[0].textContent.toLowerCase() ===
        userBook.title.toLowerCase()
      ) {
        inLibrary = true;
      }
    }
    if (!inLibrary) {
      myBookShelf.appendChild(createBookElements(userBook));
      closeBtn.disabled = true;
      form.reset();
      dialog.close();
    } else {
      closeBtn.disabled = true;
      form.reset();
    }

    for (let prop in userBook) {
      if (userBook[prop]) userBook[prop] = "";
    }
  }
}

function eventAdder() {
  const addBtn = document.getElementsByClassName("library-add-btn")[0];
  const closeBtn = document.getElementById("modal-close-btn");
  const titleInput = document.getElementById("book_title");
  const authorInput = document.getElementById("book_author");
  const pagesInput = document.getElementById("book_pages");
  const readInput = document.getElementById("book_read");
  const deleteBtns = document.getElementsByClassName("library-book-btn");
  for (let btn of deleteBtns) {
    btn.addEventListener("click", (e) => clickHandler(e));
  }
  closeBtn.disabled = true;
  addBtn.addEventListener("click", (e) => clickHandler(e));
  closeBtn.addEventListener("click", (e) => clickHandler(e));
  titleInput.addEventListener("input", (e) => inputHandler(e));
  authorInput.addEventListener("input", (e) => inputHandler(e));
  pagesInput.addEventListener("input", (e) => inputHandler(e));
  readInput.addEventListener("input", (e) => inputHandler(e));
}

function inputHandler(e) {
  if (e.target.id === "book_title") userBook.title = e.target.value;
  if (e.target.id === "book_author") userBook.author = e.target.value;
  if (e.target.id === "book_pages") userBook.pages = e.target.value;
  if (e.target.id.includes("read")) userBook.read = e.target.value;
  if (userBook.author && userBook.title && userBook.pages) {
    console.log("aqui");
    const closeBtn = document.getElementById("modal-close-btn");
    closeBtn.disabled = false;
  }
  console.log(userBook.author, userBook.title, userBook.pages);
  console.log(userBook.author && userBook.title && userBook.pages);
}

addBookToLibrary();
