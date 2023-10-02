const express = require('express');
const app = express()
const path = require('path');
const port = 3000;

let routeProducts = require('./routes/products');
let routeIndex = require('./routes/index');
let routeUsers = require('./routes/users');

app.use('/', routeIndex);

app.use('/products', routeProducts);

app.use('/user', routeUsers);

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Servidor iniciado correctamente en el puerto ${port}`);
});