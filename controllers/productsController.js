const { validationResult } = require('express-validator');
const db = require('../database/models');
const cloudinary = require('cloudinary').v2

const productsController = {
    products: async (req, res) => {
        try{
            const productosDestacados = await db.Product.findAll({
                where: {
                    highlight: 1
                }
            });
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

            res.render('products/products', {gato, perro, productosDestacados});

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
        try {
            await db.Product.destroy({
                where: { id: req.params.idProduct},
            });
    
            return res.render('/');
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            res.status(500).render('Internal Server Error');
        }

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
                    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
                    const cloudinaryUrl = cloudinaryResponse.secure_url;
    
                    updateProduct.image = cloudinaryUrl;
    
                    try {
                        fs.unlinkSync(req.file.path);
                        console.log('Archivo local eliminado: ', req.file.path);
                    } catch (unlinkError) {
                        console.error('Error al eliminar el archivo local: ', unlinkError);
                    }
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
            const errors = validationResult(req);
    
            if (!errors.isEmpty()) {
                return res.render('products/productCreation', {
                    errors: errors.mapped(),
                    oldData: req.body,
                });
            }
    
            let cloudinaryUrl = 'https://res.cloudinary.com/do3hvqxmd/image/upload/v1706425511/vomfjpj564ybc8zbtmre.png';
    
            if (req.file) {
                const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
                cloudinaryUrl = cloudinaryResponse.secure_url;
    
                try {
                    fs.unlinkSync(req.file.path);
                    console.log('Archivo local eliminado: ', req.file.path);
                } catch (unlinkError) {
                    console.error('Error al eliminar el archivo local: ', unlinkError);
                }
            }
    
            const productToCreate = {
                ...req.body,
                image: cloudinaryUrl,
            };
            console.log(productToCreate);
    
            await db.Product.create(productToCreate);
    
            return res.redirect('/');
    
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    },
    productCart: (req, res) => {
        res.render('products/productCart')
    },
    search: async (req, res) => {
        try {
            // Obtener todos los productos de la base de datos
            const products = await db.Product.findAll();
    
            // Obtener el término de búsqueda de la consulta
            let search = req.query.busqueda ? req.query.busqueda.toLowerCase() : '';
            
            // Filtrar productos que coincidan con el término de búsqueda
            let productResults = products.filter(product => 
                product.name.toLowerCase().includes(search)
            );
    
            // Renderizar la vista con los resultados de la búsqueda
            res.render('products/productResults', { productResults });
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            res.status(500).send('Error en el servidor');
        }
    },    
    order: async function (req, res) {
        try {
            let order = await db.Order.findByPk(req.params.idProduct, {
                include: db.Order.OrderItems,
            });
    
            let productIds = order.orderItems.map(item => item.product_id);
            let products = await db.Product.findAll({
                where: { id: productIds },
            });
    
            // Combina la información del producto con los OrderItems
            order.orderItems = order.orderItems.map(item => {
                const product = products.find(prod => prod.id === item.product_id);
                return {
                    ...item.toJSON(),
                    product: product || {},  // Asigna un objeto vacío si no se encuentra el producto
                };
            });
    
            return res.render('products/productOrder', { order });
        } catch (error) {
            console.error('Error al obtener detalles del pedido:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    
     
};

module.exports = productsController;