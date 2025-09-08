import "./style.css";

import { header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

const headerContent = document.querySelector("header");
headerContent.innerHTML = header;

const accessKey = "PZd8jQ_rF35-RW6XNGBDazja9A2LiMAmvwQStbPz2io";
const secretKey = "EFN9YB-JgLJH7YUy18KcEPKBx2FAi0OakVRrJRfuDCM";
let searchKey = "developer";
let orderBy = "";
let orientation = "";
let orientationValue = "";

const getPhotos = async () => {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?page=1&per_page=30&query=${searchKey}&client_id=${accessKey}&order_by=${orderBy}${orientation}${orientationValue}`
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

  for (const photo of photos) {
    const li = document.createElement("li");
    li.innerHTML = `
    <a href="${photo.hi_resolution}" target="_blank"><img src="${photo.photo}" alt="${photo.alt_description}" style="box-shadow:  0 4px 4px ${photo.color}"></a>
    `;
    ul.appendChild(li);
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
  if (selectedOrientation.value) {
    orientation = "&orientation=";
    orientationValue = selectedOrientation.value;
  }
};

//Creo el eventlistener para dar funcionalidad al boton Buscar
const btn = document.querySelector("#search-btn");
btn.addEventListener("click", () => {
  selectedOrderBy();
  selectedOrientation();
  newSearch();
  getPhotos(searchKey);
});

//aqui creo un eventlistener para que al pulsar enter haga la busqueda sin dar click al boton Buscar
const inputEnter = document.querySelector("#search-input");
inputEnter.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    selectedOrderBy();
    selectedOrientation();
    newSearch();
    getPhotos(searchKey);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  getPhotos(searchKey);
});

const footerContent = document.querySelector("footer");
footerContent.innerHTML = Footer;