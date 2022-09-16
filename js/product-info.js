let data = {};
let dataCom = [];
const contenedor = document.getElementById("container");

const showProductInfo = (obj) => {
    const { category, cost, currency, description, images, name, soldCount } = obj;
    contenedor.innerHTML += `
    <h2> ${name} </h2>
    <br>
    <h3> Precio </h3>
    <p> ${currency} ${cost} </p>
    <h3> Descripción </h3>
    <p> ${description} </p>
    <h3> Categoría </h3>
    <p> ${category} </p>
    <h3> Cantidad de vendidos </h3>
    <p> ${soldCount} </p>
    <h3> Imágenes ilustrativas </h3>
    `

   /* for (let imgn of images) {
        aux += ` <img src="imgn" alt="imagen producto" class=""> `;
    };*/
    console.log(obj)
    console.log(aux)
};

document.addEventListener("DOMContentLoaded", function(){

    getJSONData(PRODUCT_INFO_URL + localStorage.getItem("prodID") + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
            data = resultObj.data;
        };
        showProductInfo(data);
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
            dataCom = resultObj.data;
        };
        console.log(dataCom);
    });
    
    usuario.innerText = sessionStorage.getItem("user");

});