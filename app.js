//varibales
const express = require('express');
const app = express();
const port = 3000;
let routeProducts = require('./routes/products');
let routeIndex = require('./routes/index');
let routeUsers = require('./routes/users');



//register form: POST method
app.use(express.urlencoded({ extended: false}));
app.use(express.json());


//method Override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


// routes
app.use('/', routeIndex);

app.use('/products', routeProducts);

app.use('/user', routeUsers);


//public
app.use(express.static('public'));


// EJS
app.set("view engine", "ejs");


//server start
app.listen(port, () => {
    console.log(`Servidor iniciado correctamente en el puerto ${port}`);
});
