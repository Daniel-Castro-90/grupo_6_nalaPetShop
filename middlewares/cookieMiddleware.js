const db = require('../database/models');
const bcrypt = require('bcrypt');

const cookieMiddleware = async (req, res, next) => {
    if (req.body.saveUser) {
        res.cookie('saveUser', req.body.email, { maxAge: 60000 });
    }

    if (req.cookies.saveUser && !req.session.user && req.body.password) {
        try {
            const userEmail = req.cookies.saveUser;
            const user = await db.User.findOne({ where: { email: userEmail } });

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
            return res.status(500).send('Error interno del servidor');
        }
    }

    next();
};

module.exports = cookieMiddleware;