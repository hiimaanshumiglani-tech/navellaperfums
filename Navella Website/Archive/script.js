document.addEventListener("DOMContentLoaded", function () {

const params = new URLSearchParams(window.location.search);
const category = params.get("category");

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