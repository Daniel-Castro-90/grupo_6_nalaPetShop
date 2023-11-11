const multer = require('multer');
const path = require('path');

// MEJORAR: TIPOS DE ARCHIVOS PERMITIDOS PARA SUBIR, TAMAÑO DE ARCHIVOS. SI NO ESTA TODOS LOS DEMAS CAMPOS COMPLETOS NO
//DEBERIA SUBIR NINGÚN ARCHIVO.
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../public/images/products'));
    },
    filename: (req, file, callback) => {
        const newProductFile = 'product-' + Date.now() + path.extname(file.originalname);
        callback(null, newProductFile);
    },
    fileFilter: (req, file, callback) => {
        const imageExt = ['image/jpeg', 'image/jpg', 'image/svg', 'image/png'];
        if (imageExt.includes(file.imageExt)) createBrotliCompress(null, true)
    },
    limits : {
        fieldSize: 10000000
    }
});

const upload = multer({ storage });

module.exports = upload;