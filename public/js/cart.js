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
        (total, product) => (total += product.price * product.quantity), 0
    );
}

let cartRows = document.querySelector('.cartRows');

let products = [];

if(localStorage.cart) {
    let cart = JSON.parse(localStorage.cart);

    cart.forEach((item, index) => {
        fetch(`/api/products/${item.id}`)
        .then(res => res.json())
        .then(product => {
            if(product) {
                cartRows.innerHTML += `
                <tr id="row${index}">
                    <th scope="row">${index + 1}</th>
                    <td>${product.name}</td>
                    <img src="/images/products/${product.image}" style="width: 100px; height: 100px;">
                    <td>${product.price}</td>
                    <td class="text-center">${item.quantity}</td>
                    <td class="text-center">$ ${parseFloat(
                        product.price * item.quantity,
                        2
                    ).toFixed(2)}</td>
                    <td><button class="btn" onclic=removeItem(${index})> <i class= "fas fa-trash</button></td>
                </tr>
                `;
                products.push({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: item.quantity
                });              
            } else {
                cart.splice(index,1);
                localStorage.setItem('cart', JSON.stringify(cart));
            }

        })
        .then( () => {
            document.querySelector('.totalAmount').innerText = `${Total(products)}`
        })
        .catch(error => console.log(error));
    });
}

let checkoutCart = document.querySelector('#checkoutCart');

checkoutCart.onsubmit = (e) => {
    e.preventDefault();
    console.log(e)

}
