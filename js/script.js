// toggle class active
const navbarNav = document.querySelector(".navbar-nav");

// ketika hambergur menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
    navbarNav.classList.toggle("active");
};

// klik di luar side bar untuk menghilangkan nav
const hambergur = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
    if (!hambergur.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove("active");
    }
})