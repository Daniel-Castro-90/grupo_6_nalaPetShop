//varibales
const express = require('express');
const app = express();
const port = 3000;
let routeProducts = require('./routes/products');
let routeIndex = require('./routes/index');
let routeUsers = require('./routes/users');
//const logMiddleware = require('./middlewares/logMiddleware');
const session = require('express-session');
const cookieParser = require('cookie-parser');

//Middlewares
//app.use(logMiddleware);
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(session({ secret: 'Infousers' }));


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


//hacer vista con imagen y botón. DIV PARA CONTENER TODO
app.use((req, res, next) => {
    res.status(404).render('partials/not-found')
})

//server start
app.listen(port, () => {
    console.log(`Servidor iniciado correctamente en el puerto ${port}`);
});
