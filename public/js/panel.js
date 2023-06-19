"use script";
/**************ADMIN PANEL*************/
const adminNavList = document.querySelectorAll(".navigation--list");
// console.log(adminNavList);
const navAdminListArr = Array.from(adminNavList);
const asideTabs = document.querySelectorAll(".navigation--item");

const profileContainer = document.querySelector(".profile--container");
const logutAdmin = document.querySelector(".logout--admin");

navAdminListArr.forEach((e) => {
  e.addEventListener("click", (btn) => {
    const clicked = btn.target.closest(".navigation--item");
    // btn.preventDefault();
    asideTabs.forEach((tab) => {
      tab.classList.remove("active--item");
    });
    clicked.classList.add("active--item");
    // window.location.href = "/panel";
  });
});

function allowOnlyNumbers(event) {
  var keyCode = event.which ? event.which : event.keyCode;
  var isValid =
    (keyCode >= 48 && keyCode <= 57) ||
    keyCode === 8 ||
    keyCode === 9 ||
    keyCode === 13 ||
    keyCode === 37 ||
    keyCode === 39;
  if (!isValid) {
    event.preventDefault();
  }
}

function allowOnlyLetters(event) {
  var keyCode = event.which ? event.which : event.keyCode;
  var isValid =
    (keyCode >= 65 && keyCode <= 90) ||
    (keyCode >= 97 && keyCode <= 122) ||
    keyCode === 32 ||
    keyCode === 8 ||
    keyCode === 9 ||
    keyCode === 13 ||
    keyCode === 37 ||
    keyCode === 39;
  if (!isValid) {
    event.preventDefault();
  }
}

function allowOnlyNumbersAndBigLetters(event) {
  var keyCode = event.which ? event.which : event.keyCode;
  var isValid =
    (keyCode >= 65 && keyCode <= 90) ||
    (keyCode >= 48 && keyCode <= 57) ||
    keyCode === 8 ||
    keyCode === 9 ||
    keyCode === 13 ||
    keyCode === 37 ||
    keyCode === 39;
  if (!isValid) {
    event.preventDefault();
  }
}

profileContainer.addEventListener("click", function () {
  logutAdmin.classList.toggle("logout");
});
