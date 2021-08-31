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

// Modal show event listener
modalShow.addEventListener("click", showModal);
