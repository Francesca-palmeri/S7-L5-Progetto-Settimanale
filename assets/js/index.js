const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productBrand = document.getElementById("productBrand");
const productImg = document.getElementById("productImg");
const productPrice = document.getElementById("productPrice");
const submitBtn = document.getElementById("submitBtn");
const form = document.querySelector("form");
const detailsBtns = document.getElementById("detailsBtns");

fetch("https://striveschool-api.herokuapp.com/api/product/", {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzBmYzA3ZGI3MzAwMTU0MDYzYWMiLCJpYXQiOjE3MzM4NDkzNDAsImV4cCI6MTczNTA1ODk0MH0.7Xk3XZH2FbTNaTwxK_HokZhPNecfWCx-5wxtSqCZVmw",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Errore riperimento dati");
    }
  })
  .then((productList) => {
    console.log(productList);
    productList.forEach((product) => {
      createProductCard(product);
    });
  })
  .catch((err) => console.log(err));


function createProductCard(product) {
  const productsRow = document.getElementById("productsRow");
  const productsCol = document.createElement("div");
  productsCol.className =
    "col col-sm-6 col-lg-4 col-xxl-3 d-flex justify-content-center";
  productsRow.appendChild(productsCol);

  const card = document.createElement("div");
  card.className = "card";
  productsCol.appendChild(card);

  const img = document.createElement("img");
  img.src = product.imageUrl;
  img.alt = `Image of ${product.name}`;
  img.className = "card-img-top img-fluid";
  card.appendChild(img);

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  cardBody.innerHTML = `
          <p class="h5">${product.name}</p>
          <p class="fw-bold text-black-50">${product.brand}</p>
          <p class="pDescription">${product.description}</p>
          <p class="mb-3 text-end text-primary-emphasis me-2" )">Price: ${product.price}€</p>
          <div><a href="details.html?productId=${product._id}">
            <button class="btn btn-secondary m-2 buttonDetails">Details</button>
          </a></div>
          <div><a href="backoffice.html?productId=${product._id}">
            <button class="btn btn-warning m-2">Modify</button>
          </a></div>`;
  card.appendChild(cardBody);
}
