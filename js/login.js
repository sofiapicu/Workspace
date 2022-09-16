const email = document.getElementById("mail");
const btn = document.getElementById("btn");

document.addEventListener("DOMContentLoaded", function (){
    localStorage.clear()
});

btn.addEventListener("click", () => {
    sessionStorage.setItem("user", email.value);
    console.log(sessionStorage.getItem("user"))
});

