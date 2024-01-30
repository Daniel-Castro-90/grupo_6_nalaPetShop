const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../database/models');
const cloudinary = require('cloudinary').v2;
const { QueryTypes } = require('sequelize');

const apiController = {
    product: async function (req, res) {
            const product = await db.Product.findByPk(req.params.idProduct);

            if(!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            return res.json(product);
    },
    checkout: async function (req, res) {
        try {
            if (!req.session.userLogged) {
                return res.status(401).json({ ok: false, status: 401, error: "Unauthorized" });
            }
    
            let order = await db.Order.create(
                { ...req.body, user_id: req.session.userLogged.id },
                {
                    include: db.Order.OrderItems,
                }
            );
    
            return res.json({ ok: true, status: 200, order: order });
        } catch (error) {
            console.error('Error al procesar el checkout:', error);
            return res.status(500).json({ ok: false, status: 500, error: "Internal Server Error" });
        }
    },
    
    productsList: async function (req, res) {
        db.Product.findAll()
        .then(products => {
            let response = {
                meta: {
                    status: 200,
                    total: products.length,
                    url: 'api/products'
                },
                data: products
            }
            res.json(response);
        })
    },
    lastProduct: async function (req, res) {
        try {
            const lastProduct = await db.Product.findOne({
                order: [['createdAt', 'DESC']],
            });

            res.json({data: lastProduct});
        } catch (error) {
            console.error('Error al obtener el último producto:', error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    },
    addProduct: async (req, res) => {
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
        
                return res.redirect('/products');
        
            } catch (error) {
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }
        },
    usersList: async function (req, res) {
        db.User.findAll()
        .then(users => {
            let response = {
                meta: {
                    status: 200,
                    total: users.lenght,
                    url: 'api/users'
                },
                data: users
            }
            res.json(response);
        });
    },
    user: async function (req, res) {
        const user = await db.User.findByPk(req.params.idUser);

        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json(user);
    },
    async addUser(req, res) {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.render('users/register', {
                        errors: errors.mapped(),
                        oldData: req.body,
                    });
                }
        
                const role = await db.Role.findOne({ where: { name: 'Usuario' } });
                if (!role) {
                    return res.status(500).send('Role "Usuario" not found');
                }

                let cloudinaryUrl = 'https://res.cloudinary.com/do3hvqxmd/image/upload/v1706640003/h1fdobfwlbmnrohtuvmc.png';
        
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
        
                const newUser = {
                    ...req.body,
                    image: cloudinaryUrl,
                };
            
                await db.User.create(newUser);
        
                return res.redirect('/users');
        
            } catch (error) {
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }
    },
    orders: async function (req, res) {
        db.Order.findAll()
        .then(orders => {
            let response = {
                meta: {
                    status: 200,
                    total: orders.length,
                    url: 'api/orders'
                },
                data: orders
            }
            res.json(response);
        })
    },
    orderItems: async function (req, res) {
        try{
            const orderitems = await db.sequelize.query(
                'SELECT * FROM orderitems',
                { type: QueryTypes.SELECT }
            );

            let response = {
                meta: {
                    status: 200,
                    total: orderitems.length,
                    url: 'api/orderitems'
                },
                data: orderitems
            };
            res.json(response);
        } catch (error) {
            console.error('Error al obtener orderitems:', error);
            res.status(500).json({ error: 'Error interno del servidor'});
        }
    }
};


module.exports = apiController;
