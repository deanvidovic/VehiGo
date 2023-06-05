"use script";

const filterButton = document.querySelectorAll(".filter--btn");
const allCars = document.querySelectorAll(".card--car");
const carsHeading = document.querySelectorAll(".card--heading");

const carsArrHed = Array.from(carsHeading);
const allCarsArr = Array.from(allCars);
const filterBtn = Array.from(filterButton);

// filterBtn.forEach(btn => {
//     btn.addEventListener('click', async (e) => {
//         const url = "/cars";
//         try {
//             const res = await fetch(url, {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 }
//             });
//             const data = await res.json();
//             const arr = data.cars;
//             const arrNames = new Set();
//             arr.forEach(car => {
//                 arrNames.add(car.car_brand);
//             });
//           } catch (err) {
//             console.log(err);
//           }
//     });
// });

console.log(filterBtn);

filterBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const btnText = btn
      .querySelector(".filter--btn--text")
      .innerText.toLowerCase();
    allCarsArr.forEach((car, i) => {
      console.log(carsArrHed[i].innerText);
      const nameSplitted = carsArrHed[i].innerText.split(" ");
      const brandName = nameSplitted[nameSplitted.length - 1];
      console.log(brandName.toLowerCase());
    });
  });
});

// filterBtn.forEach(btn => {
// });
