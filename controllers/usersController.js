const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');


const usersFilePath = path.join(__dirname, '../data/users.json');
function getUsers() {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    return users;
};

const usersController = {
    register: (req, res) => {
        res.render('users/register');
    },

    login: (req, res) => {
        res.render('users/login');
    },

    processLogin: (req, res) => {
        let errors = validationResult(req);
    
        if (errors.isEmpty()) {
            let users = getUsers();
            let usuarioLogin;
    
            for(let i = 0; i < users.length; i++) {
                if (users[i].email == req.body.email) {
                    if (bcrypt.compareSync(req.body.password, users[i].password)) {
                        usuarioLogin = users[i];
                        break;
                    }
                }
            }
    
            req.session.usuarioLogeado = usuarioLogin;
            res.send('Logeado!');
        } else {
            return res.send('usuario invalido o contraseña incorrecta');
        }
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

        res.send(newUser)
    },
};

module.exports = usersController;