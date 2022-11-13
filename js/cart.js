const usuario = document.getElementById("usuario");
const userNum = 25801;
const table = document.getElementById("table");
let data = {};

const shipping = document.getElementById("shipping");
const subTotCost = document.getElementById("subTotCost");
const shippingCost = document.getElementById("shippingCost");
const totalCost = document.getElementById("totalCost");

let subTotValue = Number;
let shippingValue = Number;

// calculo de los costos
const calcSubTot = (cantUni, unitCost) => {
    const subTotContainer = document.getElementById("subTot");
    subTotValue = cantUni * unitCost;
    subTotContainer.innerText = "USD " + subTotValue;
    calcShippingCost();
    cost();
};

const calcShippingCost = () => {
    if (shipping.value !== "0") {
        shippingValue = Math.round(subTotValue * (shipping.value / 100));
        cost();   
    };
};

const cost = () => {
    subTotCost.innerText = "USD " + subTotValue;
    if (shipping.value !== "0") {
        shippingCost.innerText = "USD " + shippingValue;
        totalCost.innerText = "USD " + (subTotValue + shippingValue);
    };
};
// fin

// Lista de artículos en el carrito
const tableItem = (arr) => {
    let aux = "";
    for(let item of arr) {
        const { image, name, count, unitCost, currency } = item; //También esta el id del producto en el arr

        aux += `
        <td><img src="${image}" alt="img" style="width: 4rem;"></td>
        <td>${name}</td>
        <td>${currency} ${unitCost}</td>
        <td><input class="w-25" type="number" name="cant" id="cant" min="1" value="${count}" oninput="calcSubTot(this.value, ${unitCost})"></td>
        <td><b id="subTot">USD ${subTotValue = count * unitCost}</b></td>
        `;
    };

    table.innerHTML += aux; 
    cost();
};
// fin


// Inputs del modal
const nCuenta = document.getElementById("nCuenta");
const nTarjeta = document.getElementById("nTarjeta");
const codigoSeg = document.getElementById("codigoSeg");
const vencimiento = document.getElementById("vencimiento");
const selectTxt = document.getElementById("selectTxt");

const disableTransfer = () => {
    nCuenta.disabled = true;
    nTarjeta.disabled = false;
    codigoSeg.disabled = false;
    vencimiento.disabled = false;
    selectTxt.innerText = "Tarjeta de crédito";
};

const disableCard = () => {
    nCuenta.disabled = false;
    nTarjeta.disabled = true;
    codigoSeg.disabled = true;
    vencimiento.disabled = true;
    selectTxt.innerText = "Transferencia bancaria";
};
// fin

// Validaciones
const finishBtn = document.getElementById("finishBtn");

(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()


const payModal = document.getElementById("payModal");
const closeModal = document.getElementById("closeModal");

const finishBuy = () => {
    // Validación input: envió
    if (shipping.value == "0") {
        shipping.classList.add("is-invalid");
        shipping.classList.remove("is-valid");
    } else {
        shipping.classList.add("is-valid");
        shipping.classList.remove("is-invalid");
    };

    // Validación modal
    modalValidation()
   
};
// fin

const successAlert = document.getElementById("successAlert");
const showSuccessAlert = () => {
    successAlert.classList.remove("invisible");
    successAlert.classList.add("visible");
};

document.addEventListener("DOMContentLoaded", () => {
    getJSONData(CART_INFO_URL + userNum + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
            data = resultObj.data.articles;
        };
        tableItem(data);
    });

    usuario.innerText = sessionStorage.getItem("user");
});

// credito, nTarjeta, codigoSeg, vencimiento, transferencia, nCuenta
const credito = document.getElementById("credito");
const transferencia = document.getElementById("transferencia");

const modalValidation = () => {
    if (credito.checked) {
        if (nTarjeta.value !== "" && 
            codigoSeg.value !== "" &&
            vencimiento.value !== "") {
                payModal.classList.add("is-valid");
                payModal.classList.remove("is-invalid");
            } else {
                payModal.classList.add("is-invalid");
                payModal.classList.remove("is-valid");
        }
    } else if (transferencia.checked) {
        if (nCuenta.value !== "") {
                payModal.classList.add("is-valid");
                payModal.classList.remove("is-invalid");
            } else {
                payModal.classList.add("is-invalid");
                payModal.classList.remove("is-valid");
        }
    } else {
        payModal.classList.add("is-invalid");
        payModal.classList.remove("is-valid");
    }
    
};

closeModal.addEventListener("click", () => {
    modalValidation();
});