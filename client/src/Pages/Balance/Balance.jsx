import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getAllClientes, getAllFaenas, getAllProveedores, getAllReses, getAllVentas} from "../../Redux/Actions/Actions.js"
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar"
import styleBalance from "./Balance.module.scss"
import Marca from "../../Components/Marca/Marca.jsx";



export default function Balance(){

const dispatch = useDispatch()

    useEffect(() => {
    dispatch(getAllClientes())
    dispatch(getAllProveedores())
    dispatch(getAllFaenas())
    dispatch(getAllReses())
    dispatch(getAllVentas())
    }, [dispatch])


    const Stock = useSelector((state)=>state.AllResesStockTrue)
    console.log(Stock)
    const Clientes = useSelector((state)=>state.AllClientes)
    const Proveedores = useSelector((state)=>state.AllProveedores)
    const Faenas = useSelector((state)=>state.AllFaenas)
    const Ventas = useSelector((state)=>state.AllVentas)
    const VentasUltimos30Dias = useSelector((state)=>state.VentasUltimos30Dias)

    let [kgStock,setKgStock] = useState(0)
    let [totalEst,setTotalEst] = useState(0)
    let [saldoTotalClientes,setSaldoTotalClientes] = useState(0)
    let [saldoTotalProveedores,setSaldoTotalProveedores] = useState(0)
    let [saldoTotalFaena,setSaldoTotalFaena] = useState(0)
    let [gananciaMensual,setGananciaMensual] = useState(0)
    let [saldoPagar,setSaldoPagar] = useState(0)

    Stock.map((a)=>{
                    kgStock+=a.kg 
                    totalEst+=a.precio_kg*a.kg*1.07
        })
    Clientes.map((a)=>saldoTotalClientes+=a.saldo)
    Proveedores.map((a)=>saldoTotalProveedores+=a.saldo)
    Faenas.map((a)=>saldoTotalFaena+=a.saldo)
    if(VentasUltimos30Dias.length)VentasUltimos30Dias.map(a=>gananciaMensual+=a.margen)
    saldoPagar=saldoTotalFaena+saldoTotalProveedores
    console.log(Proveedores)
    function currencyFormatter({ currency, value}) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        }) 
        return formatter.format(value)
        }

    const totalEstenPesos = currencyFormatter({
        currency: "USD",
        value : totalEst
        })
    const gananciaMensualEnPesos = currencyFormatter({
        currency: "USD",
        value : gananciaMensual
        })
    const saldoFaenaPendienteEnPesos = currencyFormatter({
        currency: "USD",
        value : saldoTotalFaena
        })
    const saldoProvPendienteEnPesos = currencyFormatter({
        currency: "USD",
        value : saldoTotalProveedores
        })
    const saldoClientePendienteEnPesos = currencyFormatter({
        currency: "USD",
        value : saldoTotalClientes
        })
    const saldoPagarEnPesos = currencyFormatter({
        currency: "USD",
        value : saldoPagar
        })

    return(
        <div className={styleBalance.ConteinerBalance}>
                <NavBar
                title="Balance"    
                />
                <div className={styleBalance.tableBalance}>
                    <table class="table">
                        <tbody>
                            <tr>
                                <td class="table-warning">Ganancia mensual</td>
                                <td class="table-warning">{gananciaMensualEnPesos}</td>
                            </tr>
                            <tr>
                                <td class="table-dark" colspan="2">Stock</td>
                            </tr>
                            <tr>
                                <td class="table-warning">Cantidad</td>
                                <td class="table-warning">{kgStock} kg</td>
                            </tr>
                            <tr>
                                <td class="table-warning">Valor estimado</td>
                                <td class="table-warning">{totalEstenPesos}</td>
                            </tr>
                            <tr>
                                <td class="table-dark" colspan="2">Proveedores</td>
                            </tr>
                            <tr>
                                <td class="table-warning">Saldo pendiente</td>
                                <td class="table-warning">{saldoProvPendienteEnPesos}</td>
                            </tr>
                            <tr>
                                <td class="table-dark" colspan="2">Clientes</td>
                            </tr>
                            <tr>
                                <td class="table-warning">Saldo pendiente</td>
                                <td class="table-warning">{saldoClientePendienteEnPesos}</td>
                            </tr>
                            <tr>
                                <td class="table-dark" colspan="2">Faena</td>
                            </tr>
                            <tr>
                                <td class="table-warning">Saldo pendiente</td>
                                <td class="table-warning">{saldoFaenaPendienteEnPesos}</td>
                            </tr>
                        
                            <tr>
                                <td class="table-dark" colspan="2">General</td>
                            </tr>
                            <tr>
                                <td class="table-success">Saldo total a cobrar</td>
                                <td class="table-success">{saldoClientePendienteEnPesos}</td>
                            </tr>
                            <tr>
                                <td class="table-danger">Saldo total a pagar</td>
                                <td class="table-danger">{saldoPagarEnPesos}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            <div className={styleBalance.marca}>
                <Marca/>
            </div>
        </div>
    )
}