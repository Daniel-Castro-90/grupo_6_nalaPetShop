const path = require('path')
const db = require('../database/models');

const indexController = {
    main: async (req, res) => {
        try{
            const productosDestacados = await db.Product.findAll({
                where: {
                    highlight: 1
                }
            });
            const gato = await db.Product.findAll({
                where: {
                    category: 'gato'
                }
            });
            const perro = await db.Product.findAll({
                where: {
                    category: 'perro'
                }
            });

            res.render('index', {gato, perro, productosDestacados});

        } catch (error) {
            console.error('Error al obtener productos:', error);
            res.status(500).send('Internal Server Error')
        }
    },
};

module.exports = indexController;