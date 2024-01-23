const express = require("express");
const router = express.Router();

const controller = require("../controllers/apiController");

router.get("/products/productDetail/:idProduct");
router.post("/checkout", controller.checkout);