//Select all the needed elements in the document
// assign the elements to a variable
const modal = document.querySelector("#modal");
const modalShow = document.querySelector("#showModal");
const modalClose = document.querySelector("#closeModal");
const bookmarkForm = document.querySelector("#bookmarkForm");
const websiteNameEl = document.querySelector("#websiteName");
const websiteUrlEl = document.querySelector("#websiteUrl");
const bookmarkContainer = document.querySelector("#bookmarkContainer");

// Show the modal, Focus on the website name input field
const showModal = () => {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
};

// Close the modal
const closeModal = () => {
  modal.classList.remove("show-modal");
};

// Handle data from form
const storeBookmark = (e) => {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  console.log(nameValue, urlValue);
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
