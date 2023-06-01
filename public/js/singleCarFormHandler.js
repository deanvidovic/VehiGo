"use script";
const form = document.querySelector("#reservationForm");
const url = window.location.href;
const reservation_car_id = url.split("/").pop();
const car_error = document.querySelector("#car--error");

const cookie = document.cookie
const reservation_user_id = cookie.split(";").find(item => item.includes("id=")).split("=")[1].trim();
// console.log(reservation_user_id);



form.addEventListener("submit", async (e) => {
  e.preventDefault();

  car_error.textContent = '';

  const reservation_start = form.start.value;
  const reservation_end = form.end.value;

  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        reservation_car_id,
        reservation_start,
        reservation_end,
        reservation_user_id
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (data.errors) {
      car_error.textContent = data.errors.car_error;
    }

    if (data.reservation) {
      car_error.textContent = data.success.success;
    }


  } catch (err) {
    console.log(err);
  }
});

