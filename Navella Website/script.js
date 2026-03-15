document.addEventListener("DOMContentLoaded", function () {

const category = window.location.hash.replace("#", "");

const products = document.querySelectorAll(".product-card");

products.forEach(product => {

const productCategory = product.getAttribute("data-category");

if (!category || category === "all") {

product.style.display = "block";

}

else if (productCategory === category) {

product.style.display = "block";

}

else {

product.style.display = "none";

}

});



/* IMAGE SLIDER FUNCTION */

const sliders = document.querySelectorAll(".image-slider");

sliders.forEach(slider => {

const images = slider.querySelectorAll("img");

const prev = slider.querySelector(".prev");
const next = slider.querySelector(".next");

let index = 0;

function showImage(i){

images.forEach(img => img.classList.remove("active"));

images[i].classList.add("active");

}

next.addEventListener("click", function(){

index++;

if(index >= images.length){

index = 0;

}

showImage(index);

});

prev.addEventListener("click", function(){

index--;

if(index < 0){

index = images.length - 1;

}

showImage(index);

});

});

});

/* HERO AUTO SLIDER */

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function showSlide(index){

slides.forEach(slide => slide.classList.remove("active"));

slides[index].classList.add("active");

}

function nextSlide(){

currentSlide++;

if(currentSlide >= slides.length){

currentSlide = 0;

}

showSlide(currentSlide);

}

setInterval(nextSlide,3000);

if(window.location.pathname.includes("index.html") || window.location.pathname === "/"){

window.addEventListener("scroll",function(){

const header=document.querySelector("header");

if(window.scrollY>50){
header.classList.add("scrolled");
}else{
header.classList.remove("scrolled");
}

});

}


const category = window.location.hash.replace("#","");

const title = document.getElementById("category-title");
const text = document.getElementById("category-text");

if(title && text){

if(category==="men"){

title.innerText="Men's Fragrances";

text.innerText="Bold, confident and powerful scents designed for modern men. Navella men's fragrances combine woody, musky and fresh accords that deliver strong projection and long lasting presence.";

}

else if(category==="women"){

title.innerText="Women's Fragrances";

text.innerText="Elegant, graceful and captivating perfumes crafted for modern femininity. Floral and fruity compositions blend beautifully to create unforgettable impressions.";

}

else if(category==="unisex"){

title.innerText="Unisex Fragrances";

text.innerText="Versatile fragrances designed for everyone. Balanced blends of fresh, woody and musky notes make these perfumes suitable for any occasion.";

}

else{

title.innerText="All Fragrances";

text.innerText="Explore the complete Navella fragrance collection. Discover scents designed for different personalities, moods and occasions.";

}

}