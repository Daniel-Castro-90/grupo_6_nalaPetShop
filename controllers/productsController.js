const path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/products.json');
const { validationResult } = require('express-validator');

function getProducts() {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    return products;
};

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
    detail: (req, res) => {
        const products = getProducts();
        const product = products.find(product => product.id == req.params.idProduct);
        res.render('products/productDetail', { product });
    },
    editor: (req, res) => {
        const products = getProducts();
        const product = products.find(product => product.id == req.params.idProduct);
        res.render('products/productEditor', { product });
    },
    destroy: (req, res) => {
		const products = getProducts();
		const indexProduct = products.findIndex(product => product.id == req.params.idProduct);
		products.splice(indexProduct, 1);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
		res.redirect('/products');
	},
    update: (req, res) => {
        const products = getProducts();
        const indexProduct = products.findIndex(product => product.id == req.params.idProduct);
        products[indexProduct] = {
            ...products[indexProduct],
            ...req.body,
            image: req.file.filename
        };
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        return res.redirect('/products');
    },
    productCreation: (req, res) => {
        res.render("products/productCreation");
    },
    create: (req, res) => {
        const products = getProducts();
        const error = validationResult(req);
        // si hay error poner el mensaje, sino crear producto
        if (error.isEmpty()){
            const productToCreate = {
                id: products[products.length - 1 ].id + 1,
                image: req.file.filename,
                ...req.body
            }
            products.push(productToCreate);
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

        }
        return res.redirect('/products');
    },
    productCart: (req, res) => {
        res.render('products/productCart')
    },
    search: (req, res) => {
        const product = getProducts();
        let search = req.query.busqueda ? req.query.busqueda.toLowerCase() : '';
        let productResults = [];
        
        for (let i = 0; i < product.length; i++){
            if (product[i].name.toLowerCase().includes(search)){
                productResults.push(product[i]);
            }

        }
        res.render('products/productResults', { productResults });
    }
};

module.exports = productsController;