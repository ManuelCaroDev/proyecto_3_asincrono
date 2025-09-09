import "./style.css";

import { header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

const headerContent = document.querySelector("header");
headerContent.innerHTML = header;

const API_ACCS = import.meta.env.VITE_API_ACCS;
let searchKey = "developer";
let orderBy = "";
let orientation = "";
let actualPage = 1;
let totalPages = 1;

//Creo la funcion  para recoger las fotos de la api
const getPhotos = async () => {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?page=${actualPage}&per_page=30&query=${searchKey}&client_id=${API_ACCS}&order_by=${orderBy}${orientation}`
  );
  const data = await res.json();
  totalPages = data.total_pages;
  mapPhotos(data.results);
  updateButtons();
  console.log(totalPages);
};

//Funcion para mapear las fotos con las claves que nos interesan
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

//Funcion para pintar las fotos 
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

//Recojo lo escrito en el input para modificar la searchKey para hacer la busqueda
const newSearch = () => {
  const input = document.querySelector("#search-input").value;
  searchKey = input;
  actualPage = 1;
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
      photo_grid.className = "landscape";
    };
    if (selectedOrientation.value === "portrait") {
      photo_grid.className = "portrait";
    };
    if (selectedOrientation.value === "squarish") {
      photo_grid.className = "squarish";
    };
  } else {
    orientation = "";
  };
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

//creo una funcion para actualizar el estado de los botones de pasar pagina
const updateButtons = () => {
  previusBtn.disabled = actualPage === 1;
  if (previusBtn.disabled) {
    previusBtn.style = "background-color: #cccece80; cursor: default;";
  } else {
    previusBtn.style = "cursor: pointer; background-color: #00bcd4;";
  };
  nextBtn.disabled = actualPage >= totalPages;
  if (nextBtn.disabled) {
    previusBtn.style = "background-color: #cccece80; cursor: default;";
  } else {
    nextBtn.style = "background-color: #00bcd4; cursor: pointer;";
  };
};

//Doy funcionalidad al boton Pagina anterior
const previusBtn = document.querySelector("#previus");
previusBtn.addEventListener("click", () => {
  if (actualPage > 1) {
    actualPage -= 1;
    getPhotos();
    updateButtons();
  }
  console.log(actualPage);
});

//Doy funcionalidad al boton Pagina siguiente
const nextBtn = document.querySelector("#next");
nextBtn.addEventListener("click", () => {
  actualPage += 1;
  getPhotos();
  updateButtons();
  console.log(actualPage);
});

//pintamos el footer
const footerContent = document.querySelector("footer");
footerContent.innerHTML = Footer;

//Pintamos la pagina de inicio al cargar la pagina por primera vez o recargar pagina.
window.addEventListener("DOMContentLoaded", () => {
  getPhotos();
  updateButtons();
});
