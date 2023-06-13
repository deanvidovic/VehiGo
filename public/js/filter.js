"use script";

const filterButton = document.querySelectorAll(".filter--btn");
const allCars = document.querySelectorAll(".card--car");
const carsHeading = document.querySelectorAll(".card--heading");

const carsArrHed = Array.from(carsHeading);
const allCarsArr = Array.from(allCars);
const filterBtn = Array.from(filterButton);

filterBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modelName = btn.getAttribute("data-model");
    allCars.forEach((car) => {
      car.style.display = "none";
      if (modelName === car.getAttribute("data-model")) {
        car.style.display = "block";
      } else if (modelName === "all") {
        car.style.display = "block";
      }
    });
  });
});
