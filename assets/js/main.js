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
            <div class="product mix ${product.category}">
                <div class="product__img">
                    <img src="${product.image}" alt="imagen" />
                </div>

                

                <div class="product__info">
                    <h4>
                        $${product.price.toFixed(2)} 
                        ${product.quantity ? `<span><b>Stock</b>: ${product.quantity}</span> ` : "<span class='soldout'>Sold out</span>"}
                        ${product.quantity ? `<i class='bx bx-plus' id='${product.id}'></i>` : ''}
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

    iconShoppingHTML.addEventListener('click', function () {
        cartHTML.classList.toggle("cart__show")
    });

    iconXcircle.addEventListener('click', function () {
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
                db.cart[productFind.id] = { ...productFind, amount: 1 };
            }

            window.localStorage.setItem("cart", JSON.stringify(db.cart))
            printProductsCard(db);
            totalSumPriceItem(db);
            hanlePrintAmountProducts(db)
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
        const { quantity, price, name, image, id, amount } = db.cart[product];
        const total = price * amount;

        console.log({ quantity, price, name, image, id, amount });
        html += `
                <div class="card__product">

                    <div class="card__product--img">
                        <img src="${image}" alt="imagen"/>
                    </div>

                    <div class="card__product--body">
                        <h4>${name} </h4>
                        <p>Stock: ${quantity} | <span>$${price.toFixed(2)}</span></p>
                        <p>Subtotal: $${total.toFixed(2)}</p>

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

function sumRestDeleteCart(db) {
    const cardProductsHTML = document.querySelector('.card__products');
    cardProductsHTML.addEventListener("click", function (e) {
        if (e.target.classList.contains("bx-plus-circle")) {
            const id = Number(e.target.parentElement.id);
            const productFind = db.products.find(
                (product) => product.id === id
            );

            if (productFind.quantity === db.cart[productFind.id].amount)
                return alert("No tenemos mas en bodega");

            db.cart[id].amount++;
        }

        if (e.target.classList.contains("bx-minus-circle")) {
            const id = Number(e.target.parentElement.id);
            if (db.cart[id].amount === 1) {
                const response = confirm('Estas seguro que quieres eliminar este producto?');
                if (!response) return
                delete db.cart[id];
            } else {
                db.cart[id].amount--;
            }
        }

        if (e.target.classList.contains("bxs-trash")) {
            const id = Number(e.target.parentElement.id);
            const response = confirm('Estas seguro que quieres eliminar este producto?');
            if (!response) return
            delete db.cart[id];
        }
        window.localStorage.setItem('cart', JSON.stringify(db.cart))
        printProductsCard(db);
        totalSumPriceItem(db);
        hanlePrintAmountProducts(db);
    });

}

function totalSumPriceItem(db) {
    const infoTotal = document.querySelector('.info__total');
    const infoAmount = document.querySelector('.info__amount');

    let totalProducts = 0;
    let amountProducts = 0;

    for (const product in db.cart) {
        const { amount, price } = db.cart[product];
        totalProducts += price * amount;
        amountProducts += amount;
    }
    infoTotal.textContent = "$" + totalProducts.toFixed(2);

    if (amountProducts == 1) {
        infoAmount.textContent = amountProducts + " item";
    } else {
        infoAmount.textContent = amountProducts + " items";
    }

}

function handleTotal(db) {
    const btnBuy = document.querySelector('.btn__buy');
    btnBuy.addEventListener('click', function () {
        if (!Object.values(db.cart).length)
            return alert("Por favor elija algo primero");
        const response = confirm('Seguro que quiere comprar estos productos?');
        if (!response) return;

        const currentProducts = [];

        for (const product of db.products) {
            const productCart = db.cart[product.id];
            if (product.id === productCart?.id) {
                currentProducts.push({
                    ...product,
                    quantity: product.quantity - productCart.amount,
                });
            } else {
                currentProducts.push(product);
            }

        }


        db.products = currentProducts;
        db.cart = {}
        window.localStorage.setItem('products', JSON.stringify(db.products));
        window.localStorage.setItem('cart', JSON.stringify(db.cart));

        location.reload();
        totalSumPriceItem(db);
        printProductsCard(db);
        printProducts(db);
        hanlePrintAmountProducts(db);
    });
}

function hanlePrintAmountProducts(db) {
    const amountProducts = document.querySelector('.amount__product');
    let amount = 0;

    for (const product in db.cart) {
        amount += db.cart[product].amount;
    }

    amountProducts.textContent = amount;
}

function navbarMenuMove() {



    const iconMenu = document.querySelector("#dashboard")
    const menu = document.querySelector("#menu")

    iconMenu.addEventListener('click', function () {
        menu.classList.toggle("menu__show")
    })

    /* const navbar = document.querySelector("#navbar"); */
    const container = document.querySelector(".container")

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            /*  navbar.classList.add("navbar__active"); */
            container.classList.add("navbar__active");
        } else {
            /* navbar.classList.remove("navbar__active"); */
            container.classList.remove("navbar__active");
        }


    });
}

function modeDark() {
    const iconMoon = document.querySelector(".bx-moon");
    const iconSun = document.querySelector(".bx-sun");
    iconMoon.addEventListener("click", function () {
        document.body.classList.toggle("darkmode");
        if (document.body.classList.contains("darkmode")) {
            localStorage.setItem('dark-mode', 'true');
        } else {
            localStorage.setItem('dark-mode', 'false');
        }
    });
    iconSun.addEventListener("click", function () {
        document.body.classList.toggle("darkmode");
        if (document.body.classList.contains("darkmode")) {
            localStorage.setItem('dark-mode', 'true');
        } else {
            localStorage.setItem('dark-mode', 'false');
        }
    });

    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('darkmode');
    } else {
        document.body.classList.add('dark-mode');
    }

}

function filter() {
    $(function () {
        $('#filter').on('mixLoad', function () {
            console.log('[event-handler] MixItUp Loaded');
        });

        $('#filter').on('mixStart', function () {
            console.log('[event-handler] Animation Started')
        });

        $('#filter').on('mixEnd', function () {
            console.log('[event-handler] Animation Ended')
        });

        $('#filter').mixItUp({
            callbacks: {
                onMixLoad: function () {
                    console.log('[callback] MixItUp Loaded');
                },
                onMixStart: function () {
                    console.log('[callback] Animation Started');
                },
                onMixEnd: function () {
                    console.log('[callback] Animation Ended');
                }
            }
        });
    });
}

function reload() {
    window.addEventListener('load', function () {
        const containerLoader = document.querySelector(".container_loader");
        containerLoader.style.opacity = 0
        containerLoader.style.visibility = 'hidden'

    });
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
    sumRestDeleteCart(db);
    totalSumPriceItem(db);
    handleTotal(db);
    hanlePrintAmountProducts(db);
    navbarMenuMove()
    modeDark()
    filter()
    reload()



}
main()






















