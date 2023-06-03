"use script";
/**************ADMIN PANEL*************/
const adminNavList = document.querySelectorAll(".navigation--item");
const navAdminListArr = Array.from(adminNavList);

const navAdminIndex = navAdminListArr.find((e) =>
  e.classList.contains("active--item")
);
navAdminListArr.forEach((e) => {
  e.addEventListener("click", (btn) => {
    btn.preventDefault();
    navAdminListArr.forEach((but) => {
      but.classList.remove("active--item");
    });
    btn.target.classList.add("active--item");
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
