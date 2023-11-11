const { validationResult } = require('express-validator');
const fs = require('fs');
const bcrypt = require('bcrypt');
//const { getUsers, usersFilePath } = require('../middlewares/loginMiddleware');

const usersController = {
    register: (req, res) => {
        return res.render('users/register');
    },
    create: (req, res) =>{
        const users = getUsers();
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.render('users/register',{
                errors: errors.mapped(),
                oldData: req.body,
            });
        }

        const user = {
            id: users[users.length -1] ? users[users.length -1].id + 1 : 1,
            // va 'default.jpg' en el modelo de la base de datos (ver clase 38 extra)"
            image: req.file.filename,
            email: req.body.email,
            dni: req.body.dni,
            tel: req.body.tel,
            password: bcrypt.hashSync(req.body.password, 10)
        };
        users.push(user);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 4));
        return res.redirect('/users');
    },

    login: (req, res) => {
        return res.render('users/login');
    },

    processLogin: (req, res) => {
        //volver a poner el codigo y crear un helper
                const path = require('path');
        const fs = require('fs');
        const bcrypt = require('bcrypt');


        const usersFilePath = path.join(__dirname, '../data/users.json');
        function getUsers() {
            const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
            return users;
        };

        const loginMiddleware = (req, res, next) => {
            let users = getUsers();
            const user = users.find((element) => element.email === req.body.email);
            const errors = {
                unauthorized: {
                    msg: 'Usuario y/o contraseña inválidos'
                }
            };
            if (!user) {
                return res.render('/users/login', { errors });
            }
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.render('/users/login', { errors });
            }
            req.session.user = {
                id: user.id,
                image: user.image,
                email: user.email,
                dni: user.dni,
                tel: user.tel
            };
            return res.redirect('/users/profile');
        };
    },

    profile: (req, res) => {
        const { user } = req.session;
        return res.render('users/profile', { user });
    },
    logout: (req, res) => {
        req.session.user = undefined;
        return res.render('users/login')
    },
    editor: (req, res) => {
        const users = getUsers();
        const user = users.find(user => user.id == req.params.idUser);
        return res.render('users/userEditor', { user })

    },
    //AL VIAJAR POR  PUT TIRA ERROR VER SI O SI
    update: (req, res) => {
        const users = getUsers();
        const indexUsers = users.findIndex(user => user.id == req.params.idUser);
        users[indexUsers] = {
            ...users[indexUsers],
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            image: req.file.filename
        };
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 4));
        return res.redirect('/users/profile')
    }
};

module.exports = usersController;