const adminMiddleware = (req, res, next) => {
    //Verificar si el usuario está logeado
    if (req.session.userLogged) {
      //Verificar si el usuario tiene roles_id igual a 1 (Admin)
      if (req.session.userLogged.roles_id === 1) {
        //El usuario es un admin, permitir acceso
        next();
      } else {
        //El usuario no es admin, redirigir a la página "topSecret.ejs" o realizar alguna acción
        res.redirect('/users/topSecret');
      }
    } else {
      //El usuario no está logeado, redirigir a la página de login o realizar alguna acción
      res.redirect('/users');
    }
  };
  
  module.exports = adminMiddleware;  