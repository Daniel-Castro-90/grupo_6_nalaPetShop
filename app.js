//varibales
const express = require('express');
const app = express();
const port = 3000;

app.set("view engine", "ejs"); 

let routeProducts = require('./routes/products');
let routeIndex = require('./routes/index');
let routeUsers = require('./routes/users');


// routes
app.use('/', routeIndex);

app.use('/products', routeProducts);

app.use('/user', routeUsers);


//uso de public

app.use(express.static('public'));
app.set("views", path.join(__dirname, "views"))


// EJS
app.set("view engine", "ejs");


//inicio del servidor
app.listen(port, () => {
    console.log(`Servidor iniciado correctamente en el puerto ${port}`);
});