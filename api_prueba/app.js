const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const app = express();
const data = require('./data.json')

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('welcome to my api')
})

app.get('/ventas', (req, res) => {

    res.json(data.venta)

})

app.get('/compras', (req, res) => {

    res.json(data.compra)

})

app.get('/faenas', (req, res) => {

    res.json(data.faena)

})

app.get('/proveedores', (req, res) => {

    res.json(data.proveedor)

})

app.get('/proveedores', (req, res) => {

    res.json(data.cliente)

})

app.get('/proveedores', (req, res) => {

    res.json(data.pago_faena)

})

app.get('/proveedores', (req, res) => {

    res.json(data.pago_compra)

})

app.get('/proveedores', (req, res) => {

    res.json(data.pago_venta)

})


app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));


