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
    if (req.body.saveUser != undefined) { res.cookie('saveUser', req.session.user.email, { maxAge: 60000 }) }
    return res.redirect('/users/profile');
};

module.exports = loginMiddleware;