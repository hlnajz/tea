let products = [];

async function getProducts() {
  try {
    const response = await fetch("https://tea-api-gules.vercel.app"); //use cafe api fro the tp
    if (!response.ok) throw new Error("ohh no chi7ja fchkel!");
    products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("error fetching:", error);
  }
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <img src="${product.image_url}" alt="${product.name}">
    <h3>${product.name}</h3>
    <div class="product-info">
      <p class="product-price">${product.price} DH</p>
      <p>${product.description}</p>
      <button class="product-button">+</button>
    </div>
  `;
  return card;
}

function displayProducts(products) {
  const container = document.getElementById("product-content");
  container.innerHTML = "";

  products.forEach((product) => {
    const productCard = createProductCard(product);
    container.appendChild(productCard);
  });
}

const gridViewIcon = document.getElementById("grid");
const listViewIcon = document.getElementById("list");
const productContent = document.getElementById("product-content");

productContent.classList.add("grid-view");

gridViewIcon.addEventListener("click", setGridView);
listViewIcon.addEventListener("click", setListView);

function setGridView() {
  productContent.classList.remove("list-view");
  productContent.classList.add("grid-view");
}

function setListView() {
  productContent.classList.remove("grid-view");
  productContent.classList.add("list-view");
}

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  filterProducts();
});

searchInput.addEventListener("input", filterProducts);

function filterProducts() {
  const query = searchInput.value.toLowerCase();
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
  );
  displayProducts(filteredProducts);
}

getProducts();
