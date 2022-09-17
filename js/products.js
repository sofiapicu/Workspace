
let currentProductsArray = [];
let fileJSON = {};
const usuario = document.getElementById("usuario");


function showProductsList(arr){

    let htmlContentToAppend = "";
    for(let i = 0; i < arr.length; i++){
        let product = arr[i];

            htmlContentToAppend += `
            <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
            `
        
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }

    if (currentProductsArray.length == 0) {
        htmlContentToAppend += ` 
        <div class="list-group-item list-group-item-action cursor-active">
            <p> No hay productos </p> 
        </div>
        `
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    };

    document.getElementById("subtitle").innerHTML = "Verás aquí todos los productos de la categoría " + fileJSON.catName + ".";
}

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

// Empieza SORT
const btnMayorMenor = document.getElementById("mayorMenor");
const btnMenorMayor = document.getElementById("menorMayor");
const btnPreDet = document.getElementById("preDet");
let auxArr = [];

function copyArr (arr){
    for(let i = 0; i < arr.length; i++) {
        auxArr.push(arr[i]);
    }
};
// Termina SORT

//Empieza FILTER
const minVal = document.getElementById("min");
const maxVal = document.getElementById("max");
const btnFilter = document.getElementById("filter");
const btnClear = document.getElementById("clear");

function filteredCond (arr) {
    return  arr.filter((arr_i) => (maxVal.value >= arr_i.cost) && (arr_i.cost>= minVal.value));
};

// Termina FILTER

document.addEventListener("DOMContentLoaded", function(){
    getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data.products;
            fileJSON = resultObj.data;
            console.log(fileJSON);
            copyArr(resultObj.data.products);
        }
        showProductsList(currentProductsArray)
        console.log(currentProductsArray);
    });

    usuario.innerText = sessionStorage.getItem("user");

    btnMayorMenor.addEventListener("click", function(){
        currentProductsArray.sort(function(a, b) { // De mayor a menor (numericamente)
            if ( a.cost < b.cost ){ return 1; }
            if ( a.cost > b.cost ){ return -1; }
            return 0;
        });
        showProductsList(currentProductsArray);
    });
    
    btnMenorMayor.addEventListener("click", function(){
        currentProductsArray.sort(function(a, b) { // De menor a mayor (numericamente)
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
        showProductsList(currentProductsArray);
    });
    
    btnPreDet.addEventListener("click", function(){
        showProductsList(auxArr)
    });

    btnFilter.addEventListener("click", function (){
        showProductsList(filteredCond(auxArr));
    });

    btnClear.addEventListener("click", function() {
        showProductsList(auxArr);
        minVal.value = null;
        maxVal.value = null;
    });

});