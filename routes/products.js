let express = require('express');
let router = express.Router();
let productsController = require('../controllers/productsController.js')


router.get('/', productsController.products);

router.get('/productsCat', productsController.productsCat);

router.get('/productsDog', productsController.productsDog);

router.get('/productDetail', productsController.productDetail);

router.get('/productDetail/:idProduct', productsController.detail);

router.get('/productEditor', productsController.productEditor);

router.get('/productEditor/:idProduct', productsController.productEditor);

router.put('/productEditor/:idProduct/update', (req, res) => {
    res.send("Probando")
});

router.get('/productCreation', productsController.productCreation);

router.get('/productCart', productsController.productCart);

router.get('/search', productsController.search);



module.exports = router;