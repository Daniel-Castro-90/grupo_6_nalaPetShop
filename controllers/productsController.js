const path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/products.json');
const { validationResult } = require('express-validator');
const db = require('../database/models');


function getProducts() {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    return products;
};

const productsController = {
    products: async (req, res) => {
        try{
            const gato = await db.product.findAll({
                where: {
                    category: 'gato'
                }
            });
            const perro = await db.product.findAll({
                where: {
                    category: 'perro'
                }
            });

            res.render('products/products', {gato, perro});

        } catch (error) {
            console.error('Error al obtener productos:', error);
            res.status(500).send('Internal Server Error')
        }
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
    detail: async (req, res) => {
        try {
            const product = await db.product.findByPk(req.params.idProduct);
            
            if(!product) {
                return res.status(404).render('partials/not-found')
            }

            res.render('products/productDetail', { product });
        } catch (error) {
            console.error('Error al obtener el detalle del producto:', error);
            res.status(500).render('Internal Server Error');
        }
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
    create: async (req, res) => {
        try {
            let image = 'defaultproduct.png';
            if (req.file) {
                image = req.file.filename;
            }
            const errors = validationResult(req);
            // Ver la carga de imágenes, si bien la vista avisa que no puede estar vacío ese campo, cuando los otros campos
            //están vacíos y se carga una imagen, el formulario no avanza, pero sí carga la imagen a la base de datos.
            if (!errors.isEmpty()){
                return res.render('products/productCreation', { 
                    errors: errors.mapped(),
                    oldData: req.body,
                 });
    
            }
            const productToCreate = {
                ...req.body,
                category: req.body.category,
                name: req.body.name,
                description: req.body.description,
                package: req.body.package,
                price: req.body.price,
                image: image,
                date: req.body.date,
            };
            console.log(productToCreate);

            await db.product.create(productToCreate);
    
            return res.redirect('/products');

        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
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