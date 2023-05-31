"use script";
const form = document.querySelector("#reservationForm");
const url = window.location.href;
const reservation_car_id = url.split("/").pop();
const car_error = document.querySelector("#car--error");


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  car_error.textContent = '';

  const reservation_start = form.start.value;
  const reservation_end = form.end.value;

  //console.log(license_number, first_name, last_name, address, city, email, password);

  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        reservation_car_id,
        reservation_start,
        reservation_end
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    //console.log(data);

    if (data.errors) {
      car_error.textContent = data.errors.car_error;
    }


  } catch (err) {
    console.log(err);
  }
});

