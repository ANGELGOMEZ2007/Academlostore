const iconMenu = document.querySelector("#dashboard")
const menu = document.querySelector("#menu")

iconMenu.addEventListener('click', function(){
    menu.classList.toggle("menu__show")
})

const navbar = document.querySelector("#navbar");

window.addEventListener("scroll", function(){
    if (window.scrollY > 250) {
        navbar.classList.add("navbar__active")
    } else {
        navbar.classList.remove("navbar__active")
    }


});