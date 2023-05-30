"use script";
const startDateCalendar = document.querySelector("#start--date");
const endDateCalendar = document.querySelector("#end--date");
const reservationButton = document.querySelector(".reservation--button");

console.log(startDateCalendar);

const date = new Date();
const curDay = date.getDate().toString().padStart(2, "0");
const curMonth = (date.getMonth() + 1).toString().padStart(2, "0");

const curYear = date.getFullYear().toString();

const today = `${curYear}-${curMonth}-${curDay}`;

startDateCalendar.setAttribute("min", today);

console.log(startDateCalendar.value);

reservationButton.addEventListener("click", () => {
  console.log(startDateCalendar.value, endDateCalendar.innerHTML);
});
