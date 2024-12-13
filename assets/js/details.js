const detailsImage = document.getElementById("detailsImage");
const detailsName = document.getElementById("detailsName");
const detailsBrand = document.getElementById("detailsBrand");
const detailsDescription = document.getElementById("detailsDescription");
const detailsPrice = document.getElementById("detailsPrice");
const detailsBtns = document.getElementById("detailsBtns");

const params = new URLSearchParams(window.location.search);
const detailsId = params.get("productId");
const URL = "https://striveschool-api.herokuapp.com/api/product/" + detailsId;

fetch(URL, {
  method: "GET",

  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzBmYzA3ZGI3MzAwMTU0MDYzYWMiLCJpYXQiOjE3MzM4NDkzNDAsImV4cCI6MTczNTA1ODk0MH0.7Xk3XZH2FbTNaTwxK_HokZhPNecfWCx-5wxtSqCZVmw",
  },
})
  .then((response) => {
    console.log(response);

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Errore nel reperimento dati");
    }
  })

  .then((product) => {
    console.log(product);
    createProductDetailsCard(product);
  })

  .catch((err) => console.log(err));


  function createProductDetailsCard(product) {
    const detailsContainer = document.getElementById("detailsContainer");
  
    const card = document.createElement("div");
    card.className = "card border-2 shadow";
  
    const img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = `Image of ${product.name}`;
    img.className = "card-img-top img-fluid w-25";
    card.appendChild(img);
  
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    cardBody.innerHTML = `
      <h4 class="card-title">${product.name}</h4>
      <p class="card-text"><span class="fw-bold">Brand:</span> ${product.brand}</p>
      <p class="card-text">${product.description}</p>
      <p class="card-text text-primary-emphasis"><span class="fw-bold">Price:</span> ${product.price}€</p>
    `;
    card.appendChild(cardBody);
  
    detailsContainer.appendChild(card);
  }
  