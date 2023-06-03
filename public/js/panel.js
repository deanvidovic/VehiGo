"use script";
/**************ADMIN PANEL*************/
const adminNavList = document.querySelectorAll(".navigation--item");
const navAdminListArr = Array.from(adminNavList);

const navAdminIndex = navAdminListArr.find((e) =>
  e.classList.contains("active--item")
);
console.log(navAdminIndex);
console.log(navAdminListArr);
navAdminListArr.forEach((e) => {
  e.addEventListener((el) => {
    const clicked = el.target;
    console.log(el);
    // e.addEventListener("click", () => {
    //   navAdminListArr.forEach((el) => {
    //     el.classList.remove("active--item");
    //   });
    //   e.classList.add("active--item");
    // });
  });
});

/*
// Get the parent container of the navigation buttons
const navContainer = document.querySelector('.navigation-container');

// Add a click event listener to the parent container
navContainer.addEventListener('click', function(event) {
  // Check if the clicked element is a button
  if (event.target.tagName === 'BUTTON') {
    const clickedBtn = event.target;
    
    // Remove the "active--main" class from all buttons
    const buttons = navContainer.querySelectorAll('button.navigation--item');
    buttons.forEach(button => {
      button.classList.remove('active--main');
    });

    // Add the "active--main" class to the clicked button
    clickedBtn.classList.add('active--main');
  }
});

*/

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
