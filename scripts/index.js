const runLibraryApp = () => {
  const userBook = theBook();

  // factory function for creating book objects
  function theBook(title, author, pages, read) {
    return { title, author, pages, read };
  }
  // function for creating initial books
  function createMyBooks() {
    const book1 = createBookElements(
      theBook("Eloquent JavaScript", "Marijn Haverbeke", 474, "Read")
    );
    const book2 = createBookElements(
      theBook("You Don't Know JS Yet", "Kyle Simpson", 143, "Read")
    );
    const book3 = createBookElements(
      theBook("A Clash of Kings", "George R. R. Martin", 761, "Read")
    );
    const book4 = createBookElements(
      theBook("Alice in Wonderland", "Lewis Carroll", 101, "Read")
    );
    const book5 = createBookElements(
      theBook(
        "Harry Potter and the Sorcerer's Stone",
        "J.K. Rowling",
        145,
        "Read"
      )
    );
    const book6 = createBookElements(
      theBook("Pete the Cat: Trick or Pete", "James Dean", 16, "Read")
    );
    let myBooks = [book1, book2, book3, book4, book5, book6];

    return myBooks;
  }

  // function for turning book objects into DOM elements
  function createBookElements(book) {
    const myBook = document.createElement("div");
    const myBookTitle = document.createElement("h2");
    const myBookAuthor = document.createElement("p");
    const myBookPages = document.createElement("p");
    const myBookRead = document.createElement("p");
    const myBookBtn = document.createElement("button");
    const bookClassName = "library-book";
    const booksInLibrary =
      document.getElementsByClassName("library-bookshelf")[0].children.length;

    myBookBtn.addEventListener("click", (e) => clickHandler(e));

    myBook.setAttribute("class", bookClassName);
    myBookTitle.setAttribute("class", `${bookClassName}-title`);
    myBookAuthor.setAttribute("class", `${bookClassName}-author`);
    myBookPages.setAttribute("class", `${bookClassName}-pages`);
    myBookRead.setAttribute("class", `${bookClassName}-read`);
    myBookBtn.setAttribute("class", `${bookClassName}-btn`);
    myBookBtn.setAttribute("id", `delete-btn-${booksInLibrary}`);
    myBookBtn.textContent = "Delete";

    for (let prop in book) {
      if (prop === "title") myBookTitle.textContent = book[prop];
      if (prop === "author") myBookAuthor.textContent = book[prop];
      if (prop === "pages") myBookPages.textContent = book[prop];
      if (prop === "read") myBookRead.textContent = book[prop];
    }
    myBook.append(
      myBookTitle,
      myBookAuthor,
      myBookPages,
      myBookRead,
      myBookBtn
    );

    return myBook;
  }
  // function for adding initial books to the library
  function addBookToLibrary() {
    const myBookShelf = document.getElementsByClassName("library-bookshelf")[0];

    const myLibrary = createMyBooks();

    myBookShelf.append(...myLibrary);
    eventAdder();
  }
  // functon for handling click events
  function clickHandler(e) {
    const myBookShelf = document.getElementsByClassName("library-bookshelf")[0];
    const dialog = document.getElementsByTagName("dialog")[0];
    const form = document.getElementsByClassName("library-modal-form")[0];
    const closeBtn = document.getElementById("modal-close-btn");
    const titleInput = document.getElementById("book_title");
    // click event for add btn
    if (e.target.className.includes("add")) dialog.showModal();
    // click event for delete btn
    else if (e.target.id.includes("delete")) {
      const updatedLibrary = [];

      const bookToDel = e.target.parentNode.children[0].textContent;

      for (let count = 0; count < myBookShelf.children.length; count++) {
        if (myBookShelf.children[count].children[0].textContent !== bookToDel) {
          updatedLibrary.push(myBookShelf.children[count]);
        }
      }

      myBookShelf.replaceChildren(...updatedLibrary);
    }
    // click event for close btn on modal
    else {
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
        titleInput.style.borderColor = "black";
        myBookShelf.appendChild(createBookElements(userBook));
        closeBtn.disabled = true;
        form.reset();
        dialog.close();
      } else {
        titleInput.style.borderColor = "red";
        closeBtn.disabled = true;
        form.reset();
      }
    }
  }
  // function for adding event listeners to DOM elements
  function eventAdder() {
    const addBtn = document.getElementsByClassName("library-add-btn")[0];
    const closeBtn = document.getElementById("modal-close-btn");
    const titleInput = document.getElementById("book_title");
    const authorInput = document.getElementById("book_author");
    const pagesInput = document.getElementById("book_pages");
    const readInput = document.getElementById("book_read");
    const deleteBtns = document.getElementsByClassName("library-book-btn");
    let counter = 1;
    for (let btn of deleteBtns) {
      btn.setAttribute("id", `delete-btn-${counter}`);
      btn.addEventListener("click", (e) => clickHandler(e));
      counter++;
    }

    closeBtn.disabled = true;
    addBtn.addEventListener("click", (e) => clickHandler(e));
    closeBtn.addEventListener("click", (e) => clickHandler(e));
    titleInput.addEventListener("input", (e) => inputHandler(e));
    authorInput.addEventListener("input", (e) => inputHandler(e));
    pagesInput.addEventListener("input", (e) => inputHandler(e));
    readInput.addEventListener("input", (e) => inputHandler(e));
  }
  // function for handling the input
  function inputHandler(e) {
    if (e.target.id === "book_title") userBook.title = e.target.value;
    if (e.target.id === "book_author") userBook.author = e.target.value;
    if (e.target.id === "book_pages") userBook.pages = e.target.value;
    if (e.target.id.includes("read")) userBook.read = e.target.value;
    if (userBook.author && userBook.title && userBook.pages) {
      const closeBtn = document.getElementById("modal-close-btn");
      closeBtn.disabled = false;
    }
  }

  addBookToLibrary();
};

runLibraryApp();
