"use strict";

const dropdown = document.querySelector(".dropdown");
const dropdownActive = document.querySelector(".menu-item.dropdown--active");
const dropdownItems = document.querySelectorAll(".dropdown--items");

dropdownActive.addEventListener("mouseover", function (e) {
  console.log(e.target);
  dropdown.classList.add("active");
});

dropdownItems.forEach(function (e) {
  e.addEventListener("mouseout", function (e) {
    dropdown.classList.remove("active");
  });
});
