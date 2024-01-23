function productsInCart() {
    if (localStorage.cart) {
        let cart = JSON.parse(localStorage.cart);

        return cart.reduce((total, product) => total + product.quantity, 0)
    } else {
        return 0;
    }
}

function updateCart() {
    let cartNumber = document.querySelector(".cart-number");
    if(cartNumber) {
        cartNumber.innerText = productsInCart();
    }
}

window.addEventListener("load", function () {
    
    // Alguna animación

    // Sistema de notificaciones, puede ser toastr
    if(typeof toastr !== 'undefined') {
        toastr.options = {
            positionClass: 'toast-bottom-right',
            fadeIn: 300,
            fadeOut: 1000,
            timeOut: 5000,
            extendedTimeOut: 1000,
        };
    }

    // 

    let btnBuy = document.querySelectorAll(".add_cart");

    btnBuy.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            if(localStorage.cart) {
                let cart = JSON.parse(localStorage.cart);

                let index = cart.findIndex((product) => product.id == e.target.dataset.id);
                if (index != -1) {
                    cart[index].quantity++
                } else {
                    cart.push({ id: e.target.dataset.id, quantity: 1 })
                }
                localStorage.setItem('cart', JSON.stringify(cart));

            } else {
                localStorage.setItem('cart', JSON.stringify([{ id:e.target.dataset.id, quantity: 1 }]))
            }

            if(typeof toastr !== 'undefined') {
                toastr.success('Se agregó un nuevo producto al carrito');
            }

            updateCart();
        });
    });
    updateCart();
});
