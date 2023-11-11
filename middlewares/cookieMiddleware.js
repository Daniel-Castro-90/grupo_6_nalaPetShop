const loginMiddleware = require('../middlewares/loginMiddleware');


const cookieMiddleware = (req, res, next) => {
    if (req.body.saveUser != undefined) { res.cookie('saveUser', req.session.user.email, { maxAge: 60000 }) }
    if (req.cookies.saveUser != undefined && req.session.user == undefined) {
    
    return loginMiddleware (req, res, next);
    }
    next();

}

module.exports = cookieMiddleware;