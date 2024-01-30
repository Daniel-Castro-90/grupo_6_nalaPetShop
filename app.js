// varibales
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
let routeProducts = require('./routes/products');
let routeIndex = require('./routes/index');
let routeUsers = require('./routes/users');
let routeApis = require('./routes/api');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
//const cookieMiddleware = require('./middlewares/cookieMiddleware');

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: process.env.SECRET }));
app.use(morgan('dev'));
app.use(cookieParser());
//app.use(cookieMiddleware);

// method Override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Public
app.use(express.static('public'));

// Routes
app.use('/', routeIndex);
app.use('/products', routeProducts);
app.use('/users', routeUsers);
app.use('/api', routeApis);

// Hacer vista con imagen y botón. DIV PARA CONTENER TODO
app.use((req, res, next) => {
    return res.status(404).render('partials/not-found');
});

// Server start
app.listen(port, () => {
    console.log(`Servidor iniciado correctamente en el puerto ${port}`);
});