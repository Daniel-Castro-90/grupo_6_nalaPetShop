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
    create: (req, res) =>{
        const users = getUsers();
        let validator = validationResult(req);
        const {email, password, confirmPassword, dni, tel} = req.body;
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

        let userRegister = users.find(user => user.email === email);

        if(userRegister){
            return res.status(400).json({mensaje: "Usuario ya existente."})
        }
        if(!validator.isEmpty()){
            //El  validator.errors[0].msg muestra el primer error
            return res.status(400).json({mensaje: validator.errors[0].msg})
        }

        const usersToCreate = {
            id: users[users.length -1].id +1,
            email:email,
            password:bcrypt.hashSync(password, 10),
            dni:dni,
            tel:tel
        }
        var usersToWrite = [...users,usersToCreate];
        fs.writeFileSync(usersFilePath, JSON.stringify(usersToWrite, null, 2));
        res.redirect('/');
    },

    login: (req, res) => {
        res.render('users/login');
    },

    processLogin: (req, res) => {
        let users = getUsers();
        let userLogin = users.find(user => user.email === req.body.email && bcrypt.compareSync(req.body.password, user.password));
        if (userLogin) {
            req.session.usuarioLogeado = userLogin;
            console.log(req.session.usuarioLogeado);
            res.send('Logeado!');
        } else {
            return res.send('usuario invalido o contraseña incorrecta');
        }
    },

    userSave: (req, res) => {
        res.redirect('/')
    },
};

module.exports = usersController;