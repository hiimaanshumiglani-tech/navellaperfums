const BACKEND_URL = "https://navellaperfums-backend.onrender.com";
/* =========================================================
   NAVELLA PERFUMS
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
            text.innerText  = "The signature scents — each composed for a distinct personality, mood and moment. Explore the full Navella fragrance wardrobe.";
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

/*______________________________________________________________*/

/* =========================================================
   CATALOG DATABASE & CLIENT CART LOGIC
========================================================= */

const PRODUCTS_DB = {
  "savage": {
    name: "Navella Savage",
    price: 399,
    volume: "50ml",
    concentration: "Eau De Parfum",
    inspired: "Dior Sauvage",
    description: "A sophisticated, woody aromatic scent that defines timeless masculine confidence and freedom.",
    images: ["Savage_web1.png", "Savage_web2.png", "Savage_web3.png", "Savage_web4.png"],
    notes: { top: "Calabrian Bergamot, Pepper", heart: "Sichuan Pepper, Lavender, Pink Pepper", base: "Ambroxan, Cedar, Labdanum" }
  },
  "hydra": {
    name: "Navella Hydra",
    price: 299,
    volume: "50ml",
    concentration: "Eau De Parfum",
    inspired: "Creed Aventus & Versace Eros",
    description: "A crisp, aquatic blast of sea water and mint for ultimate refreshment.",
    images: ["Hydra_web1.png", "Hydra_web2.png", "Hydra_web3.png", "Hydra_web4.png"],
    notes: { top: "Mint, Green Apple, Lemon", heart: "Tonka Bean, Ambroxan, Geranium", base: "Madagascar Vanilla, Cedar, Vetiver" }
  },
  "ignite": {
    name: "Navella Ignite",
    price: 399,
    volume: "50ml",
    concentration: "Eau De Parfum",
    inspired: "Azzaro Most Wanted",
    description: "A fiery, intense blend of cardamom and toffee for a powerful, magnetic presence.",
    images: ["Ignite_web1.png", "Ignite_web2.png", "Ignite_web3.png", "Ignite_web4.png"],
    notes: { top: "Cardamom", heart: "Caramel, Toffee", base: "Amberwood, Bourbon Vanilla" }
  },
  "elixir": {
    name: "Navella Elixir",
    price: 399,
    volume: "50ml",
    concentration: "Eau De Parfum",
    inspired: "Delina Exclusif",
    description: "A luxurious, creamy rose and lychee scent that feels like a regal embrace.",
    images: ["Elixir_web1.png", "Elixir_web2.png", "Elixir_web3.png", "Elixir_web4.png"],
    notes: { top: "Lychee, Pear, Bergamot", heart: "Turkish Rose, Agarwood (Oud), Incense", base: "Vanilla, Amber, Woody Notes" }
  },
  "blush": {
    name: "Navella Blush",
    price: 399,
    volume: "50ml",
    concentration: "Eau De Parfum",
    inspired: "Victoria's Secret Bombshell",
    description: "A bright, flirtatious mix of passionfruit and peony for a fresh, sunny feel.",
    images: ["Blush_web1.png", "Blush_web2.png", "Blush_web3.png", "Blush_web4.png"],
    notes: { top: "Passionfruit, Grapefruit, Pineapple", heart: "Peony, Vanilla Orchid, Red Berries", base: "Musk, Woody Notes, Oakmoss" }
  },
  "noor": {
    name: "Navella Noor",
    price: 399,
    volume: "50ml",
    concentration: "Eau De Parfum",
    inspired: "Navella Signature Floral",
    description: "An elegant, versatile floral bouquet that balances freshness with sophisticated grace.",
    images: ["Noor_web1.png", "Noor_web2.png", "Noor_web3.png", "Noor_web4.png"],
    notes: { top: "Mandarin, Fresh Lily", heart: "Jasmine, Moroccan Rose", base: "White Musk, Soft Sandalwood" }
  },
  "white-oud": {
    name: "Navella White Oud",
    price: 399,
    volume: "50ml",
    concentration: "Eau De Parfum",
    inspired: "Artisanal White Oud",
    description: "A soft, airy take on oud featuring smooth woody notes and clean musk.",
    images: ["WhiteOud_web1.png", "WhiteOud_web2.png", "WhiteOud_web3.png", "WhiteOud_web4.png"],
    notes: { top: "White Amber, Bergamot", heart: "Soft Spices, Rosewater", base: "White Oud, Clean Musk, Cedar" }
  },
  "blue-oud": {
    name: "Navella Blue Oud",
    price: 399,
    volume: "50ml",
    concentration: "Eau De Parfum",
    inspired: "Oceanic Wood Accord",
    description: "An exotic fusion of deep, mysterious oud lightened by cool, refreshing marine accords.",
    images: ["BOud_web1.png", "BOud_web2.png", "BOud_web3.png", "BOud_web4.png"],
    notes: { top: "Marine Notes, Sea Salt", heart: "Blue Cypress, Spiced Black Pepper", base: "Aged Oud, Dark Vetiver, Patchouli" }
  },
  "shadow": {
    name: "Navella Shadow",
    price: 399,
    volume: "50ml",
    concentration: "Eau De Parfum",
    inspired: "Tom Ford Black Orchid",
    description: "A deep, dramatic scent of dark chocolate and orchids for a bold statement.",
    images: ["Shadow_web1.png", "Shadow_web2.png", "Shadow_web3.png", "Shadow_web4.png"],
    notes: { top: "Truffle, Blackcurrant, Ylang-Ylang", heart: "Black Orchid, Spices, Floral Notes", base: "Patchouli, Dark Chocolate, Incense, Amber" }
  }
};

// Cart Management via LocalStorage
const CartManager = {
  getCart() {
    return JSON.parse(localStorage.getItem("navella_cart")) || [];
  },
  saveCart(cart) {
    localStorage.setItem("navella_cart", JSON.stringify(cart));
    this.updateBadge();
  },
  addItem(id, quantity = 1) {
    const cart = this.getCart();
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
      cart[itemIndex].quantity += quantity;
    } else {
      const prod = PRODUCTS_DB[id];
      if (!prod) return;
      cart.push({ id, name: prod.name, price: prod.price, image: prod.images[0], volume: prod.volume, quantity });
    }
    this.saveCart(cart);
  },
  removeItem(id) {
    const cart = this.getCart().filter(item => item.id !== id);
    this.saveCart(cart);
  },
  updateQuantity(id, qty) {
    let cart = this.getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity = parseInt(qty, 10);
      if (item.quantity <= 0) return this.removeItem(id);
      this.saveCart(cart);
    }
  },
  updateBadge() {
    const cart = this.getCart();
    const count = cart.reduce((acc, curr) => acc + curr.quantity, 0);
    const badges = document.querySelectorAll("#nav-cart-count");
    badges.forEach(b => b.textContent = count);
  }
};

/* =========================================================
   PERSISTENT BUTTON STATE HANDLER
========================================================= */

function syncButtonStates() {
  const cart = CartManager.getCart();
  const addedIds = new Set(cart.map(item => item.id));

  document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
    const id = btn.getAttribute("data-id");

    if (addedIds.has(id)) {
      btn.textContent = "Product Added To Cart, Click To Checkout";
      btn.classList.add("is-in-cart");
    } else {
      btn.textContent = "Add to Cart 🛍️";
      btn.classList.remove("is-in-cart");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  CartManager.updateBadge();
  syncButtonStates();

  /* =========================================================
     MOBILE HAMBURGER MENU (DIRECT PASS-THROUGH)
  ========================================================= */
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");

  let backdrop = document.querySelector(".nav-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    document.body.appendChild(backdrop);
  }

  function openMenu() {
    mainNav.classList.add("is-open");
    menuToggle.classList.add("is-active");
    backdrop.classList.add("is-visible");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    mainNav.classList.remove("is-open");
    menuToggle.classList.remove("is-active");
    backdrop.classList.remove("is-visible");
    document.body.style.overflow = "";
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      mainNav.classList.contains("is-open") ? closeMenu() : openMenu();
    });

    backdrop.addEventListener("click", (e) => {
      e.preventDefault();
      closeMenu();
    });

    // DO NOT intercept standard page links with e.preventDefault()
    // Only close drawer for same-page hash jumps
    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", function () {
        const href = this.getAttribute("href");
        if (href && href.startsWith("#")) {
          closeMenu();
        } else {
          // Allow normal click routing, just reset scroll lock
          document.body.style.overflow = "";
        }
      });
    });
  }
/*<!----------------------------------------->*/
  document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const id = btn.getAttribute("data-id");
      const cart = CartManager.getCart();
      const existingItem = cart.find(item => item.id === id);

      if (existingItem) {
        // If already added, clicking it takes the buyer directly to the cart
        window.location.href = "cart.html";
      } else {
        // First click adds the item and locks the state
        CartManager.addItem(id, 1);
        btn.textContent = "Product Added To Cart, Click To Checkout";
        btn.classList.add("is-in-cart");
      }
    });
  });
});

// Dynamic PDP Renderer
function renderProductDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const prod = PRODUCTS_DB[id];
  const container = document.getElementById("pdp-container");

  if (!prod || !container) {
    if (container) container.innerHTML = "<p>Fragrance not found. <a href='perfumes.html' style='color:var(--gold);'>View collection</a></p>";
    return;
  }

  container.innerHTML = `
    <div class="pdp-layout">
      <div class="pdp-gallery">
        <img id="main-pdp-img" src="${prod.images[0]}" alt="${prod.name}">
        <div class="pdp-thumbs">
          ${prod.images.map((img, i) => `<img src="${img}" class="${i===0?'active':''}" onclick="document.getElementById('main-pdp-img').src='${img}'">`).join('')}
        </div>
      </div>
      <div class="pdp-info">
        <span class="pdp-concentration">${prod.concentration}</span>
        <h1>${prod.name}</h1>
        <p class="pdp-inspired">Inspired by: ${prod.inspired}</p>
        <p class="pdp-price">${prod.volume} — ₹${prod.price}</p>
        <p class="pdp-desc">${prod.description}</p>
        
        <div class="olfactory-pyramid">
          <h4>Fragrance Notes</h4>
          <p><strong>Top:</strong> ${prod.notes.top}</p>
          <p><strong>Heart:</strong> ${prod.notes.heart}</p>
          <p><strong>Base:</strong> ${prod.notes.base}</p>
        </div>

        <button class="buy-btn" style="width:100%; margin-top:20px;" onclick="CartManager.addItem('${id}', 1); window.location.href='cart.html';">
          Add to Cart & Checkout
        </button>
      </div>
    </div>
  `;
}


/* =========================================================
   WEIGHT-BASED SHIPPING CONFIGURATION
========================================================= */
const BOTTLE_WEIGHT_GRAMS = 250; // Each packed 50ml perfume bottle

function getShippingByWeight(totalGrams) {
  if (totalGrams <= 0) return 0;
  if (totalGrams <= 500) return 80;       // 1 - 2 bottles
  if (totalGrams <= 1000) return 100;    // 3 - 4 bottles
  if (totalGrams <= 2000) return 150;    // 5 - 8 bottles
  return 200;                            // > 2000 g (9+ bottles)
}
/* =========================================================
   PROMO CODE CONFIGURATION
========================================================= */
const PROMO_CODES = {
  "FIRST10": { type: "percent", value: 10 },     // 10% off
  "NAVELLA100": { type: "flat", value: 100 },    // Flat ₹100 off
  "FREESHIP": { type: "shipping", value: 0 }     // Free shipping waiver
};

let activePromo = null; // Holds currently applied coupon

function calculateOrderTotals(cart) {
  const totalBottles = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalWeightGrams = totalBottles * BOTTLE_WEIGHT_GRAMS;
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  let shippingFee = getShippingByWeight(totalWeightGrams);
  let discountAmount = 0;

  // Calculate discount if coupon is applied
  if (activePromo && PROMO_CODES[activePromo]) {
    const promo = PROMO_CODES[activePromo];
    if (promo.type === "percent") {
      discountAmount = Math.round((subtotal * promo.value) / 100);
    } else if (promo.type === "flat") {
      discountAmount = Math.min(promo.value, subtotal);
    } else if (promo.type === "shipping") {
      shippingFee = 0;
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  return { subtotal, shippingFee, discountAmount, grandTotal, totalWeightGrams };
}
// Cart Page Renderer
function renderCartPage() {
  const container = document.getElementById("cart-items-container");
  const subtotalEl = document.getElementById("cart-subtotal");
  const shippingEl = document.getElementById("cart-shipping");
  const totalEl = document.getElementById("cart-total");
  const discountRow = document.getElementById("discount-row");
  const discountEl = document.getElementById("cart-discount");
  const codeNameEl = document.getElementById("applied-code-name");
  const promoMsg = document.getElementById("promo-message");
  const promoInput = document.getElementById("promo-input");
  const applyPromoBtn = document.getElementById("apply-promo-btn");

  if (!container) return;

  const cart = CartManager.getCart();

  // If bag is empty
  if (cart.length === 0) {
    activePromo = null;
    container.innerHTML = "<p style='padding: 20px 0;'>Your bag is empty. <a href='perfumes.html' style='color: var(--gold);'>Continue exploring perfumes →</a></p>";
    subtotalEl.innerText = "₹0";
    if (shippingEl) shippingEl.innerText = "₹0";
    if (discountRow) discountRow.style.display = "none";
    totalEl.innerText = "₹0";
    return;
  }

  // 1. Render item rows
  container.innerHTML = cart.map(item => `
    <div class="cart-item-row">
      <img src="${item.image}" alt="${item.name}" width="60">
      <div style="flex:1;">
        <h4>${item.name} (${item.volume})</h4>
        <p>₹${item.price} x ${item.quantity}</p>
      </div>
      <div class="qty-control">
        <button onclick="CartManager.updateQuantity('${item.id}', ${item.quantity - 1}); renderCartPage();">-</button>
        <span>${item.quantity}</span>
        <button onclick="CartManager.updateQuantity('${item.id}', ${item.quantity + 1}); renderCartPage();">+</button>
      </div>
      <div style="font-weight: 500; min-width: 60px; text-align: right;">₹${item.price * item.quantity}</div>
    </div>
  `).join("");

  // 2. Compute metrics
  const { subtotal, shippingFee, discountAmount, grandTotal, totalWeightGrams } = calculateOrderTotals(cart);

  // 3. Update summary UI elements
  subtotalEl.innerText = `₹${subtotal}`;

  if (discountRow && discountEl && codeNameEl) {
    if (activePromo && (discountAmount > 0 || PROMO_CODES[activePromo].type === "shipping")) {
      discountRow.style.display = "flex";
      codeNameEl.innerText = activePromo;
      discountEl.innerText = discountAmount > 0 ? `-₹${discountAmount}` : "FREE SHIPPING";
    } else {
      discountRow.style.display = "none";
    }
  }

  if (shippingEl) {
    const weightKg = (totalWeightGrams / 1000).toFixed(2);
    if (activePromo === "FREESHIP") {
      shippingEl.innerHTML = `<span style="color: #4CAF50;">FREE</span> <span style="font-size: 11px; opacity: 0.75; font-weight: normal;">(${totalWeightGrams}g)</span>`;
    } else {
      shippingEl.innerHTML = `₹${shippingFee} <span style="font-size: 11px; opacity: 0.75; font-weight: normal;">(${totalWeightGrams}g / ${weightKg}kg)</span>`;
    }
  }

  totalEl.innerText = `₹${grandTotal}`;


// 4. Promo Code Handlers (Apply Click & Auto-Reset on Clear)
  if (applyPromoBtn) {
    // Keep button state in sync if a promo is active
    if (activePromo && PROMO_CODES[activePromo]) {
      applyPromoBtn.textContent = "Applied ✓";
      applyPromoBtn.classList.add("is-applied");
    } else {
      applyPromoBtn.textContent = "Apply";
      applyPromoBtn.classList.remove("is-applied");
    }

    // A. Listen for typing / backspacing in the input field
    if (promoInput && !promoInput.dataset.bound) {
      promoInput.dataset.bound = "true";
      promoInput.addEventListener("input", function () {
        // If the user clears the input entirely
        if (this.value.trim() === "") {
          if (activePromo !== null) {
            activePromo = null;
            applyPromoBtn.textContent = "Apply";
            applyPromoBtn.classList.remove("is-applied");
            if (promoMsg) {
              promoMsg.innerText = "";
              promoMsg.style.display = "none";
            }
            renderCartPage(); // Recalculate cart without discount
          }
        }
      });
    }

    // B. Handle clicking the Apply button
    if (!applyPromoBtn.dataset.bound) {
      applyPromoBtn.dataset.bound = "true";
      applyPromoBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const code = (promoInput.value || "").trim().toUpperCase();

        if (!code) {
          activePromo = null;
          if (promoMsg) {
            promoMsg.style.display = "block";
            promoMsg.style.color = "#ff6b6b";
            promoMsg.innerText = "Please enter a coupon code.";
          }
          applyPromoBtn.textContent = "Apply";
          applyPromoBtn.classList.remove("is-applied");
          renderCartPage();
          return;
        }

        if (PROMO_CODES[code]) {
          activePromo = code;
          if (promoMsg) {
            promoMsg.style.display = "block";
            promoMsg.style.color = "#4CAF50";
            promoMsg.innerText = `Coupon "${code}" applied successfully!`;
          }
          applyPromoBtn.textContent = "Applied ✓";
          applyPromoBtn.classList.add("is-applied");
          renderCartPage();
        } else {
          activePromo = null;
          if (promoMsg) {
            promoMsg.style.display = "block";
            promoMsg.style.color = "#ff6b6b";
            promoMsg.innerText = "Invalid promo code.";
          }
          applyPromoBtn.textContent = "Apply";
          applyPromoBtn.classList.remove("is-applied");
          renderCartPage();
        }
      });
    }
  }

// 5. Checkout form submission & Razorpay Integration
  const form = document.getElementById("checkout-form");
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector("button[type='submit']");
      submitBtn.disabled = true;
      submitBtn.textContent = "Connecting to Gateway...";

      const stateEl = document.getElementById("cust-state");
      const stateVal = stateEl ? stateEl.value.trim() : "Haryana";

      const customerDetails = {
        name: document.getElementById("cust-name").value.trim(),
        email: document.getElementById("cust-email").value.trim(),
        phone: document.getElementById("cust-phone").value.trim(),
        address: document.getElementById("cust-address").value.trim(),
        city: document.getElementById("cust-city").value.trim(),
        state: stateVal,
        pincode: document.getElementById("cust-pincode").value.trim(),
        instructions: document.getElementById("cust-instructions") ? document.getElementById("cust-instructions").value.trim() : ""
      };

      try {
        // Step A: Request order creation from your live Render server
        const response = await fetch(`${BACKEND_URL}/api/create-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: cart, promoCode: activePromo })
        });

        const orderData = await response.json();
        if (!response.ok) throw new Error(orderData.error || "Order creation failed on server.");

        // Step B: Configure and launch Razorpay checkout modal
        const options = {
          key: orderData.keyId || "rzp_live_TeJF4UMpNDx0f8",
          amount: orderData.amount * 100, // paise
          currency: "INR",
          name: "Navella Perfums",
          description: "Signature Fragrance Order",
          image: "logo.png",
          order_id: orderData.orderId,
          handler: async function (paymentResponse) {
            submitBtn.textContent = "Verifying Payment...";

            // Step C: Verify payment signature with Render backend
            const verifyRes = await fetch(`${BACKEND_URL}/api/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                orderDetails: {
                  ...customerDetails,
                  items: cart,
                  subtotal: subtotal,
                  discount: discountAmount,
                  shippingFee: shippingFee,
                  total: grandTotal,
                  state: customerDetails.state,
                  promoCode: activePromo || ""
                }
              })
            });

            const verifyData = await verifyRes.json();
            if (verifyData.status === "success") {
            localStorage.removeItem("navella_cart");
            // Redirect directly to the order tracking page
            window.location.href = `order-status.html?id=${paymentResponse.razorpay_order_id}`;
            } else {
              alert("Payment verification failed. Please contact support.");
              submitBtn.disabled = false;
              submitBtn.textContent = "Proceed to Pay via Razorpay";
            }
          },
          prefill: {
            name: customerDetails.name,
            email: customerDetails.email,
            contact: customerDetails.phone
          },
          theme: {
            color: "#3d0718"
          },
          modal: {
            ondismiss: function () {
              submitBtn.disabled = false;
              submitBtn.textContent = "Proceed to Pay via Razorpay";
            }
          }
        };

        const rzp = new Razorpay(options);
        rzp.open();

      } catch (err) {
        console.error(err);
        alert("Payment Error: " + err.message);
        submitBtn.disabled = false;
        submitBtn.textContent = "Proceed to Pay via Razorpay";
      }
    };
  }
}
