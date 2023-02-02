"use strict";

const GOOGLE_SEARCH_BASE_URL = "https://www.google.com/search?q=";
const link = document.querySelector("a[href='https://www.google.com/']");

function getGoogleSearchUrl(searchTerm) {
  return GOOGLE_SEARCH_BASE_URL + encodeURIComponent(searchTerm);
}

function openGoogleSearch(searchTerm) {
  location.href = getGoogleSearchUrl(searchTerm);
}

link.addEventListener("click", function (event) {
  // Prevent link from opening a new tab
  event.preventDefault();
  const searchTerm = prompt("Please enter a search term:");
  alert("You'll be redirected to your search results in 5 seconds.");
  setTimeout(function () {
    openGoogleSearch(searchTerm);
  }, 5000);
});