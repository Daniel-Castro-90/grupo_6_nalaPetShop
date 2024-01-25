//varibales
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
let routeProducts = require('./routes/products');
let routeIndex = require('./routes/index');
let routeUsers = require('./routes/users');
let routeApis = require('./routes/api');
//const logMiddleware = require('./middlewares/logMiddleware');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
//const cloudinaryMiddleware = require('./middlewares/cloudinaryMiddleware');

//Middlewares
//app.use(logMiddleware);
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(session({ secret: process.env.SECRET }));
app.use(morgan('dev'));
//app.use('/upload', cloudinaryMiddleware,)



//method Override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


// EJS
app.set("view engine", "ejs");


//public
app.use(express.static('public'));


// routes
app.use('/', routeIndex);

app.use('/products', routeProducts);

app.use('/users', routeUsers);

app.use('/api', routeApis);


//hacer vista con imagen y botón. DIV PARA CONTENER TODO
app.use((req, res, next) => {
    return res.status(404).render('partials/not-found')
})

//server start
app.listen(port, () => {
    console.log(`Servidor iniciado correctamente en el puerto ${port}`);
});
