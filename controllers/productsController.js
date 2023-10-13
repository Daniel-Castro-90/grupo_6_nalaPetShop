const path = require('path');
const fs = require('fs');


const productsFilePath = path.join(__dirname, '../data/products.json');

function getProducts() {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    return products;
};


const products = getProducts();
const productsController = {
    products: (req, res) => {
        const products = getProducts();
        const gato = products.filter(product => product.category === 'gato');
        const perro = products.filter(product => product.category === 'perro');
        res.render('products/products', {gato, perro});
    },
    productsCat: (req, res) =>{
        const products = getProducts();
        const gato = products.filter(product => product.category === 'gato');
        res.render('products/productsCat', {gato});
    },
    productsDog: (req, res) =>{
        const products = getProducts();
        const perro = products.filter(product => product.category === 'perro');
        res.render('products/productsDog', {perro});
    },
    productDetail: (req, res) => {
        res.render('products/productDetail')
    },
    detail: (req, res) => {
        const products = getProducts();
        const product = products.find(product => product.id == req.params.idProduct);
        res.render('products/productDetail', { product });
    },
    editor: (req, res) => {
        const products = getProducts();
        const product = products.find(product => product.id == req.params.idProduct);
        res.render('products/productEditor', { productToEdit: product });
    },
    update: (req, res) => {
        const products = getProducts();
        const indexProduct = products.findIndex(product => product.id == req.params.idProduct);
        products[indexProduct] = {
            ...products[indexProduct],
            ...req.body
        };
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect('/products');
    },
    productCreation: (req, res) => {
        res.render("products/productCreation");
    },
    create: (req, res) => {
        const products = getProducts();
        const productToCreate = {
            id: products[products.length - 1 ].id + 1,
            image: 'defaultproduct.png',
            ...req.body
        }
        products.push(productToCreate);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect('/products');
    },
    productCart: (req, res) => {
        res.render('products/productCart')
    },
    search: (req, res) => {
        let search = req.query.busqueda;
        res.send(search);
    }
};

module.exports = productsController;