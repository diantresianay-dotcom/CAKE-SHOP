// ========================================
// ELEMENTS
// ========================================
const searchBtn = document.querySelector(".search-icon");
const cartBtn = document.querySelector(".cart-icon");
const searchForm = document.querySelector(".search-form");
const cartPanel = document.querySelector(".cart-items-container");

// ========================================
// TOGGLE SEARCH
// ========================================
searchBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    searchForm.classList.toggle("active");
    cartPanel.classList.remove("active");
});

// ========================================
// TOGGLE CART
// ========================================
cartBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    cartPanel.classList.toggle("active");
    searchForm.classList.remove("active");
});

// ========================================
// CLOSE BOTH WHEN CLICK OUTSIDE
// ========================================
document.addEventListener("click", () => {
    searchForm.classList.remove("active");
    cartPanel.classList.remove("active");
});

searchForm.addEventListener("click", (e) => e.stopPropagation());
cartPanel.addEventListener("click", (e) => e.stopPropagation());

// ========================================
// ADD ITEM TO CART
// ========================================
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
}

// ========================================
// ADD TO CART - CAKE
// ========================================
document.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();

        const card = btn.closest(".cake-card");
        const image = card.querySelector("img").src;
        const name = card.querySelector("h3").innerText;
        const price = card.querySelector(".price").childNodes[0].nodeValue.trim();

        addToCart(image, name, price);
    });
});

// ========================================
// ADD TO CART - CHEESECAKE
// ========================================
document.querySelectorAll(".cart-add").forEach(btn => {
    btn.addEventListener("click", () => {

        const card = btn.closest(".cheese-card");
        const image = card.querySelector(".img img").src;
        const name = card.querySelector(".content h3").innerText;
        const price = card.querySelector(".price").childNodes[0].nodeValue.trim();

        addToCart(image, name, price);
    });
});

// ========================================
// DELETE STATIC CART ITEM
// ========================================
document.querySelectorAll(".cart-item .fa-times").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest(".cart-item").remove();
    });
});

// =======================================================
// ANIMASI SCROLL
// =======================================================
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

// DATA DESKRIPSI KUE
const cakeDetails = {
    "Mango Cheese Cake": {
        img: "images/cheesecake/cheesecake2.jpg",
        desc: "Cheesecake lembut dengan perpaduan krim keju dan manisnya mangga segar. Setiap gigitan memberi sensasi ringan, creamy, dan menyegarkan—pas untuk pencinta rasa tropis. Topping mangga asli memberikan aroma wangi dan rasa yang alami.",
        price: "30K (normal 40K)"
    },
    "Baked Cheese Cake": {
        img: "images/cheesecake/cheesecake3.jpg",
        desc: "Cheesecake panggang dengan tekstur padat namun tetap lembut. Aroma butter dan karamelisasinya terasa kuat, memberikan rasa klasik yang elegan. Topping berry manis-asam membuat rasanya semakin kaya dan memanjakan lidah.",
        price: "55K (normal 60K)"
    },
    "Fruity Summer Cheese Cake": {
        img: "images/cheesecake/cheesecake4.jpg",
        desc: "Cheesecake creamy dengan campuran buah segar seperti strawberry, blueberry, dan edible flowers. Rasanya seimbang antara manis dan asam, menghadirkan sensasi musim panas dalam satu potong. Warna-warni topping membuatnya sangat cantik untuk foto.",
        price: "55K (normal 60K)"
    }
};


// POPUP ELEMENT
const popup = document.getElementById("cake-popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupDesc = document.getElementById("popup-desc");
const popupPrice = document.getElementById("popup-price");
const closeBtn = document.querySelector(".close-btn");

// EVENT KLIK ICON EYE
document.querySelectorAll(".cheese-card .fa-eye").forEach((eye) => {
    eye.addEventListener("click", function () {

        let card = this.closest(".cheese-card");
        let title = card.querySelector("h3").innerText;

        popupImg.src = cakeDetails[title].img;
        popupTitle.innerText = title;
        popupDesc.innerText = cakeDetails[title].desc;
        popupPrice.innerText = cakeDetails[title].price;

        popup.style.display = "flex";
    });
});

// CLOSE POPUP
closeBtn.onclick = () => popup.style.display = "none";

window.onclick = (e) => {
    if (e.target === popup) popup.style.display = "none";
};

