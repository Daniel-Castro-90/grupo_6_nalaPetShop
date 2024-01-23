function setEmptyCart() {
    cartRos.innerHTML = 
    `<tr>
        <td colspan="5> <div class="alert alert-warning my-2 text-center"> No tienes productos en el carrito </div></td>
    </tr>`
}

function EmptyCart() {
    localStorage.removeItem("cart");
}

function Total(products) {
    return products.reduce(
        (total, product) => (TOTAL += product.price * product.quantity), 0
    );
}

if(localStorage.cart) {
    let cart = JSON.parse(localStorage.cart);
    console.log(cart);
    cart.forEach((item, index) => {
        fetch(`/api/product/${item.id}`)
    });
}