const usuario = document.getElementById("usuario");
const userNum = 25801;
const table = document.getElementById("table");
let data = {};

const calcSubTot = (cantUni, unitCost) => {
    let subTotValue = 0;
    const subTotContainer = document.getElementById("subTot"); 
    subTotValue = cantUni * unitCost;
    subTotContainer.innerText = subTotValue;
};

const tableItem = (arr) => {
    let aux = "";
    for(let item of arr) {
        const { image, name, count, unitCost, currency } = item; //También esta el id del producto en el arr

        aux += `
        <td><img src="${image}" alt="img" style="width: 4rem;"></td>
        <td>${name}</td>
        <td>${unitCost} ${currency}</td>
        <td><input class="w-25" type="number" name="cant" id="cant" min="0" value="${count}" oninput="calcSubTot(this.value, ${unitCost})"></td>
        <td><b id="subTot">${count * unitCost}</b></td>
        `;
    };
    table.innerHTML += aux; 
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