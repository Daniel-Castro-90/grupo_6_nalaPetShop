function isLoggedMiddleware(req, res, next){
    if (!req.session.user) {
        return res.render('users/login');
    }
    next();
}

module.exports = isLoggedMiddleware;