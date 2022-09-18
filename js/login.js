const email = document.getElementById("mail");
const contraseña = document.getElementById("password");

document.addEventListener("DOMContentLoaded", function (){
    localStorage.clear();
    
    email.value = "";
    contraseña.value = "";

    document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        if (email.value != "" && contraseña.value != "") {
            this.location.replace("index.html");
            sessionStorage.setItem("user", email.value);
        };
    });
});