"use strict";

// const searchBtn = document.querySelector(".search-icon");
// const searchBar = document.querySelector(".search-bar");

// //Search button
// searchBtn.addEventListener("click", () => {
//   searchBar.classList.toggle("active");
// });

// window.addEventListener("scroll", function () {});

const hamburgerMenu = document.querySelector(".hamburger--menu");
const mainMenu = document.querySelector(".menu");

hamburgerMenu.addEventListener("click", function () {
  mainMenu.classList.toggle("active--hamburger");
  hamburgerMenu.classList.toggle("active--menu");
});
