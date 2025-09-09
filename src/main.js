import "./style.css";

import { header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

const headerContent = document.querySelector("header");
headerContent.innerHTML = header;

const API_KEY = import.meta.env.VITE_API_KEY;

let searchKey = "developer";
let orderBy = "";
let orientation = "";

const getPhotos = async () => {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?page=1&per_page=30&query=${searchKey}&client_id=${API_KEY}&order_by=${orderBy}${orientation}`
  );
  const data = await res.json();
  mapPhotos(data.results);
};

const mapPhotos = (photos) => {
  const mappedPhotos = photos.map((photo) => ({
    alt: photo.alt_description,
    photo: photo.urls.regular,
    hi_resolution: photo.urls.raw,
    color: photo.color,
  }));
  console.log(mappedPhotos);
  printPhotos(mappedPhotos);
};

const printPhotos = (photos) => {
  const ul = document.querySelector("#photo_grid");
  ul.innerHTML = "";

  if (photos.length) {
    for (const photo of photos) {
      const li = document.createElement("li");
      li.innerHTML = `
    <a href="${photo.hi_resolution}" target="_blank"><img class="img" src="${photo.photo}" alt="${photo.alt_description}" style="box-shadow:  0 4px 4px ${photo.color}"></a>
    `;
      ul.appendChild(li);
    }
  } else {
    const h2 = document.createElement("h2");
    h2.innerHTML = "No hay resultados, prueba otra vez!";
    ul.before(h2);
  }
};

//Recojo lo escrito en el input para modificar la searchKey
const newSearch = () => {
  const input = document.querySelector("#search-input").value;
  searchKey = input;
  console.log(searchKey);
};

//Doy funcionalidad al filtro orderBy
const selectedOrderBy = () => {
  const select = document.querySelector("#orderBy");
  orderBy = select.value;
};

//Doy funcionalidad al filtro orientation
const selectedOrientation = () => {
  const selectedOrientation = document.querySelector("#orientation");
  console.log(selectedOrientation.value);

  if (selectedOrientation.value) {
    orientation = `&orientation=${selectedOrientation.value}`;
    const photo_grid = document.querySelector("#photo_grid");
    if (selectedOrientation.value === "landscape") {
      photo_grid.className = "landscape"
    }
    if (selectedOrientation.value === "portrait") {
      photo_grid.className = "portrait"
    }
    if (selectedOrientation.value === "squarish") {
      photo_grid.className = "squarish"
    }
  } else {
    orientation = "";
  }
};

//Creo el eventlistener para dar funcionalidad al boton Buscar
const btn = document.querySelector("#search-btn");
btn.addEventListener("click", () => {
  selectedOrderBy();
  selectedOrientation();
  newSearch();
  getPhotos();
});

//aqui creo un eventlistener para que al pulsar enter haga la busqueda sin dar click al boton Buscar
const inputEnter = document.querySelector("#search-input");
inputEnter.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    selectedOrderBy();
    selectedOrientation();
    newSearch();
    getPhotos();
  }
});

const footerContent = document.querySelector("footer");
footerContent.innerHTML = Footer;

window.addEventListener("DOMContentLoaded", () => {
  getPhotos();
});
