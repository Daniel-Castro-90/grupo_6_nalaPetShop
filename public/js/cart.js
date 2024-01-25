let cart = JSON.parse(localStorage.cart);

function removeItem(index, price) {
    const item = cart[index];
    if (cart.length > 1) {
        if (item.quantity > 1) {
            item.quantity -= 1;
            document.querySelector(`#row${index} .prod-quant`).innerText = `${item.quantity} Unidades`;
            document.querySelector(`#row${index} .prod-price`).innerText = `$ ${parseFloat(price * item.quantity, 2).toFixed(2)}`;
        } else {
            cart.splice(index, 1);
            document.querySelector(`#row${index}`).remove();
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    } else {
        localStorage.removeItem("cart");
        products = [];
        setEmptyCart();
    }

    let cartNumber = document.querySelector(".cart-number");
    cartNumber.innerText = productsInCart();

    products[index].quantity = item.quantity

    document.querySelector(".totalAmount").innerText = `$ ${Total(products)}`;

    if (typeof toastr !== 'undefined') {
        toastr.success("Se borró el producto del carrito");
    }
    console.log(`Removing item at index ${index}`);
}

function setEmptyCart() {
    cartRows.innerHTML =
        `<tr>
        <td colspan="5"> <div class="alert alert-warning my-2 text-center"> No tienes productos en el carrito </div></td>
    </tr>`;
}

function EmptyCart() {
    localStorage.removeItem("cart");
}

function Total(products) {
    return products.reduce(
        (total, product) => (total += product.price * product.quantity), 0
    );
}

let cartRows = document.querySelector('.cartRows');

let products = [];

if (localStorage.cart && localStorage.cart != "[]") {

    cart.forEach((item, index) => {
        fetch(`/api/products/${item.id}`)
            .then(res => res.json())
            .then((product) => {
                if (product) {
                    cartRows.innerHTML += `
                    <tr id="row${index}">
                        <th scope="row">${index + 1}</th>
                        <td>${product.name}</td>
                        <img class="prod-img" src="/images/products/${product.image}" style="width: 100px; height: 100px;">
                        <td>$ ${product.price}</td>
                        <td class="prod-quant">${item.quantity} Unidades</td>
                        <td class="prod-price">$ ${parseFloat(product.price * item.quantity, 2).toFixed(2)}</td>
                        <td><button class="btn btn-danger btn-sm rem-item" onclick=removeItem(${index},${product.price})><i class="fas fa-trash"></i></button></td>
                    </tr>`;
                    products.push({
                        product_id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: item.quantity
                    });
                } else {
                    cart.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                }

            })
            .then(() => {
                document.querySelector('.totalAmount').innerText = `$ ${Total(products)}`
            })
            .catch(error => console.log(error));
    });
} else {
    setEmptyCart();
}

let checkoutCart = document.querySelector('#checkoutCart');

checkoutCart.onsubmit = (e) => {
    e.preventDefault();
    const formData = {
        orderItems: products,
        shippingMethod: checkoutCart.shippingMethod.value,
        paymentMethod: checkoutCart.paymentMethod.value,
        total: Total(products)
    };
    fetch("/api/checkout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then((res) => res.json())
        .then((response) => {
            if (response.ok) {
                EmptyCart()
                location.href = `/products/order/${response.order.id}`
            } else {
                toastr.error("No se pudo realizar al compra, intente nuevamente más tarde");
            }
        })
        .catch((error) => console.log(error));
};
