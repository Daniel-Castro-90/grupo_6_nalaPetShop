let path = require('path');

const productsController = {
    productCart: (req, res) => {
        res.render('products/productCart')
    },

    productDetail: (req, res) => {
        res.render('products/productDetail')
    },
    product: (req, res) => {
        res.render('products/products')
    },
};

module.exports = productsController;