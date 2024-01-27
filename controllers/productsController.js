const path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/products.json');
const { validationResult } = require('express-validator');
const db = require('../database/models');

const productsController = {
    products: async (req, res) => {
        try{
            const gato = await db.Product.findAll({
                where: {
                    category: 'gato'
                }
            });
            const perro = await db.Product.findAll({
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
    productsCat: async (req, res) =>{
        try{
            const gato = await db.Product.findAll({
                where: {
                    category: 'gato'
                }
            });
            res.render('products/productsCat', { gato });

        } catch (error) {
            console.error('Error al obtener productos: ', error);
            res.status(500).send('Internal Server Error');
        }
    },
    productsDog: async (req, res) =>{
        try {
            const perro = await db.Product.findAll({
                where: {
                    category: 'perro'
                }
            });
            res.render('products/productsDog', { perro });
        } catch (error) {
            console.error('Error al obtener productos: ', error);
            res.status(500).send('Internal Server Error');
        }
    },
    detail: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.idProduct);
            
            if(!product) {
                return res.status(404).render('partials/not-found')
            }

            res.render('products/productDetail', { product });
        } catch (error) {
            console.error('Error al obtener el detalle del producto:', error);
            res.status(500).render('Internal Server Error');
        }
    },
    editor: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.idProduct);
            res.render('products/productEditor', { product })
        } catch (error) {
            console.error('Error al obtener los datos del producto: ', error);
            res.status(500).render('Internal Server Error');
        }
    },
    destroy: async (req, res) => {
        await db.Product.destroy({
            where: { id: req.params.idProduct},
        });

        res.render('/products');
	},
    update: async (req, res) => {
        try {
            let product = await db.Product.findByPk(req.params.idProduct);
            if (product) {
                let updateProduct = {};
    
                if (req.body.name) {
                    updateProduct.name = req.body.name;
                }
    
                if (req.body.category) {
                    updateProduct.category = req.body.category;
                }
    
                if (req.body.price) {
                    updateProduct.price = req.body.price;
                }
    
                if (req.body.highlight !== undefined) {
                    updateProduct.highlight = req.body.highlight ? true : false;
                }

                if (req.body.package) {
                    updateProduct.package = req.body.package;
                }
    
                if (req.body.description) {
                    updateProduct.description = req.body.description;
                }
    
                if (req.file) {
                    updateProduct.image = req.file.filename;
                }
    
                product.update(updateProduct);
            }
            return res.redirect('/products');
        } catch (error) {
            console.error('Error al editar los datos del producto: ', error);
            res.status(500).render('Internal Server Error');
        }
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

            await db.Product.create(productToCreate);
    
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
    },
    order: async function (req, res) {
        let order = await db.Order.findByPk(req.params.idProduct, {
            include: db.Order.OrderItems,
        });

        return res.render('products/productOrder', { order });
    }
};

module.exports = productsController;