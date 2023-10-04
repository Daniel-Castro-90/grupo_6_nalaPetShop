let path = require('path');

const productsController = {

    productCart: (req, res) => {
        res.render('products/productCart')
    },

    productDetail: (req, res) => {
        res.render('products/productDetail')
    },
    products: (req, res) => {
        res.render('products/products')
    },
    productEditor: (req, res) => {
        res.render("products/productEditor")
    },
    productCreation: (req, res) => {
        res.render("products/productCreation")
    },
};

module.exports = productsController;