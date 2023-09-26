const express = require('express');
const app = express()
const path = require('path');
const port = 3000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/login.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/register.html"));
});
app.get("/products", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/products.html"));
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Servidor iniciado correctamente en el puerto ${port}`);
});