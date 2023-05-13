"use script";
 /**************ADMIN PANEL*************/ 
 const adminNavList=document.querySelectorAll(".admin--nav-item");
// console.log(adminNavList);


 const navAdminListArr=Array.from(adminNavList);
 console.log(navAdminListArr);

 const navAdminIndex= navAdminListArr.findIndex(e=>e.classList.contains("active--admin"));
  
