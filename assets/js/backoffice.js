const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productBrand = document.getElementById("productBrand");
const productImg = document.getElementById("productImg");
const productPrice = document.getElementById("productPrice");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const deleteBtn = document.getElementById("deleteBtn");
const pageMode = document.getElementById("pageMode");
const form = document.querySelector("form");

// Ottenere l'ID del prodotto dai parametri dell'URL
const detailsId = new URLSearchParams(window.location.search).get("productId");
console.log(detailsId);

// Costruire l'URL API e determinare il metodo HTTP (PUT per aggiornare, POST per creare)
const URL = detailsId
  ? "https://striveschool-api.herokuapp.com/api/product/" + detailsId
  : "https://striveschool-api.herokuapp.com/api/product/";
const method = detailsId ? "PUT" : "POST";

const resetFields = function () {
  productName.value = "";
  productDescription.value = "";
  productBrand.value = "";
  productImg.value = "";
  productPrice.value = "";
};

