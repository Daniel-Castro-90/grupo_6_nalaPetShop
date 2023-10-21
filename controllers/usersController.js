const path = require('path');
const fs = require('fs');

const usersFilePath = path.join(__dirname, '../data/users.json');

const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
    register: (req, res) => {
        res.render('users/register');
    },
    create: (req, res) =>{
        const usersToCreate = {
            id: users[users.length -1].id +1,
            ...req.body
        }
        var usersToWrite = [...users,usersToCreate];
        fs.writeFileSync(usersFilePath, JSON.stringify(usersToWrite, null, 2));
        res.redirect('/users/register');
    },

    login: (req, res) => {
        res.render('users/login');
    },

    userSave: (req, res) => {
        console.log("llergaeg");
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