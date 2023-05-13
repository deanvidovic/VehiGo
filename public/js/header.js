"use strict";


let searchBtn = document.querySelector(".search-icon");
let searchBar = document.querySelector(".search-bar");

//Search button
searchBtn.addEventListener("click", () => {
    searchBar.classList.toggle("active");
  });
