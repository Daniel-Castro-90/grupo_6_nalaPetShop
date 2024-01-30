const db = require("../database/models");
const Users = db.User;

const isLoggedButtons = async (req, res, next) => {
    res.locals.userFound = false;
    let userFromCookie;

    if (req.session && req.session.userLogged) {
        res.locals.userFound = true;
        res.locals.userLogged = req.session.userLogged;
        if (req.session.userLogged.id === 0) {
            res.locals.userAdmin = true;
        }
        next();
    } else {
        if (req.cookies.user_id) {
            userFromCookie = await Users.findOne({
                where: { id: req.cookies.user_id },
            });
        }

        if (userFromCookie) {
            res.locals.userFound = true;
            res.locals.userLogged = req.session.userLogged = userFromCookie;
            if (userFromCookie.id === 1) {
                res.locals.userAdmin = true;
            }
            next();
        } else {
            next();
        }
    }
};

module.exports = isLoggedButtons;