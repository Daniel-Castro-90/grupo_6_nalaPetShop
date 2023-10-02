// La lista de productos se carga desde algún archivo JSON)
const productos = [
    {
        id: 1,
        nombre: 'Producto 1',
        precio: 10.99,
        imagen: '/images/products/purina-adulto.png',
    },
    {
        id: 2,
        nombre: 'Purina Excellent',
        precio: 15.99,
        imagen: '/images/products/purina-gato2.png',
    },

];

// Muestra los productos en el carrito
function mostrarProductosEnCarrito() {
    const carrito = document.querySelector('.carrito');

    // Limpia el contenido del carrito
    carrito.innerHTML = '';

    // Itera sobre los productos en el carrito y crea elementos HTML para mostrarlos
    productos.forEach((producto) => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');

        // Crea elementos HTML para mostrar la información del producto
        const imagenElement = document.createElement('img');
        imagenElement.src = producto.imagen;

        const nombreElement = document.createElement('h2');
        nombreElement.textContent = producto.nombre;

        const precioElement = document.createElement('p');
        precioElement.textContent = `$${producto.precio.toFixed(2)}`;

        // Agrega los elementos al elemento del producto
        productoElement.appendChild(imagenElement);
        productoElement.appendChild(nombreElement);
        productoElement.appendChild(precioElement);

        // Agrega el producto al carrito
        carrito.appendChild(productoElement);
    });
}

// Llama a la función para mostrar los productos en el carrito cuando la página se cargue
window.addEventListener('load', mostrarProductosEnCarrito);
