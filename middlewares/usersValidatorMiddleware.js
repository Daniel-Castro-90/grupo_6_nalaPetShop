const { body } = require('express-validator');

//agregar placeholders en la vista, también agregar mayor seguridad a contraseña
const userValidation = [
    body('email').notEmpty().withMessage('El email no puede estar vacío.').isEmail().withMessage('El formato del E-mail no es válido.'),
    body('password').notEmpty().withMessage('La contraseña no puede estar vacía').isLength({ min: 8 }).withMessage('La contraseña debe tener como mínimo 8 caracteres.'),
    body('confirmPassword').notEmpty().withMessage('La confirmación de contraseña no puede estar vacía').isLength({ min: 8 }).withMessage('La contraseña debe tener como mínimo 8 caracteres.'),
    body('dni').notEmpty().withMessage('El DNI no puede estar vacío.').isInt().withMessage('el DNI debe ser un número, sin puntos.'),
    body('tel').notEmpty().withMessage('El teléfono no puede estar vacío.').isNumeric().withMessage('El teléfono solo puede ser en números.'),
];

module.exports = userValidation;

//if(password !== confirmPassword){
//    return res.status(400).json({mensaje: "Por favor verificar las contraseñas. Deben coincidir exactamente."})
//}

//let userRegister = users.find(user => user.email === email);

//if(userRegister){
 //   return res.status(400).json({mensaje: "Usuario ya existente."})
//}
//if(!validator.isEmpty()){
    //El  validator.errors[0].msg muestra el primer error
 //   return res.status(400).json({mensaje: validator.errors[0].msg})
//}
