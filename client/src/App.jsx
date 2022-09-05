import React from 'react';
import Balance from '../src/Pages/Balance/Balance.jsx'
import Compras from '../src/Pages/Compra/Compras.jsx'
import Detalle_Compra from '../src/Pages/Compra/Detalle_compra'
import Form_Compra from '../src/Pages/Compra/Form_compra'
import Historial_Compras from '../src/Pages/Compra/Historial_Compra'
import Clientes from '../src/Pages/Clientes/Clientes.jsx'
import Detalle_Cliente from '../src/Pages/Clientes/Detalle_Cliente'
import Historial_Ventas_Cliente from '../src/Pages/Clientes/Historial_Ventas_Cliente'
import Form_Cliente from '../src/Pages/Clientes/Form_Cliente'
import Detalle_Faena from '../src/Pages/Faenas/Detalle_Faena'
import Faenas from '../src/Pages/Faenas/Faenas.jsx'
import Form_Faena from '../src/Pages/Faenas/Form_Faena.jsx'
import Form_Pago_Faena from '../src/Pages/Faenas/Form_Pago_Faena.jsx'
import Historial_Faena from '../src/Pages/Faenas/Hitorial_Faena'
import Home from '../src/Pages/Home/Home.jsx'
import Reestablecer_Login from '../src/Pages/Login/Reestablecer_Login.jsx'
import Login from '../src/Pages/Login/Login.jsx'
import Detalle_Proveedor from '../src/Pages/Proveedores/Detalle_Proveedor'
import Form_Proveedores from '../src/Pages/Proveedores/Form_Proveedores.jsx'
import Historial_Compra_Prov from '../src/Pages/Proveedores/Historial_Compra_Prov.jsx'
import Proveedores from '../src/Pages/Proveedores/Proveedores.jsx'
import Detalle_Stock_Tropa from '../src/Pages/Stock/Detalle_Stock_Tropa.jsx'
import Stock from '../src/Pages/Stock/Stock.jsx'
import Ventas from '../src/Pages/Venta/Ventas.jsx'
import Detalle_Reses_Venta from '../src/Pages/Venta/Detalle_Reses_Venta.jsx'
import Detalle_Venta from '../src/Pages/Venta/Detalle_venta'
import Form_Pago_Venta from '../src/Pages/Venta/Form_Pago_Venta.jsx'
import Form_Venta from '../src/Pages/Venta/Form_Venta.jsx'

import { Route, Routes } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Routes>
    <Route exact path="/" element={<Login />} />
    <Route exact path="/Balance" element={<Balance />} />
    <Route exact path="/Clientes" element={<Clientes />} />
    <Route exact path="/Compras" element={<Compras />} />
    <Route exact path="/Detalle_Compra" element={<Detalle_Compra />} />
    <Route exact path="/Form_Compra" element={<Form_Compra />} />
    <Route exact path="/Historial_Compras" element={<Historial_Compras />} />
    <Route exact path="/Detalle_Cliente" element={<Detalle_Cliente />} />
    <Route exact path="/Form_Cliente" element={<Form_Cliente />} />
    <Route exact path="/Historial_Ventas_Cliente" element={<Historial_Ventas_Cliente />} />
    <Route exact path="/Detalle_Faena" element={<Detalle_Faena />} />
    <Route exact path="/Faenas" element={<Faenas />} />
    <Route exact path="/Detalle_Faena" element={<Detalle_Faena />} />
    <Route exact path="/Form_Faena" element={<Form_Faena />} />
    <Route exact path="/Form_Pago_Faena" element={<Form_Pago_Faena />} />
    <Route exact path="/Historial_Faena" element={<Historial_Faena />} />
    <Route exact path="/Home" element={<Home />} />
   
    <Route exact path="/Reestablecer_Login" element={<Reestablecer_Login />} />
    <Route exact path="/Detalle_Proveedor" element={<Detalle_Proveedor />} />
    <Route exact path="/Form_Proveedores" element={<Form_Proveedores />} />
    <Route exact path="/Historial_Compra_Prov" element={<Historial_Compra_Prov />} />
    <Route exact path="/Proveedores" element={<Proveedores />} />
    <Route exact path="/Detalle_Stock_Tropa" element={<Detalle_Stock_Tropa />} />
    <Route exact path="/Stock" element={<Stock />} />
    <Route exact path="/Ventas" element={<Ventas />} />
    <Route exact path="/Detalle_Reses_Venta" element={<Detalle_Reses_Venta />} />
    <Route exact path="/Detalle_Venta" element={<Detalle_Venta />} />
    <Route exact path="/Form_Pago_Venta" element={<Form_Pago_Venta />} />
    <Route exact path="/Form_Venta" element={<Form_Venta />} />
    </Routes>
  );
}

export default App;
