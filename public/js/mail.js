"use strict";
const sendMailBtn = document.querySelector(".submit");

sendMailBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.querySelector(".name").value;
  const sender = document.querySelector(".email").value;
  const subject = document.querySelector(".subject").value;
  const message = document.querySelector(".message").value;
  console.log(name, sender, subject, message);
  Email.send({
    Host: "smtp.gmail.com",
    Username: "vehigo137301@gmail.com",
    Password: "dlwwyrprbqqoevjk",
    To: "vehigo137301@gmail.com",
    From: sender,
    Subject: subject,
    Body: message,
  }).then((message) => {
    alert("Brao" + message);
  });
});
