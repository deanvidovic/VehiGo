"use script";
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

const form = document.querySelector("#signupForm");
const email_error = document.querySelector(".handle--error--mail");
const password_error = document.querySelector(".handle--error--password");
const license_error = document.querySelector(".handle--error--license_number");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  email_error.textContent = "";
  password_error.textContent = "";
  license_error.textContent = "";

  const customer_driver_license_number =
    form.customer_driver_license_number.value;
  const customer_first_name = form.customer_first_name.value;
  const customer_last_name = form.customer_last_name.value;
  const customer_home_address = form.customer_home_address.value;
  const customer_city = form.customer_city.value;
  const customer_email = form.customer_email.value;
  const customer_password = form.customer_password.value;

  //console.log(license_number, first_name, last_name, address, city, email, password);

  try {
    const res = await fetch("/signup", {
      method: "POST",
      body: JSON.stringify({
        customer_driver_license_number,
        customer_first_name,
        customer_last_name,
        customer_home_address,
        customer_city,
        customer_email,
        customer_password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (data.errors) {
      email_error.textContent = data.errors.email;
      password_error.textContent = data.errors.password;
      license_error.textContent = data.errors.license_error;
    }

    if (data.customer) {
      location.assign("/");
    }
  } catch (err) {
    console.log(err);
  }
});
