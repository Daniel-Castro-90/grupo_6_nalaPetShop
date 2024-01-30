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

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, callback) => {
        const imageExt = ['image/jpeg', 'image/jpg', 'image/png'];
        if (imageExt.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error('Invalid file type'));
        }
    },
    limits: {
        //10 mb
        fileSize: 10000000,
    }
});

module.exports = upload;