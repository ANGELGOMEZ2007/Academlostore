async function getProducts() {
    try {
        const data = await fetch(
            "https://ecommercebackend.fundamentos-29.repl.co/"
        );

        const res = await data.json();

        window.localStorage.setItem("products", JSON.stringify(res));

        return res;
    } catch (error) {
        console.log(error);
    }
}

function printProducts(db) {
    const productsHTML = document.querySelector(".products");

    let html = "";

    for (const product of db.products) {
        html += `
        <div class="product">
            <div class="product__img">
                <img src="${product.image}" alt="imagen" />
            </div>

            

            <div class="product__info">
                <h4>
                    $${product.price.toFixed(2)} <span><b>Stock</b>: ${product.quantity}</span> 
                    <i class='bx bx-plus' id='${product.id}'></i>
                </h4>


                <h3>${product.name}</h3>
                
            </div>

        </div>
        `;
    }


    productsHTML.innerHTML = html;
}


async function main() {
    const db = {
        products:
            JSON.parse(window.localStorage.getItem('products')) ||
            await getProducts(),
        cart: {},
    };

    printProducts(db);


    const iconShoppingHTML = document.querySelector('.bx-shopping-bag');
    const cartHTML = document.querySelector('.cart');
    const iconXcircle = document.querySelector('.bx-x-circle');

    iconShoppingHTML.addEventListener('click', function(){
        cartHTML.classList.toggle("cart__show")
    });

    iconXcircle.addEventListener('click', function() {
        cartHTML.classList.toggle("cart__show")
    });
}
main()























const iconMenu = document.querySelector("#dashboard")
const menu = document.querySelector("#menu")

iconMenu.addEventListener('click', function () {
    menu.classList.toggle("menu__show")
})

const navbar = document.querySelector("#navbar");

window.addEventListener("scroll", function () {
    if (window.scrollY > 250) {
        navbar.classList.add("navbar__active")
    } else {
        navbar.classList.remove("navbar__active")
    }


});