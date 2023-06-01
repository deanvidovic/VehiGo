"use script";





const filterButton = document.querySelectorAll(".filter--btn");
const paragraph = document.querySelector(".filter--btn p");



const filterBtn = Array.from(filterButton);

filterBtn.forEach(btn => {
    btn.addEventListener('click', async (e) => {
        const url = "/cars";
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                }
            });
        
            const data = await res.json();
            const arr = data.cars;
            const arrNames = new Set();
            arr.forEach(car => {
                arrNames.add(car.car_brand); 
            });


       
          } catch (err) {
            console.log(err);
          }
    });
});

  

// filterBtn.forEach(btn => {
// });