const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../database/models');
const cloudinary = require('cloudinary').v2;



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
            if (!role) {
                return res.status(500).send('Role "Usuario" not found');
            }

            const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
            const cloudinaryUrl = cloudinaryResponse.secure_url;

            let image = '/public/images/profiles/defaultprofile.png';
            

            const newUser = {
                ...req.body,
                image: cloudinaryUrl || image, //poner secure_url
                roles_id: role.id
            };
        
            await db.User.create(newUser);
            //Eliminar la imagen local
            try {
                const fs = require('fs');
                fs.unlinkSync(req.file.path);
                console.log('Archivo local eliminado: ', req.file.path);
            } catch (unlinkError) {
                console.error('Error al eliminar el archivo local: ', unlinkError);
            }

            return res.redirect('/users');

        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    },

    login: (req, res) => {
        res.render('users/login');
    },

    async processLogin(req, res) {

                // Valido errores
                let errors = validationResult(req);

                //Retorar errores a la vista
                if (!errors.isEmpty()) {
                    let error = errors.mapped();
                    console.log(error);
                    return res.render("users/login", { error: error, olds: req.body})
                }

                //Buscar usuario

                let user = await db.User.findOne({
                    where: {
                        email: req.body.email,
                    },
                });

                if(user) {
                    let passOk = bcrypt.compareSync(req.body.password, user.password);
                    if(passOk) {
                        req.session.userLogged = user;
                        req.session.lastActivity = Date.now();

                        if(req.body.saveUser) {
                            res.cookie("user_id", user.id, { maxAge: 100 * 60 * 5 });
                        }

                        return res.redirect("/users/profile");
                    } else {
                        return res.render("/users/login", {
                            errors: {
                                msg: "Usuario y/o contraseña inválidos"
                            },
                            olds: req.body,
                        })
                    }
                }
    },

    profile: async (req, res) => {
        let orders = await db.Order.findAll({
            where: {user_id: req.session.userLogged.id }
        });
        const user = await db.User.findByPk(req.params.idUser)
        return res.render('users/profile', { orders, user });
    },

    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie("user_id");
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