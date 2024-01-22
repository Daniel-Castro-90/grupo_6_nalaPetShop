const { body } = require('express-validator');


//agregar placeholders en la vista
const productValidation = [
    body('category').notEmpty().withMessage('Se debe seleccionar una categoría para el producto.'),
    body('name').notEmpty().withMessage('El campo nombre del producto no puede estar vacío.').isLength({ min: 10 }).withMessage('El nombre del producto debe tener al menos 10 caracteres'),
    body('description').notEmpty().withMessage('El campo descripción del producto no puede estar vacío.').isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 carácteres.'),
    body('package').notEmpty().withMessage('El campo presentación del producto no puede estar vacío.').isNumeric().withMessage('La presentación solo puede ser en números.'),
    body('price').notEmpty().withMessage('El campo precio del producto no puede estar vacío.').isNumeric().withMessage('El precio solo puede ser en números.'),
];

module.exports = productValidation;