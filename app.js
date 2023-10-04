const express = require('express');
const app = express()
const path = require('path');
const port = 3000;

app.set("view engine", "ejs"); 

let routeProducts = require('./routes/products');
let routeIndex = require('./routes/index');
let routeUsers = require('./routes/users');

app.use('/', routeIndex);

app.use('/products', routeProducts);

app.use('/user', routeUsers);


app.use(express.static('public'));
app.set("views", path.join(__dirname, "views"))

app.listen(port, () => {
    console.log(`Servidor iniciado correctamente en el puerto ${port}`);
});