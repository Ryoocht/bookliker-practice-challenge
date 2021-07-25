const baseURL = "http://localhost:3000/books";

document.addEventListener("DOMContentLoaded", function() {
    fetchBookList();
});

function fetchBookList(){
    fetch(baseURL)
    .then(resp => resp.json())
    .then(result => {
        result.forEach(bookObj => {
            renderBookTitles(bookObj)
        });
    })
}

function renderBookTitles(bookObj){
    let bookList = document.querySelector("#list");
    let list = document.createElement("li");
    list.innerText = bookObj.title;
    list.id = bookObj.id;
    bookList.appendChild(list);

    list.addEventListener("click", e => {
        const bookId = e.target.id;
        removeLastChildDiv();
        renderBookDetails(bookId);
    });
}

function renderBookDetails(bookId){
    fetch(`${baseURL}/${bookId}`)
    .then(resp => resp.json())
    .then(bookData => handleBookDetails(bookData))
    .catch(err => console.log(err));
}

function handleBookDetails(details){
    const detailDiv = document.createElement("div"),
        bookCover = document.createElement("img"),
        bookTitle = document.createElement("h3"),
        bookSubtitle = document.createElement("h3"),
        bookAuthor = document.createElement("h3"),
        bookDesc = document.createElement("p"),
        bookUserList = document.createElement("ul"),
        bookUsers = document.createElement("li");
    bookUserList.appendChild(bookUsers);
    detailDiv.append(bookCover, bookTitle, bookSubtitle, bookAuthor, bookDesc, bookUserList);
    document.querySelector("body").appendChild(detailDiv);

    bookCover.src = details.img_url;
    bookTitle.innerText = details.title;
    bookSubtitle.innerText = details.subtitle;
    bookAuthor.innerText = details.author;
    bookDesc.innerText = details.description;
    details.forEach(key => bookUsers.innerText = key.username);

}

function removeLastChildDiv(){
    document.querySelector("body").lastChild.remove();
}
