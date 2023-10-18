const path = require('path');

const usersController = {
    register: (req, res) => {
        res.render('users/register');
    },

    login: (req, res) => {
        res.render('users/login');
    },

    userSave: (req, res) => {
        const {email, password, confirmPassword, dni, tel } = req.body;

        if (!email) {
            return res.status(400).json({ mensaje: "Por favor completar todos los campos. Falta el email."});
        }
        if (!password) {
            return res.status(400).json({ mensaje: "Por favor completar todos los campos. Falta la contraseña."});
        }
        if (!confirmPassword) {
            return res.status(400).json({ mensaje: "Por favor completar todos los campos. Falta repetir la contraseña."})
        }
        if (!dni) {
            return res.status(400).json({ mensaje: "Por favor completar todos los campos. Falta el DNI."});
        }
        if (!tel) {
            return res.status(400).json({ mensaje: "Por favor completar todos los campos. Falta el teléfono."});
        }
        if(password !== confirmPassword){
            return res.status(400).json({mensaje: "Por favor verificar las contraseñas. Deben coincidir exactamente."})
        }

        const newUser = {
            email,
            password,
            confirmPassword,
            dni,
            tel,
        };

        //bd.push(newUser);

        //res.status(201).json({ mensaje: "Usted se ha registrado exitosamente."})

        res.send(newUser)
    },
};

module.exports = usersController;