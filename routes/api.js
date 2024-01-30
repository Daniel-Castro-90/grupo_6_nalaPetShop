const express = require("express");
const router = express.Router();
const upload = require('../middlewares/multerUsersMiddleware.js');
const apiController = require("../controllers/apiController");
const cloudinaryMiddleware = require('../middlewares/cloudinaryMiddleware.js');
const uploadProduct = require('../middlewares/multerMiddleware.js');

//Products
router.get('/', apiController.product)
router.get('/products/:idProduct', apiController.product);
router.post("/checkout", apiController.checkout);
router.get('/products', apiController.productsList);
router.get('/lastProduct', apiController.lastProduct);
router.post('/addproduct', uploadProduct.single('image'), apiController.addProduct);

//Orders
router.get('/orders', apiController.orders);
router.get('/orderitems', apiController.orderItems);



//Users
router.get('/users', apiController.usersList);
router.get('/user/:idUser', apiController.user)
router.post('/adduser', upload.single('image'), cloudinaryMiddleware, apiController.addUser);

module.exports = router;