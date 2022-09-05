const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const app = express();
const data = require('./data.json')

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('welcome to my api')
})
//todas las ventas
app.get('/ventas', (req, res) => {

    res.json(data.venta)

})
//todas las compras
app.get('/compras', (req, res) => {

    res.json(data.compra)

})

//faenas con su numero de tropa

app.get('/faenas', (req, res) => {

    res.json(data.faena)

})

//_todos los datos de  proveedores 
app.get('/proveedores', (req, res) => {

    res.json(data.proveedor)

})

// datos de clientes
app.get('/clientes', (req, res) => {

    res.json(data.cliente)

})
// pago de una faeneada con fecha y monto con id de faena
app.get('/pago_faena', (req, res) => {

    res.json(data.pago_faena)

})

// pago de una compra con id de compra
app.get('/pago_compra', (req, res) => {

    res.json(data.pago_compra)

})

// pago de una venta con id de venta
app.get('/pago_venta', (req, res) => {

    res.json(data.pago_venta)

})


app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));


