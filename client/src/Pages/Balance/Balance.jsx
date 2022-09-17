import React from "react"
import NavBar from "../../Components/Navbar/Navbar";
import styleBalance from "./Balance.module.scss"
export default function Balance(){

    return(
        <div className={styleBalance.ConteinerBalance}>
        <NavBar
        title="Balance"    
        />
        <div className={styleBalance.tableBalance}>
        <table class="table">
        <tbody>
        <tr>
            <td class="table-success">Ganancia mensual</td>
            <td class="table-success">Valor</td>
        </tr>
        <tr>
            <td class="table-success">Rentabilidad promedio</td>
            <td class="table-success">Valor</td>
        </tr>
        <tr>
            <td class="table-dark">Stock</td>
            <td class="table-dark"></td>
        </tr>
        <tr>
            <td class="table-secondary">kg</td>
            <td class="table-secondary">Valor</td>
        </tr>
        <tr>
            <td>Valor estimado</td>
            <td>Valor</td>
        </tr>
        <tr>
            <td class="table-dark">Proveedores</td>
            <td class="table-dark"></td>
        </tr>
        <tr>
            <td class="table-secondary">Saldo pendiente</td>
            <td class="table-secondary">Valor</td>
        </tr>
        <tr>
            <td class="table-dark">Clientes</td>
            <td class="table-dark"></td>
        </tr>
        <tr>
            <td class="table-secondary">Saldo pendiente</td>
            <td class="table-secondary">Valor</td>
        </tr>
        <tr>
            <td class="table-dark">Faena</td>
            <td class="table-dark"></td>
        </tr>
        <tr>
            <td class="table-secondary">Saldo pendiente</td>
            <td class="table-secondary">Valor</td>
        </tr>
    
        <tr>
            <td class="table-dark">General</td>
            <td class="table-dark"></td>
        </tr>
        <tr>
            <td class="table-secondary">Saldo total a cobrar</td>
            <td class="table-secondary">Valor</td>
        </tr>
        <tr>
            <td class="table-secondary">Saldo total a pagar</td>
            <td class="table-secondary">Valor</td>
        </tr>
        <tr>
            <td class="table-secondary">kg por pagar</td>
            <td class="table-secondary">Valor</td>
        </tr>
        <tr>
            <td class="table-secondary">kg por cobrar</td>
            <td class="table-secondary">Valor</td>
        </tr>







        </tbody>

        </table>
        </div>




        </div>

    )
}