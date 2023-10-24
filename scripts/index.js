const runLibraryApp = (() => {
  const userBook = theBook();
  const libraryContainer =
    document.getElementsByClassName("library-container")[0];

  const myBookShelf = libraryContainer.children[1];
  // factory function for creating book objects
  function theBook(title, author, pages, read) {
    return { title, author, pages, read };
  }
  // function for creating initial books
  function createMyBooks() {
    const book1 = createBookElements(
      theBook("Eloquent JavaScript", "Marijn Haverbeke", 474, "True")
    );
    const book2 = createBookElements(
      theBook("You Don't Know JS Yet", "Kyle Simpson", 143, "True")
    );
    const book3 = createBookElements(
      theBook("A Clash of Kings", "George R. R. Martin", 761, "True")
    );
    const book4 = createBookElements(
      theBook("Alice in Wonderland", "Lewis Carroll", 101, "True")
    );
    const book5 = createBookElements(
      theBook(
        "Harry Potter and the Sorcerer's Stone",
        "J.K. Rowling",
        145,
        "True"
      )
    );
    const book6 = createBookElements(
      theBook("Pete the Cat: Trick or Pete", "James Dean", 16, "True")
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
    const booksInLibrary = myBookShelf.children.length;

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
    const myLibrary = createMyBooks();

    myBookShelf.append(...myLibrary);
    eventAdder();
  }

  // functon for handling click events
  function clickHandler(e) {
    const dialog = myBookShelf.children[0];
    const form = dialog.children[0];
    const closeBtn = form.children["modal-close-btn"];
    const titleInput = form.children["book_title"];
    const myLibrary = [...myBookShelf.children];

    // click event for add btn
    if (e.target.className.includes("add")) dialog.showModal();
    // click event for delete btn
    else if (e.target.id.includes("delete")) {
      const updatedLibrary = [];
      const bookToDel = e.target.parentNode.children[0].textContent;

      for (let count = 0; count < myLibrary.length; count++) {
        if (myLibrary[count].children[0].textContent !== bookToDel) {
          updatedLibrary.push(myLibrary[count]);
        }
      }

      myBookShelf.replaceChildren(...updatedLibrary);
    }
    // click event for close btn on modal
    else {
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
        dialog.close();
      } else {
        titleInput.style.borderColor = "red";
        closeBtn.disabled = true;
      }
      form.reset();
      resetModalInputs();
    }
  }

  function resetModalInputs() {
    for (let prop in userBook) {
      if (userBook[prop]) userBook[prop] = "";
    }
  }
  function getUserElements(elements) {
    let titleInput = null,
      authorInput = null,
      pagesInput = null,
      readInput = null,
      addBtn = libraryContainer.children[0].children[1],
      deleteBtns = [],
      closeBtn = null;
    for (let prop in myBookShelf.children) {
      if (myBookShelf.children[prop].children) {
        const bookEl = myBookShelf.children[prop].children;

        for (let p in bookEl) {
          if (bookEl[p].id === "delete-btn-1") {
            deleteBtns.push(bookEl[p]);
          }
        }
      }
    }

    for (let element of elements) {
      if (element.id === "book_title") titleInput = element;
      if (element.id === "book_author") authorInput = element;
      if (element.id === "book_pages") pagesInput = element;
      if (element.id === "book_read") readInput = element;
      if (element.id === "modal-close-btn") closeBtn = element;
    }
    return {
      titleInput,
      authorInput,
      pagesInput,
      readInput,
      closeBtn,
      addBtn,
      deleteBtns,
    };
  }
  // function for adding event listeners to DOM elements
  function eventAdder() {
    const elements = myBookShelf.children[0].children[0].children;
    const {
      titleInput,
      authorInput,
      pagesInput,
      readInput,
      addBtn,
      closeBtn,
      deleteBtns,
    } = getUserElements(elements);

    for (let counter = 1; counter < deleteBtns.length; counter++) {
      deleteBtns[counter].setAttribute("id", `delete-btn-${counter}`);
      deleteBtns[counter].addEventListener("click", (e) => clickHandler(e));
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
    if (userBook.author && userBook.title && userBook.pages && userBook.read) {
      const closeBtn =
        myBookShelf.children[0].children[0].children["modal-close-btn"];
      closeBtn.disabled = false;
    }
  }

  addBookToLibrary();
})();
