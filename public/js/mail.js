"use strict";
const sendMailBtn = document.querySelector(".submit");

sendMailBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.querySelector(".name").value;
  const sender = document.querySelector(".email").value;
  console.log(name, sender);
  // Email.send({
  //   Host: "smtp.gmail.com",
  //   Username: "vehigo137301@gmail.com",
  //   Password: "dlwwyrprbqqoevjk",
  //   To: "them@website.com",
  //   From: "you@isp.com",
  //   Subject: "This is the subject",
  //   Body: "And this is the body",
  // }).then((message) => alert(message));
});
