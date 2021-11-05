import apiService from "./apiService";
import cardImage from "../tamplate/image-card.hbs";
import cardForm from "../tamplate/form.hbs";
import refs from "./refs.js";
import { debounce } from "debounce";
const { main, form, btnOpenImage, galleryList, galleryContainer } = refs;
renderformSearch();
const searchForm = document.querySelector("form");
let page = 1;
let searchQuery = "";

function remuveHidden() {
  btnOpenImage.classList.remove("hidden");
}

//form search
function renderformSearch(form) {
  const marcup = cardForm(form);
  main.insertAdjacentHTML("afterbegin", marcup);
}

//render foto card
function renderFotoCard(card) {
  const marcup = cardImage(card.hits);
  if (page === 1) {
    galleryList.innerHTML = marcup;
  } else {
    btnOpenImage.classList.remove(".hidden");
    galleryList.insertAdjacentHTML("beforeend", marcup);
  }
  skrollImgIntersectionObserver();
}

//input value
function onInputNameFoto() {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchQuery = e.currentTarget.elements[0].value;
    renderCard(searchQuery);
  });
}

let valueIndex = 0;
let linksSrc = [];

onInputNameFoto();

// render card
function renderCard(searchQuery, page) {
  apiService(searchQuery, page)
    .then((data) => {
      renderFotoCard(data);
      onBtnOpenImg();
      remuveHidden();
    })
    .catch(() => {
      alert("error");
    });
}
// click open img
function onBtnOpenImg() {
  const btnOpenImage = document.querySelector(".button__open");
  btnOpenImage.classList.remove(".hidden");
  btnOpenImage.addEventListener("click", (el) => {
    page += 1;
    renderCard(searchQuery, page);
  });
}

// modal
function onOpenImgModal(src = "", alt = "") {
  imgModal.src = src;
  imgModal.alt = alt;
}

const galleryArrowLeft = document.querySelector(".lightbox__arrow-left");
const galleryArrowRight = document.querySelector(".lightbox__arrow-right");

galleryArrowLeft.addEventListener("click", onClickArrowLeft);
galleryArrowRight.addEventListener("click", onClickArrowRight);

function onClickArrowLeft(event) {
  valueIndex -= 1;
  if (valueIndex < 0) {
    valueIndex = linksSrc.length - 1;
  }
  onOpenImgModal(linksSrc[valueIndex]);
}

function onClickArrowRight(src) {
  valueIndex += 1;
  if (valueIndex > linksSrc.length - 1) {
    valueIndex = 0;
  }
  onOpenImgModal(linksSrc[valueIndex]);
  console.log(valueIndex);
}

const openModal = document.querySelector(".js-lightbox");
const modalClose = document.querySelector('[data-action="close-lightbox"]');
const imgModal = document.querySelector("img.lightbox__image");
galleryContainer.addEventListener("click", onOpenModalClick);

function getSrc(src) {
  const imagesRef = document.querySelectorAll(".photo-card img");
  linksSrc = [...imagesRef].map((item) => {
    return item.dataset.set;
  });
  valueIndex = linksSrc.findIndex((item) => item === src);

}

window.addEventListener('keydown', (event) => {
  const ESC_KEY_CODE = 'Escape';
  if (event.code === ESC_KEY_CODE) {
    openModal.classList.remove('is-open')
    onOpenImgModal(" ", " ")
  }
  const LEFT_ARROW = 'ArrowLeft';
  if (event.code === LEFT_ARROW) {
    onClickArrowLeft()
  }
  const RIGHT_ARROW = 'ArrowRight';
  if (event.code === RIGHT_ARROW) {
    onClickArrowRight()
  }
})

function onOpenModalClick(event) {
  const { target } = event;
  if (target.nodeName !== "IMG") return;
  event.preventDefault();
  onOpenImgModal(`${target.dataset.set}, ${target.alt}>`);
  openModal.classList.add("is-open");
  getSrc(target.dataset.set);
}

modalClose.addEventListener("click", (e) => {
  openModal.classList.remove("is-open");
  onOpenImgModal();
});

// IntersectionObserver
function skrollImgIntersectionObserver() {
  const options = {
    rootMargin: "0px",
    threshold: 1.0,
  };
  const observer = new IntersectionObserver(callback, options);
  const target = document.querySelector(".gallery");
  function callback(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.nextElementSibling === null) {
          page += 1;
          renderCard(searchQuery, page);
          scrollPage();
        }
      }
    });
  }
  const items = [...target.children];
  items.forEach((item) => observer.observe(item));
}
// scroll
function scrollPage() {
  setTimeout(
    () =>
      window.scrollTo({
        top: window.pageYOffset + document.documentElement.clientHeight,
        behavior: "smooth",
        block: "end",
      }),
    1000
  );
}
