const db = require('../database/models');
const bcrypt = require('bcrypt');

const cookieMiddleware = async (req, res, next) => {

  if (req.body.user_id) {
    res.cookie('user_id', req.session.email, { maxAge: 60000 });
  }

  if (req.cookies.user_id && !req.session.user && req.body.password) {
    try {
      const userId = req.cookies.user_id;
      const user = await db.User.findByPk(userId);

      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          req.session.user = {
            id: user.id,
            image: user.image,
            email: user.email,
            dni: user.dni,
            tel: user.tel
          };
          return res.redirect('/users/profile');
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error interno del servidor.');
    }
  }

  next();
};

module.exports = cookieMiddleware;
