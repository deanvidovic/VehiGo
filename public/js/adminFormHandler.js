"use script";
const form = document.querySelector("#adminForm");
const admin_password_error = document.querySelector(".handle--error--password");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  admin_password_error.textContent = "";

  const admin_username = form.admin_username.value;
  const admin_password = form.admin_password.value;

  //console.log(license_number, first_name, last_name, address, city, email, password);

  try {
    const res = await fetch("/admin", {
      method: "POST",
      body: JSON.stringify({
        admin_username,
        admin_password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (data.errors) {
      admin_password_error.textContent = data.errors.worker_password;
    }

    if (data.admin) {
      location.assign("/panel");
    }
  } catch (err) {
    console.log(err);
  }
});
