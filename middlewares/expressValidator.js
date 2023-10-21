const { body } = require('express-validator');

const validaciones = [
    body('category').notEmpty().withMessage('Se debe seleccionar una categoría para el producto.'),
    body('name').notEmpty().withMessage('El campo nombre del producto no puede estar vacío.'),
    body('description').notEmpty().withMessage('El campo descripción del producto no puede estar vacío.'),
    body('package').notEmpty().withMessage('El campo presentación del producto no puede estar vacío.'),
    body('price').notEmpty().withMessage('El campo precio del producto no puede estar vacío.'),
    body('image').notEmpty().withMessage('Se debe subir una imagen del producto'),
];

module.exports = validaciones;