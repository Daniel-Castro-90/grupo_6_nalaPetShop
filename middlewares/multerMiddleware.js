const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../public/images/products'));
    },
    filename: (req, file, callback) => {
        const newProductFile = 'product-' + Date.now() + path.extname(file.originalname);
        callback(null, newProductFile);
    }
});

const upload = multer({ storage });

module.exports = upload;