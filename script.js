// =======================================================
//  ELEMENTS
// =======================================================
const searchBtn = document.querySelector(".search-icon");
const cartBtn = document.querySelector(".cart-icon");
const searchForm = document.querySelector(".search-form");
const cartPanel = document.querySelector(".cart-items-container");
const menuBtn = document.querySelector("#menu-btn");
const navbar = document.querySelector(".navbar");
menuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    navbar.classList.toggle("active");

    searchForm?.classList.remove("active");
    cartPanel?.classList.remove("active");
});



// =======================================================
//  FUNCTION: CLOSE ALL PANELS
// =======================================================
function closeAll() {
    searchForm?.classList.remove("active");
    cartPanel?.classList.remove("active");
    navbar?.classList.remove("active");
}


// =======================================================
//  SEARCH BUTTON
// =======================================================
searchBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    searchForm.classList.toggle("active");
    cartPanel?.classList.remove("active");
});


// =======================================================
//  CART BUTTON
// =======================================================
cartBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    cartPanel.classList.toggle("active");
    searchForm?.classList.remove("active");
});



// =======================================================
//  CLOSE PANELS WHEN CLICK OUTSIDE
// =======================================================
document.addEventListener("click", () => {
    closeAll();
});


// Prevent closing when clicking inside elements
[
    searchForm,
    cartPanel,
    navbar
].forEach(el => {
    el?.addEventListener("click", (e) => e.stopPropagation());
});


// =======================================================
//  ADD TO CART FUNCTION
// =======================================================
function addToCart(image, name, price) {
    const item = document.createElement("div");
    item.classList.add("cart-item");

    item.innerHTML = `
        <span class="fas fa-times remove-item"></span>
        <img src="${image}">
        <div class="content">
            <h3>${name}</h3>
            <div class="price">${price}</div>
        </div>
    `;

    const checkoutBtn = document.querySelector(".checkout-btn");
    cartPanel.insertBefore(item, checkoutBtn);

    item.querySelector(".remove-item").addEventListener("click", () => {
        item.remove();
    });
    // Notifikasi sukses
    showToast(`${name} ditambahkan ke keranjang`);
}


// =======================================================
//  ADD TO CART: CAKE SECTION
// =======================================================
document.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();

        const card = btn.closest(".cake-card");
        if (!card) return;

        const image = card.querySelector("img")?.src;
        const name = card.querySelector("h3")?.innerText;
        const price = card.querySelector(".price")?.childNodes[0]?.nodeValue?.trim();

        addToCart(image, name, price);
    });
});


// =======================================================
//  ADD TO CART – CHEESECAKES
// =======================================================
document.querySelectorAll(".cart-add").forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".cheese-card");
        if (!card) return;

        const image = card.querySelector(".img img")?.src;
        const name = card.querySelector(".content h3")?.innerText;
        const price = card.querySelector(".price")?.childNodes[0]?.nodeValue?.trim();

        addToCart(image, name, price);
    });
});


// =======================================================
//  REMOVE STATIC CART ITEMS
// =======================================================
document.querySelectorAll(".cart-item .fa-times").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest(".cart-item")?.remove();
    });
});


// =======================================================
//  SCROLL REVEAL ANIMATION
// =======================================================
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
    });
}, { threshold: 0.15 });

document.querySelectorAll(".scroll-reveal").forEach(el => observer.observe(el));


// =======================================================
//  CAKE POPUP DATA
// =======================================================
const cakeDetails = {
    "Mango Cheese Cake": {
        img: "images/cheesecake/cheesecake2.jpg",
        desc: "Cheesecake lembut dengan perpaduan krim keju dan mangga segar.",
        price: "30K (normal 40K)"
    },
    "Baked Cheese Cake": {
        img: "images/cheesecake/cheesecake3.jpg",
        desc: "Cheesecake panggang dengan tekstur lembut dan aroma butter.",
        price: "55K (normal 60K)"
    },
    "Fruity Summer Cheese Cake": {
        img: "images/cheesecake/cheesecake4.jpg",
        desc: "Cheesecake creamy dipadukan dengan berbagai buah segar.",
        price: "55K (normal 60K)"
    }
};


// =======================================================
//  POPUP
// =======================================================
const popup = document.getElementById("cake-popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupDesc = document.getElementById("popup-desc");
const popupPrice = document.getElementById("popup-price");
const closeBtn = document.querySelector(".close-btn");


// OPEN POPUP
document.querySelectorAll(".cheese-card .fa-eye").forEach(eye => {
    eye.addEventListener("click", () => {
        const card = eye.closest(".cheese-card");
        const title = card.querySelector("h3").innerText;

        if (!cakeDetails[title]) return;

        popupImg.src = cakeDetails[title].img;
        popupTitle.innerText = title;
        popupDesc.innerText = cakeDetails[title].desc;
        popupPrice.innerText = cakeDetails[title].price;

        popup.style.display = "flex";
    });
});


// CLOSE POPUP
closeBtn?.addEventListener("click", () => popup.style.display = "none");

window.addEventListener("click", (e) => {
    if (e.target === popup) popup.style.display = "none";
});

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// =======================================================
//  LOVE / FAVORITE BUTTON
// =======================================================
document.querySelectorAll(".cheese-card .fa-heart").forEach(btn => {
    btn.addEventListener("click", () => {

        const card = btn.closest(".cheese-card");
        const name = card.querySelector("h3")?.innerText;

        // animasi kecil pada icon
        btn.style.transform = "scale(1.3)";
        setTimeout(() => btn.style.transform = "scale(1)", 200);

        // NOTIFIKASI
        showToast(`${name} disukai`);
    });
});

// =============================
//  CONTACT BUTTON VALIDATION
// =============================
const waBtn = document.getElementById("contact-now");
const contactForm = document.querySelector(".contact form");

if (waBtn && contactForm) {
    waBtn.addEventListener("click", () => {
        const name = contactForm.querySelector("input[name='name']");
        const email = contactForm.querySelector("input[name='email']");
        const phone = contactForm.querySelector("input[name='phone']");

        if (!name.value.trim()) {
            showToast("Nama harus diisi!");
            name.focus();
            return;
        }
        if (!email.value.trim()) {
            showToast("Email harus diisi!");
            email.focus();
            return;
        }
        if (!phone.value.trim()) {
            showToast("Nomor telepon harus diisi!");
            phone.focus();
            return;
        }

        // Format kirim ke WA
        let text = 
`Halo kak, saya ingin bertanya.
Nama: ${name.value}
Email: ${email.value}
Phone: ${phone.value}`;

        let url = "https://wa.me/6285813405573?text=" + encodeURIComponent(text);

        window.open(url, "_blank");
    });
}


