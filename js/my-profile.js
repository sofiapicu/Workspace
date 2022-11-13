const form = document.getElementById("form");
const firstName = document.getElementById("firstName");
const firstLastname = document.getElementById("firstLastname");
const email = document.getElementById("email");
const secondName = document.getElementById("secondName");
const secondLastname = document.getElementById("secondLastname");
const contactPhone = document.getElementById("contactPhone");
const saveChanges = document.getElementById("saveChanges");
const closeBtn = document.getElementById("closeBtn");
const alertError = document.getElementById("alertError");

const loginVerification = () => {
    const saveEmail = sessionStorage.getItem("user");
    if (saveEmail !== null) {
        email.value = saveEmail;
    } else {
        this.location.replace("login.html");
    }
};

const inputVerification = (element) => {
    if (element.value !== "") {   //   || element.value !== sessionStorage.getItem("key del elemento")
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
    }
};

const requiredInputVerification = () => {
    inputVerification(firstName);
    inputVerification(firstLastname);
    inputVerification(email);


    firstName.setAttribute("oninput", "inputVerification(this)");
    firstLastname.setAttribute("oninput", "inputVerification(this)");
    email.setAttribute("oninput", "inputVerification(this)");
};

const showSavedData = (element, data) => {
    if (data !== null){
        element.value = data;
    }
};

saveChanges.addEventListener("click", () => {

    requiredInputVerification();
    
    if (firstName.classList.contains("is-valid") &&
        firstLastname.classList.contains("is-valid") &&
        email.classList.contains("is-valid")) {

        sessionStorage.setItem("secondName", secondName.value);
        sessionStorage.setItem("secondLastname", secondLastname.value);
        sessionStorage.setItem("contactPhone", contactPhone.value);
        
        sessionStorage.setItem("firstName", firstName.value);
        firstName.classList.remove("is-valid");
        firstName.removeAttribute("oninput");

        sessionStorage.setItem("firstLastname", firstLastname.value);
        firstLastname.classList.remove("is-valid");
        firstLastname.removeAttribute("oninput");

        sessionStorage.setItem("user", email.value);
        email.classList.remove("is-valid");
        email.removeAttribute("oninput");

        this.location.reload()

    } else {
        // alerta de error
        alertError.hidden = false;
    }
    
});

closeBtn.addEventListener("click", () => {
    alertError.hidden = true;
});

document.addEventListener("DOMContentLoaded", () => {

    console.log(sessionStorage.getItem("user"));
    
    loginVerification();

    showSavedData(firstName, sessionStorage.getItem("firstName"));
    showSavedData(firstLastname, sessionStorage.getItem("firstLastname"));
    showSavedData(contactPhone, sessionStorage.getItem("contactPhone"));
    showSavedData(secondName, sessionStorage.getItem("secondName"));
    showSavedData(secondLastname, sessionStorage.getItem("secondLastname"));

    usuario.innerText = sessionStorage.getItem("user");
});
