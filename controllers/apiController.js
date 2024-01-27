const db = require("../database/models");
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
        let order = await db.Order.create(
            { ...req.body, user_id: req.session.userLogged.id },
            {
                include: db.Order.OrderItems,
            }
        );
        res.json({ ok: true, status: 200, order: order });
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
    user: async function (req, res) {
        const user = await db.User.findByPk(req.params.idUser);

        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json(user);
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
