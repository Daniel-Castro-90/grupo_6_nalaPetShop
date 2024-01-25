const db = require("../database/models");

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
};


module.exports = apiController;
