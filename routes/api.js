const express = require("express");
const router = express.Router();

const apiController = require("../controllers/apiController");

router.get('/', apiController.product)
router.get('/products/:idProduct', apiController.product);
router.post("/checkout", apiController.checkout);

module.exports = router;