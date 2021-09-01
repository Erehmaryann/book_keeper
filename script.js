//Select all the needed elements in the document
// assign the elements to a variable
const modal = document.querySelector("#modal");
const modalShow = document.querySelector("#showModal");
const modalClose = document.querySelector("#closeModal");
const bookmarkForm = document.querySelector("#bookmarkForm");
const websiteNameEl = document.querySelector("#websiteName");
const websiteUrlEl = document.querySelector("#websiteUrl");
const bookmarkContainer = document.querySelector("#bookmarkContainer");

//Bookmark array
let bookmarks = [];

// Show the modal, Focus on the website name input field
const showModal = () => {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
};

// Close the modal
const closeModal = () => {
  modal.classList.remove("show-modal");
};

// Validate Form
const validate = (nameValue, urlValue) => {
  // Check for space in the url(checking the url pattern)
  const exp =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(exp);
  if (!nameValue || !urlValue) {
    alert("Please submit values for both fields.");
    return false;
  }
  if (!urlValue.match(regex)) {
    alert("please provide a valid web address.");
    return false;
  }
  // Valid
  return true;
};

// Populating Bookmarks DOM
const buildBookmarks = () => {
  // Build items
  bookmarks.forEach((bookmark) => {
    // Destructuring the name and url of each obj
    const { name, url } = bookmark;
    // Item
    const item = document.createElement("div");
    item.classList.add("item");
    //Close Icon
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`);
    // Favicon / Link Container
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    //Favicon
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https//s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute("alt", "Favicon");
    // Link
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    // Append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
  });
};

// Fetch Bookmarks from local storage
const fetchBookmarks = () => {
  // Get bookmarks from localStorage if available
  const getBookmarks = localStorage.getItem("bookmarks");
  if (getBookmarks) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  }
  // On the user first visit to the website
  else {
    // Create bookmarks array in localStorage
    bookmarks = [
      {
        name: "Google",
        url: "https://google.com",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  buildBookmarks();
};

// Handle data from form
const storeBookmark = (e) => {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  //adding http/https to url value
  if (!urlValue.includes("https://") && !urlValue.includes("http://")) {
    urlValue = `https://${urlValue}`;
  }
  //Calling the form validation func
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  // Bookmark obj
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  //set the bookmark array when updating through form
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
};

// Modal show event listener
modalShow.addEventListener("click", showModal);
// Modal close event listener
modalClose.addEventListener("click", closeModal);
// Close Modal when you click outside the box
window.addEventListener("click", (e) => {
  e.target === modal ? modal.classList.remove("show-modal") : false;
});

//Submit Event Listener
bookmarkForm.addEventListener("submit", storeBookmark);

// On load
fetchBookmarks();
