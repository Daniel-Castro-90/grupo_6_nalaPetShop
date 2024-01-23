const db = require("../database/models");

const apiController = {
    product: async function (req, res) {
        try {
            const product = await db.product.findByPk(req.params.idProduct);

            if(!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            return res.json(product);
        } catch (error) {
            console.error('Fetching error details: ', error);
            return res.status(500).json({ error: 'Internal Server Error'});
        }
    },
    checkout: async function (req, res) {
        let order = await db.Order.create(
            { ...req.body, userId: req.session.userLogged.id },
            {
                include: db.Order.OrderItems,
            }
        );
        res.json({ ok: true, status: 200, order: order });
    },
};


module.exports = apiController;
