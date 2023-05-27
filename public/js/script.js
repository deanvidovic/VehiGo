"use strict";

// const { modelNames } = require("mongoose");

//Variables initialization

const carLogos = document.querySelectorAll(".logo");
const leftArr = document.querySelector(".left-arrow");
const rightArr = document.querySelector(".right-arrow");

const carImg = document.querySelector(".car-image");
const modelsSpec = document.querySelector(".models-content");

/**************HOME PAGE*************/

//Header
const carLogosArr = Array.from(carLogos);
let currentBrand = "volkswagen";
let flag = true;
let brandArr = currentBrand + "Models";

//Privremeno dok nema baze
//!!!!Slike spremamo [imeMarke][imeModela].png
const carsArr = {
  mercedesModels: ["Aklasa", { seats: 5, ks: 120, fuel: "benzin" }],
  volkswagenModels: ["Arteon", { seats: 5, ks: 140, fuel: "dizel" }],
  bmwModels: ["X6M", { seats: 5, ks: 160, fuel: "benzin/hybrid" }],
};

//Function which is changing active logos in navigation of logos
const displayNavModels = (side) => {
  let currentIndex = carLogosArr.findIndex((logo) =>
    logo.classList.contains("active-logo")
  );

  const indexCompare = side == "left" ? currentIndex > 0 : currentIndex < 4;
  const decOrIncIndex = side == "left" ? currentIndex - 1 : currentIndex + 1;

  if (indexCompare) {
    carLogosArr[decOrIncIndex].classList.add("active-logo");
    flag = true;
  } else {
    currentIndex = side === "left" ? 3 : 0;
    flag = false;
  }
  if (flag) {
    carLogosArr[currentIndex].classList.remove("active-logo");
    currentBrand = carLogosArr[decOrIncIndex].id;
    brandArr = currentBrand + "Models";
  }
};

//ovo carsArr[brandArr][0] to samo zamjeni s odgovarajućim atributom iz tablice
//Function which displays car img
const displayCarImg = (brand) => {
  // const mainCars=modelsNames(carsArr);
  carImg.innerHTML = `<img src="./images/mainCars/${brand}${carsArr[brandArr][0]}.png" class="img--car" alt="This is the photo of active car in header section">`;
};

displayCarImg(currentBrand);

const displayCarSpec = (brand) => {
  const currentModel = brand + "Models";
  const spec = carsArr[currentModel][1];
  modelsSpec.innerHTML = `
    <div class="spec--container d-flex-center">
      <ion-icon name="people-outline" class="spec--icon"></ion-icon>
      <h1 class="spec--desc"><strong class="spec--important">${spec["seats"]}</strong> seats</h1>
    </div>
    <div class="spec--container d-flex-center">
      <ion-icon name="speedometer-outline" class="spec--icon"></ion-icon>
      <h1 class="spec--desc"><strong class="spec--important">${spec["ks"]}</strong> ks</h1>
    </div>
    <div class="spec--container d-flex-center">
      <ion-icon name="color-fill-outline" class="spec--icon"></ion-icon>
      <h1 class="spec--desc">${spec["fuel"]}</h1>
    </div>
    `;
};
displayCarSpec(currentBrand);
/*
const carsArr = {
  mercedesModels: ["Aklasa", { maxSpeed: 180, kw: 120, seats: 5 }],
  volkswagenModels: ["Arteon", { maxSpeed: 200, kw: 140, seats: 5 }],
  bmwModels: ["X6M", { maxSpeed: 220, kw: 160, seats: 5 }],
};*/

//Function which is calling all functions to get whole UI of header
const displayUI = (side) => {
  //Display nav of models
  displayNavModels(side);

  //Display center car img
  displayCarImg(currentBrand);
  displayCarSpec(currentBrand);
};

leftArr.addEventListener("click", (e) => {
  e.preventDefault();
  displayUI("left");
});

rightArr.addEventListener("click", (e) => {
  e.preventDefault();
  displayUI("right");
});
