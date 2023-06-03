"use script";
/**************ADMIN PANEL*************/ 
const adminNavList=document.querySelectorAll(".admin--nav-item");
const navAdminListArr=Array.from(adminNavList);
console.log(navAdminListArr);

const navAdminIndex= navAdminListArr.findIndex(e=>e.classList.contains("active--admin"));
  
function allowOnlyNumbers(event) {
    var keyCode = event.which ? event.which : event.keyCode;
    var isValid =
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
  