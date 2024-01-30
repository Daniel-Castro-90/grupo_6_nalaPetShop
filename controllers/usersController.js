const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../database/models');
const cloudinary = require('cloudinary').v2;
const userValidation = require('../middlewares/usersValidatorMiddleware')



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

            let cloudinaryUrl = 'https://res.cloudinary.com/do3hvqxmd/image/upload/v1706640003/h1fdobfwlbmnrohtuvmc.png'

            if (req.file) {
              const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
              cloudinaryUrl = cloudinaryResponse.secure_url;
  
              try {
                  fs.unlinkSync(req.file.path);
                  console.log('Archivo local eliminado: ', req.file.path);
              } catch (unlinkError) {
                  console.error('Error al eliminar el archivo local: ', unlinkError);
              }
          }
    
            const newUser = {
                ...req.body,
                image: cloudinaryUrl,
                roles_id: role.id
            };
        
            await db.User.create(newUser);
    
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

      try {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('users/login', {
                errors: errors.mapped(),
                oldData: req.body,
            });
        }

        let user = await db.User.findOne({
          where: {
              email: req.body.email,
          },
      });
  
      if (user) {
          let passOk = bcrypt.compareSync(req.body.password, user.password);
          if (passOk) {
              req.session.userLogged = user;
              req.session.lastActivity = Date.now();
  
              if (req.body.user_id) {
                  res.cookie("user_id", user.id, { maxAge: 100 * 60 * 5 });
              }
  
              if (user.roles_id === 1) {

                  return res.redirect("http://localhost:5173");
              } else {

                  return res.redirect("profile");
              }
          } else {
            return res.render("users/login", { errors: {password: {msg: "Email y/o contraseña incorrectos."}} });
          }
      } else {
        return res.render("users/login", { errors: {password: {msg: "Email y/o contraseña incorrectos."}} });
      }

      } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
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
    },
    topSecret: (req, res) => {
      return res.render('users/topSecret');
  },
};

module.exports = usersController;