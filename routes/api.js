const express = require("express");
const router = express.Router();

const apiController = require("../controllers/apiController");

//Products
router.get('/', apiController.product)
router.get('/products/:idProduct', apiController.product);
router.post("/checkout", apiController.checkout);
router.get('/products', apiController.productsList);
router.get('/orderitems', apiController.orderItems);
router.get('/lastProduct', apiController.lastProduct);


//Users
router.get('/users', apiController.usersList);
router.get('/user/:idUser', apiController.user)

module.exports = router;