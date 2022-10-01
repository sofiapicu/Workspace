const contenedor = document.getElementById("container");
let data = {};
let dataCom = [];

const showProductInfo = (obj) => {
    const { category, cost, currency, description, images, name, soldCount } = obj;
    let aux = "";
    let auxImgn = "";

    auxImgn += `<div class="carousel-item active">
    <img src="${images[0]}" class="d-block w-100" alt="imagen producto">
    </div>`; 

    for (let i = 1; i < images.length; i++) {
        auxImgn += ` <div class="carousel-item"><img src="${images[i]}" class="d-block w-100" alt="imagen producto"></div> `;
    };
    
    aux += `
    <br>
    <h2> ${name} </h2>
    <hr>
    <h5><b> Precio </b></h5>
    <p> ${currency} ${cost} </p>
    <h5><b> Descripción </b></h5>  
    <p> ${description} </p>
    <h5><b> Categoría </b></h5>
    <p> ${category} </p>
    <h5><b> Cantidad de vendidos </b></h5>
    <p> ${soldCount} </p>
    <h5><b> Imágenes ilustrativas </b></h5>
    <div id="carouselExampleControls" class="carousel slide w-50" data-bs-ride="carousel">
        <div class="carousel-inner">
         ` + auxImgn + `
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>`;

    contenedor.innerHTML += aux ;
};

const showStars = (num) => {
    let aux = "";
    for (let i = 1; num >= i; i++) {
        aux += ` <span class="fa fa-star checked"></span> `
    };
    for (let i = 0; (5 - num) > i; i++) {
        aux += ` <span class="fa fa-star"></span> `
    };
    return aux
};

const commentsContainer = document.getElementById("commentsContainer");

const showComments = (arr) => {
    let aux = "";
    for (let item of arr) {
        const { score, description, user, dateTime } = item;

        aux += `
        <div class="list-group-item list-group-item-action">
            <p><b>${user}</b> - ${dateTime} - ` + showStars(score) + ` </p>
            <p>${description}</p>
        </div>
        `
     };
    
    commentsContainer.innerHTML += aux;
};

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
};

const relatedProducts = (arr) => {
    let aux = "";
    for(let item of arr) {
        const { name, image, id } = item;
        aux += `
        <br>
        <div class="card col-3" style="border-width: 0px; margin-right: 1rem;" onclick="setProdID(${id})">
        <img src="${image}" class="" style="margin-top: 1rem;">
        <br>
        <h5>${name}</h5>
        </div>
        `; 
    };
    
    document.getElementById("relatedProd").innerHTML += aux; 
};

const btnCom = document.getElementById("btnCom");
const comm = document.getElementById("comment");
const sco = document.getElementById("score");

document.addEventListener("DOMContentLoaded", function(){

    getJSONData(PRODUCT_INFO_URL + localStorage.getItem("prodID") + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
            data = resultObj.data;
        };
        
        console.log(data);
        showProductInfo(data);
        
        getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + EXT_TYPE).then(function(resultObj){
            if (resultObj.status === "ok"){
                dataCom = resultObj.data;
            };
            
            showComments(dataCom);

            dataCom.sort(function(a, b) {  // SORT según la fecha (mas reciente a menos reciente)
                if ( a.dateTime < b.dateTime ){ return 1; }
                if ( a.dateTime > b.dateTime ){ return -1; }
                return 0;
            });

            const timeNow = () => {
                const d = new Date();
                let now = "";
                now += ` ${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} `;
                return now;
            };

            btnCom.addEventListener("click", () => {
                if (comm.value != "") {
                    dataCom.push({product: 50921, score: sco.value, description: comm.value , user: sessionStorage.getItem("user") , dateTime: timeNow() });
                    const clean = "";
                    commentsContainer.innerHTML = clean;
                    showComments(dataCom);
                    sco.value = null;
                    comm.value = null;
                };
            });

            relatedProducts(data.relatedProducts);
            
        });
    });
    
    usuario.innerText = sessionStorage.getItem("user");

    

});