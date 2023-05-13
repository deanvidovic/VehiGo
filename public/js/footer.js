"use strict";

//Year
const copyrightParagraph = document.querySelector(".copyright");
const year = new Date().getFullYear();

copyrightParagraph.innerHTML = `Copyright &copy; ${year}`;
