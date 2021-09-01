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

// Handle data from form
const storeBookmark = (e) => {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  //adding http/https to url value
  if (!urlValue.includes("https://") && !urlValue.includes("http://")) {
    urlValue = `https://${urlValue}`;
  }
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
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
