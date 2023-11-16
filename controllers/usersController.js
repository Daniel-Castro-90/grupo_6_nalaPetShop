const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../database/models');

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

            const role = await db.Role.findOne({ where: { name: 'Usuario' } });
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

    async processLogin(req, res) {
        try {
            const user = await db.User.findOne({ where: { email: req.body.email } });
            const errors = {
                unauthorized: {
                    msg: 'Usuario y/o contraseña inválidos'
                }
            };

            if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
                return res.render('users/login', { errors });
            }

            req.session.user = {
                id: user.id,
                image: user.image,
                email: user.email,
                dni: user.dni,
                tel: user.tel
            };

            return res.redirect('/users/profile');
        } catch (error) {
            return res.status(500).send(error);
        }
    },

    profile: (req, res) => {
        const { user } = req.session;
        return res.render('users/profile', { user });
    },

    logout: (req, res) => {
        req.session.user = undefined;
        return res.render('users/login');
    },

    async editor(req, res) {
        try {
            const user = await db.User.findByPk(req.params.idUser);
            return res.render('users/userEditor', { user });
        } catch (error) {
            return res.status(500).send(error);
        }
    },

    async update(req, res) {
        try {
            const user = await db.User.findByPk(req.params.idUser);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            await user.update({
                ...req.body,
                password: bcrypt.hashSync(req.body.password, 10),
                image: req.file.filename
            });

            return res.redirect('/users/profile');
        } catch (error) {
            return res.status(500).send(error);
        }
    }
};

module.exports = usersController;