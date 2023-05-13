"use strict";

//Variables initialization

const carLogos = document.querySelectorAll(".logo");
const leftArr = document.querySelector(".left-arrow");
const rightArr = document.querySelector(".right-arrow");

const modelsList = document.querySelector(".models-list");

const carImg = document.querySelector(".car-image");




/**************HOME PAGE*************/ 


//Header
const carLogosArr = Array.from(carLogos);
let currentBrand = "volkswagen";
let flag = true;
let brandArr = currentBrand + "Models";


//Privremeno dok nema baze
//!!!!Slike spremamo [imeMarke][imeModela].png
const carsArr = {
  mercedesModels: ["A klasa", "B klasa", "C klasa", "E klasa", "S klasa"],
  volkswagenModels: ["Arteon", "Golf VII", "Passat", "Tiguan", "Touareg"],
  bmwModels: ["X6M", "Series 5", "M8 cabriolet", "M5", "X5M"],
};

//Function for making models name for display
// const className=carsArr["mercedesModels"].map(car=>car.split(" ").join(""));
// // for(let i=0;i<carsArr["mercedesModels"].length;i++){
  // //   className.push(carsArr["mercedesModels"][i].split(" ").join(""));
  // // }
  
  // console.log(className);
  const modelsNames = (obj, arr) => {
    const newCarNames = obj[arr].map((car) => car.split(" ").join(""));
    return newCarNames;
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
  
  //Function which displays aside models list
  const displayModels = (brand) => {
    modelsList.innerHTML = "";
    carsArr[brand].forEach((modBrand) => {
      modelsList.innerHTML += `<li class="models-car">${modBrand}</li>`;
    });
  };
  displayModels(brandArr);
  
  //ovo carsArr[brandArr][0] to samo zamjeni s odgovarajućim atributom iz tablice
  //Function which displays car img
  const displayCarImg = (brand) => {
    carImg.innerHTML = `<img src="./images/mainCars/${brand}${carsArr[brandArr][0]}.png" class="img--car" alt="This is the photo of active car in header section">`;
  };
  
  displayCarImg(currentBrand);
  
  //Function which is calling all functions to get whole UI of header
  const displayUI = (side) => {
    //Display nav of models
    displayNavModels(side);
    
    //Display aside model list
    displayModels(brandArr);
    
    //Display center car img
    displayCarImg(currentBrand);
    
    //For car names
    console.log(modelsNames(carsArr, String(brandArr)));
  };
  
  leftArr.addEventListener("click", (e) => {
    e.preventDefault();
    displayUI("left");
  });
  
  rightArr.addEventListener("click", (e) => {
    e.preventDefault();
    displayUI("right");
  });
  
 
