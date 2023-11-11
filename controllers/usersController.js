const { validationResult } = require('express-validator');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { getUsers, usersFilePath } = require('../middlewares/loginMiddleware');

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