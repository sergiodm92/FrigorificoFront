import React from 'react';
import Balance from '../src/Pages/Balance/Balance.jsx';
import Compras from '../src/Pages/Compra/Compras.jsx';
import Detalle_Compra from '../src/Pages/Compra/Detalle_compra';
import Form_Compra from '../src/Pages/Compra/Form_compra';
import Historial_Compras from '../src/Pages/Compra/Historial_Compra';
import Clientes from '../src/Pages/Clientes/Clientes.jsx';
import Detalle_Cliente from '../src/Pages/Clientes/Detalle_Cliente';
import Historial_Ventas_Cliente from '../src/Pages/Clientes/Historial_Ventas_Cliente';
import Form_Cliente from '../src/Pages/Clientes/Form_Cliente';
import Detalle_Faena from '../src/Pages/Faenas/Detalle_Faena';
import Faenas from '../src/Pages/Faenas/Faenas.jsx';
import Form_Faena from '../src/Pages/Faenas/Form_Faena.jsx';
import Form_Pago_Faena from '../src/Pages/FormsPagos/Form_pago_faena';
import Form_Pago_Compra from '../src/Pages/FormsPagos/Form_pago_compra';
import Historial_Faena from '../src/Pages/Faenas/Hitorial_Faena';
import Home from '../src/Pages/Home/Home.jsx';
import Reestablecer_Login from '../src/Pages/Login/Reestablecer_Login.jsx';
import Login from '../src/Pages/Login/Login.jsx';
import Detalle_Proveedor from '../src/Pages/Proveedores/Detalle_Proveedor';
import Form_Proveedor from '../src/Pages/Proveedores/Form_Proveedor.jsx';
import Historial_Compras_Proveedor from '../src/Pages/Proveedores/Historial_Compra_Prov.jsx';
import Proveedores from '../src/Pages/Proveedores/Proveedores.jsx';
import Detalle_Stock_Tropa from '../src/Pages/Stock/Detalle_Stock_Tropa.jsx';
import Stock from '../src/Pages/Stock/Stock.jsx';
import Ventas from '../src/Pages/Venta/Ventas.jsx';
import Historial_Ventas from './Pages/Venta/Historial_Ventas.jsx';
import Detalle_Reses_Venta from '../src/Pages/Venta/Detalle_Reses_Venta.jsx';
import Detalle_Venta from '../src/Pages/Venta/Detalle_venta'
import Form_Pago_Venta from '../src/Pages/FormsPagos/Form_pago_venta';
import NoAccess from '../src/Pages/NoAcces/NoAcces'
import LogOut from './Pages/LogOut/LogOut.jsx';
import Form_Venta from '../src/Pages/Venta/Form_Venta.jsx';
import Form_Venta_Achuras from './Pages/Venta/Form_Venta_Achuras.jsx';
import Nueva_Venta from './Pages/Venta/Nueva_Venta.jsx';
import Detalle_Pagos_Clientes from './Pages/Clientes/Detalle_Pagos_Cliente.jsx';
import Detalle_Pagos_Proveedor from './Pages/Proveedores/Detalle_Pagos_Proveedor.jsx';
import Detalle_Pagos_Frigorifico from './Pages/Faenas/Detalle_Pagos_Frigorifico.jsx';
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useEffect } from 'react';
import {login_state} from './Redux/Actions/Actions.js'
import './App.css';


function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(login_state())
  }, [])
  
  let state_login = useSelector((state)=>state.login_State)


  return (
    <Routes>
    <Route exact path="/" element={state_login?<LogOut/>:<Login/>} />
    <Route exact path="/Balance" element={state_login?<Balance/>:<NoAccess/>} />
    <Route exact path="/Clientes" element={state_login?<Clientes />:<NoAccess/>} />
    <Route exact path="/Compras" element={state_login?<Compras />:<NoAccess/>} />
    <Route exact path="/Compras/:id" element={state_login?<Detalle_Compra />:<NoAccess/>} />
    <Route exact path="/Form_Compra" element={state_login?<Form_Compra />:<NoAccess/>} />
    <Route exact path="/Historial_Compras" element={state_login?<Historial_Compras />:<NoAccess/>} />
    <Route exact path="/Detalle_Cliente/:id" element={state_login?<Detalle_Cliente />:<NoAccess/>} />
    <Route exact path="/Form_Cliente" element={state_login?<Form_Cliente />:<NoAccess/>} />
    <Route exact path="/Historial_Ventas_Cliente/:id" element={state_login?<Historial_Ventas_Cliente />:<NoAccess/>} />
    <Route exact path="/Faenas/:id" element={state_login?<Detalle_Faena />:<NoAccess/>} />
    <Route exact path="/Faenas" element={state_login?<Faenas />:<NoAccess/>} />
    <Route exact path="/Form_Faena" element={state_login?<Form_Faena />:<NoAccess/>} />
    <Route exact path="/Form_Pago_Faena/:id" element={state_login?<Form_Pago_Faena />:<NoAccess/>} />
    <Route exact path="/Historial_Faena" element={state_login?<Historial_Faena />:<NoAccess/>} />
    <Route exact path="/Home" element={state_login?<Home />:<NoAccess/>} />
    <Route exact path="/Reestablecer_Login" element={<Reestablecer_Login />} />
    <Route exact path="/Detalle_Proveedor/:id" element={state_login?<Detalle_Proveedor />:<NoAccess/>} />
    <Route exact path="/Form_Proveedor" element={state_login?<Form_Proveedor />:<NoAccess/>} />
    <Route exact path="/Historial_Compras_Proveedor/:name" element={state_login?<Historial_Compras_Proveedor />:<NoAccess/>} />
    <Route exact path="/Proveedores" element={state_login?<Proveedores />:<NoAccess/>} />
    <Route exact path="/Detalle_Stock_Tropa/:index" element={state_login?<Detalle_Stock_Tropa />:<NoAccess/>} />
    <Route exact path="/Stock" element={state_login?<Stock />:<NoAccess/>} />
    <Route exact path="/Ventas" element={state_login?<Ventas />:<NoAccess/>} />
    <Route exact path="/Historial_Ventas" element={state_login?<Historial_Ventas />:<NoAccess/>} />
    <Route exact path="/Detalle_Reses_Venta/:id" element={state_login?<Detalle_Reses_Venta />:<NoAccess/>} />
    <Route exact path="/Ventas/:id" element={state_login?<Detalle_Venta />:<NoAccess/>} />
    <Route exact path="/Form_Pago_Venta/:id" element={state_login?<Form_Pago_Venta />:<NoAccess/>} />
    <Route exact path="/Form_Pago_Compra/:id" element={state_login?<Form_Pago_Compra />:<NoAccess/>} />
    <Route exact path="/Form_Venta" element={state_login?<Form_Venta />:<NoAccess/> }/>
    <Route exact path="/Form_Venta_Achuras" element={state_login?<Form_Venta_Achuras />:<NoAccess/> }/>
    <Route exact path="/Nueva_Venta" element={state_login?<Nueva_Venta />:<NoAccess/>} />
    <Route exact path="/Detalle_Pagos_Clientes/:nombre" element={state_login?<Detalle_Pagos_Clientes />:<NoAccess/>} />
    <Route exact path="/Detalle_Pagos_Proveedor/:nombre" element={state_login?<Detalle_Pagos_Proveedor />:<NoAccess/>} />
    <Route exact path="/Detalle_Pagos_Frigorifico/:nombre" element={state_login?<Detalle_Pagos_Frigorifico />:<NoAccess/>} />
    </Routes>
  
  );
}

export default App;
