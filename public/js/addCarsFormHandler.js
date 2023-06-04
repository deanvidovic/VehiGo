"use script";
const form = document.querySelector("#addCarsForm");
const admin_error = document.querySelector(".car--error")

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const car_license_number = form.car_license_number.value;
  const car_brand = form.car_brand.value;
  const car_model = form.car_model.value;
  const car_type = document.getElementById("car_type").value;
  const car_kilometers = form.car_kilometers.value;
  const car_max_speed = form.car_max_speed.value;
  const car_fuel_consumption = form.car_fuel_consumption.value;
  const car_seats = document.getElementById("car_seats").value;
  const car_fuel_type = document.getElementById("car_fuel_type").value;
  const car_horse_power = form.car_horse_power.value;
  const car_year = form.car_year.value;
  const car_price = form.car_price.value;
  const car_url = form.car_url.value;

  try {
    const res = await fetch("/panel", {
      method: "POST",
      body: JSON.stringify({
        car_license_number,
        car_brand,
        car_model,
        car_type,
        car_kilometers,
        car_max_speed,
        car_fuel_consumption,
        car_seats,
        car_fuel_type,
        car_horse_power,
        car_year,
        car_price,
        car_url
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (data.errors) {
        admin_error.textContent = data.errors.worker_password;
    }

    if (data.car) {
        admin_error.textContent = "Uspjesno ste dodali automobil.";
    }
  } catch (err) {
    console.log(err);
  }
});
