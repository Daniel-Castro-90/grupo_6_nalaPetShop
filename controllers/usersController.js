const { validationResult } = require('express-validator');
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');
const db = require('../database/models')
//const { getUsers, usersFilePath } = require('../middlewares/loginMiddleware');


const usersFilePath = path.join(__dirname, '../data/users.json');
function getUsers() {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    return users;
};

const usersController = {

    register: (req, res) => {
        return res.render('users/register');
    },

    async create(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('users/register', {
                    errors: errors.mapped(),
                    oldData: req.body,
                });
            }
            const role = await db.Role.findOne({ where: {name: 'Usuario'}});
            const newUser = {
                ...req.body,
                image: req.file?.filename,
                roles_id: role.id

            };
            await db.User.create(newUser);
            return res.redirect('/users');

        } catch (error) {
            return res.status(500).send(error);
        }
    },

    login: (req, res) => {
        res.render('users/login');
    },

    processLogin: (req, res) => {
        //volver a poner el codigo y crear un helper
        let users = getUsers();
        const user = users.find((element) => element.email === req.body.email);
        const errors = {
            unauthorized: {
                msg: 'Usuario y/o contraseña inválidos'
                }
            }
        
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