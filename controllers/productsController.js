const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productsController = {

    products: (req, res) => {
        const gato = products.filter(product => product.category === 'gato');
        const perro = products.filter(product => product.category === 'perro');
        res.render('products/products', {gato, perro});
    },
    productsCat: (req, res) =>{
        const gato = products.filter(product => product.category === 'gato');
        res.render('products/productsCat', {gato});
    },
    productsDog: (req, res) =>{
        const perro = products.filter(product => product.category === 'perro');
        res.render('products/productsDog', {perro});
    },
    productDetail: (req, res) => {
        res.render('products/productDetail')
    },
    detail: (req, res) => {
        const product = products.find(product => product.id == req.params.idProduct);
        if (!product) {
            return res.render('partials/error', { 
                message: 'El producto no existe',
            error: {
                status: 404
            },
            path: ''
         });
        } 
        res.render('products/productDetail', { product });
    },
    productEditor: (req, res) => {
        let idProduct = req.params.idProduct;

        let productToEdit = products[idProduct];
        
        res.render("products/productEditor", {productToEdit: productToEdit});

        //res.send(productToEdit);
        //res.render("products/productEditor")
    },
    productCreation: (req, res) => {
        res.render("products/productCreation");
    },
    create: (req, res) => {
        const productToCreate = {
            id: products[products.length - 1 ].id + 1,
            image: 'defaultproduct.png',
            ...req.body
        }
        products.push(productToCreate);
        fs.writeFileSync(productsFilePath, JSON.stringify(products));
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