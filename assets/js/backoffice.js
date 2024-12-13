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


const detailsId = new URLSearchParams(window.location.search).get("productId");
console.log(detailsId);


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


window.onload = () => {
  if (detailsId) {
    
    const editMode = document.createElement("p");
    editMode.innerText = "Edit your product information:";
    pageMode.appendChild(editMode);

    
    fetch(URL, {
      method: "GET",
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzBmYzA3ZGI3MzAwMTU0MDYzYWMiLCJpYXQiOjE3MzM4NDkzNDAsImV4cCI6MTczNTA1ODk0MH0.7Xk3XZH2FbTNaTwxK_HokZhPNecfWCx-5wxtSqCZVmw"
      },
    })
    .then((response) => response.json())
    .then((product) => {
      
      productName.value = product.name;
      productDescription.value = product.description;
      productBrand.value = product.brand;
      productImg.value = product.imageUrl;
      productPrice.value = product.price;
      console.log(product);
    });
  } else {
    
    const createMode = document.createElement("h4");
    createMode.className = "fw-bold"
    createMode.innerText = "Insert your product information:";
    pageMode.appendChild(createMode);
    deleteBtn.classList.add("d-none"); 
  }
};


const submitProduct = function (e) {
  e.preventDefault(); 

  const newProduct = {
    name: productName.value,
    description: productDescription.value,
    brand: productBrand.value,
    imageUrl: productImg.value,
    price: productPrice.value,
  };

  fetch(URL, {
    method: method,
    body: JSON.stringify(newProduct),
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzBmYzA3ZGI3MzAwMTU0MDYzYWMiLCJpYXQiOjE3MzM4NDkzNDAsImV4cCI6MTczNTA1ODk0MH0.7Xk3XZH2FbTNaTwxK_HokZhPNecfWCx-5wxtSqCZVmw",
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("ERRORE NEL REPERIMENTO DATI");
    }
  })
  .then((newProduct) => {
    alert("Your product " + newProduct.name + (detailsId ? " has been successfully saved!" : " has been created!"));
    resetFields();
  })
  .catch((error) => console.log(error));
};

// Funzione per cancellare il prodotto
const deleteFn = function (e) {
  e.preventDefault(); 
  let positiveAnswer = confirm("Are you sure you want to delete this item?");

  if (positiveAnswer) {
    fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzBmYzA3ZGI3MzAwMTU0MDYzYWMiLCJpYXQiOjE3MzM4NDkzNDAsImV4cCI6MTczNTA1ODk0MH0.7Xk3XZH2FbTNaTwxK_HokZhPNecfWCx-5wxtSqCZVmw",
      },
    })
    .then(response => response.json())
    .then(deletedItem => {
      alert(deletedItem.name + " has been deleted");
     
    })
    .catch((error) => console.log(error));
  }
};


form.addEventListener("submit", submitProduct);
resetBtn.addEventListener("click", resetFields);
deleteBtn.addEventListener("click", deleteFn);
