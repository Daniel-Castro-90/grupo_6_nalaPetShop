let path = require('path');

const productsController = {
    products: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/products/products.html'))
    },

    productCart: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/products/productCart.html'))
    },

    productDetail: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/products/productDetail.html'))
    },
    productEditor: (req, res) => {
        res.render("products/productEditor")
    },
    productCreation: (req, res) => {
        res.render("products/productCreation")
    },
};

module.exports = productsController;