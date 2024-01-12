const db = require('../database/models');


const apisController = {
    async getAllUsers(req, res) {
        const users = await db.User.findAll();
        if (!users) {
            return res.status(404).json({ message: 'No hay usuarios' });
        }

        const totalCount = users.length;

        const showUsers = users.map(user => ({
            id: user.id,
            email: user.email,
            dni: user.dni,
            tel: user.tel,
            detail: `${req.host}:3000/api/users/${user.id}`, // Suponiendo que la ruta para obtener el detalle sea '/api/users/:id'
        }));

        const result = {
            count: totalCount,
            users: showUsers
        }

        return res.send(result);
    },

    async getUser (req, res) {    
        const user = await db.User.findOne({
            where: { id: req.params.id },
        });
        if (!user) {
            return res.status(404).send("Usuario no encontrado");  // Retorna un mensaje si el usuario no se encuentra
        }

        const showUser = {
            id: user.id,
            email: user.email,
            dni: user.dni,
            tel: user.tel
        };
          
        res.send(showUser)
    },
};

module.exports = apisController;