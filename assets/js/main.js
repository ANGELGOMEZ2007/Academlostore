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

function handleShowCart() {
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

function addToCartFromProducts(db) {
    const productsHTML = document.querySelector(".products");

    productsHTML.addEventListener("click", function (e) {
        if (e.target.classList.contains("bx-plus")) {
            const id = Number(e.target.id)
        
            const productFind = db.products.find(
                (product) => product.id === id
            );

            if (db.cart[productFind.id]) {
                if (productFind.quantity === db.cart[productFind.id].amount) {
                    return alert("No tenemos mas en bodega");
                    
                }
                db.cart[productFind.id].amount++;
            } else {
                db.cart[productFind.id] = { ...productFind, amount: 1};
            }

            window.localStorage.setItem("cart", JSON.stringify(db.cart))
            printProductsCard(db)
        }
    });
}

function nightIconChange() {
    const iconMoon = document.querySelector(".bx-moon")
    const iconSun = document.querySelector(".bx-sun")

    iconMoon.addEventListener('click', function () {
    iconSun.classList.toggle("see"),
    iconMoon.classList.toggle("see")

    
});
    iconSun.addEventListener('click', function () {
    iconSun.classList.toggle("see"),
    iconMoon.classList.toggle("see")

    
});  
}

function printProductsCard(db) {
    const cardProducts = document.querySelector(".card__products");
    let html = ''
        for (const product in db.cart) {
            const {quantity, price, name, image, id, amount} = db.cart[product];

            console.log({ quantity, price, name, image, id, amount });
            html += `
                <div class="card__product">

                    <div class="card__product--img">
                        <img src="${image}" alt="imagen"/>
                    </div>

                    <div class="card__product--body">
                        <h4>${name} </h4>
                        <p>Stock: ${quantity} | <span>$${price.toFixed(2)}</span></p>
                        <p>Subtotal: $</p>

                        <div class="card__product--body-op" id='${id}'>
                        <i class='bx bx-minus-circle' ></i>
                            <span>${amount} unit</span>
                            <i class='bx bx-plus-circle' ></i>
                            <i class='bx bxs-trash' ></i>
                        </div>
                    </div>
                </div>
            `;
           
        }
        cardProducts.innerHTML = html;
}



async function main() {
    const db = {
        products:
            JSON.parse(window.localStorage.getItem('products')) ||
            await getProducts(),
        cart: JSON.parse(window.localStorage.getItem('cart')) || {},
    };

    printProducts(db);
    handleShowCart();
    addToCartFromProducts(db);
    nightIconChange();
    printProductsCard(db);


    const cardProductsHTML = document.querySelector('.card__products');
    cardProductsHTML.addEventListener("click", function(e){
        if (e.target.classList.contains("bx-plus-circle")){
            console.log(e.target.parentElement.id);
        }

        if (e.target.classList.contains("bx-minus-circle")){
            console.log("quieres restar");
        }

        if (e.target.classList.contains("bxs-trash")){
            console.log("quieres eliminar");
        }
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