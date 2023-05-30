"use script";
const form = document.querySelector("#signinForm");
const email_error = document.querySelector(".handle--error--mail");
const password_error = document.querySelector(".handle--error--password");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  email_error.textContent = "";
  password_error.textContent = "";

  const customer_email = form.customer_email.value;
  const customer_password = form.customer_password.value;

  //console.log(license_number, first_name, last_name, address, city, email, password);

  try {
    const res = await fetch("/signin", {
      method: "POST",
      body: JSON.stringify({
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
    }

    if (data.customer) {
      location.assign("/");
    }
  } catch (err) {
    console.log(err);
  }
});
