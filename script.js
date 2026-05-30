/* =========================================================
   NAVELLA PERFUMES — ENHANCED SCRIPT
   Drop-in replacement for script.js
========================================================= */

/* Inject premium display font (Cormorant Garamond) — no HTML changes needed */
(function loadPremiumFont(){
  if (document.querySelector('link[data-navella-font]')) return;
  const preconnect1 = document.createElement('link');
  preconnect1.rel = 'preconnect'; preconnect1.href = 'https://fonts.googleapis.com';
  const preconnect2 = document.createElement('link');
  preconnect2.rel = 'preconnect'; preconnect2.href = 'https://fonts.gstatic.com';
  preconnect2.crossOrigin = 'anonymous';
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.dataset.navellaFont = 'true';
  link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap';
  document.head.appendChild(preconnect1);
  document.head.appendChild(preconnect2);
  document.head.appendChild(link);
})();

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       CATEGORY FILTER LOGIC
    ========================== */
    const category = window.location.hash.replace("#", "");
    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        const productCategory = product.getAttribute("data-category");
        if (!category || category === "all") product.style.display = "block";
        else if (productCategory === category) product.style.display = "block";
        else product.style.display = "none";
    });

    /* =========================
       CATEGORY TITLE & TEXT
    ========================== */
    const title = document.getElementById("category-title");
    const text  = document.getElementById("category-text");
    if (title && text) {
        if (category === "men") {
            title.innerText = "Men's Fragrances";
            text.innerText  = "Bold, confident and powerful scents designed for modern men. Navella men's fragrances combine woody, musky and fresh accords that deliver strong projection and long lasting presence.";
        } else if (category === "women") {
            title.innerText = "Women's Fragrances";
            text.innerText  = "Elegant, graceful and captivating perfumes crafted for modern femininity. Floral and fruity compositions blend beautifully to create unforgettable impressions.";
        } else if (category === "unisex") {
            title.innerText = "Unisex Fragrances";
            text.innerText  = "Versatile fragrances designed for everyone. Balanced blends of fresh, woody and musky notes make these perfumes suitable for any occasion.";
        } else {
            title.innerText = "The Complete Collection";
            text.innerText  = "Nine signature scents — each composed for a distinct personality, mood and moment. Explore the full Navella fragrance wardrobe.";
        }
    }

    /* =========================
       IMAGE SLIDER (PRODUCT CARDS) — staggered
    ========================== */
    const sliders = document.querySelectorAll(".image-slider");
    sliders.forEach((slider, sliderIdx) => {
        const images = slider.querySelectorAll("img");
        if (!images.length) return;
        let index = 0;
        images.forEach(img => img.classList.remove("active"));
        images[index].classList.add("active");
        // Stagger the start so cards aren't synchronized
        setTimeout(() => {
            setInterval(() => {
                images[index].classList.remove("active");
                index = (index + 1) % images.length;
                images[index].classList.add("active");
            }, 3800);
        }, sliderIdx * 280);
    });

    /* =========================
       HERO SLIDER (cycles continuously)
    ========================== */
    const slides = document.querySelectorAll(".slide");
    if (slides.length > 1) {
        let currentSlide = 0;
        const showSlide = i => {
            slides.forEach(s => s.classList.remove("active"));
            slides[i].classList.add("active");
        };
        showSlide(currentSlide);
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 6000);
    }

    /* =========================
       HEADER SCROLL EFFECT (all pages)
    ========================== */
    const header = document.querySelector("header");
    if (header) {
        const onScroll = () => {
            if (window.scrollY > 30) header.classList.add("scrolled");
            else header.classList.remove("scrolled");
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }

    /* =========================
       SCROLL REVEAL ANIMATION
    ========================== */
    const revealTargets = document.querySelectorAll(
      ".collections, .about, .brand-highlight, .category-card, .product-card, .category-description, .products-page article"
    );
    revealTargets.forEach(el => el.classList.add("reveal"));

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
        revealTargets.forEach(el => io.observe(el));
    } else {
        revealTargets.forEach(el => el.classList.add("visible"));
    }

    /* =========================
       ACTIVE NAV LINK (auto)
    ========================== */
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("nav a").forEach(a => {
        const href = a.getAttribute("href");
        if (href === path) a.classList.add("active");
        if (path === "" && href === "index.html") a.classList.add("active");
    });

});