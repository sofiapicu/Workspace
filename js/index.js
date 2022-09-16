const usuario = document.getElementById("usuario");

document.addEventListener("DOMContentLoaded", function(){

    console.log(sessionStorage.getItem("user"));

    if (sessionStorage.getItem("user") == null) {
        window.location.replace("login.html") 
    };

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });


    usuario.innerText = sessionStorage.getItem("user");
        
});

