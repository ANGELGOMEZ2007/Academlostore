async function getProducts(){
    try {
        const data = await fetch(
            "https://ecommercebackend.fundamentos-29.repl.co/"
        );

        const res = await data.json();

        return res;
    } catch (error) {
        console.log(error);
    }
}

async function main() {
    const res = await getProducts();

    console.log(res);
}

main()


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