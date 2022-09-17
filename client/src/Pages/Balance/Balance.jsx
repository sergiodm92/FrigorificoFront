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
            <td class="table-dark" colspan="2">Stock</td>
        </tr>
        <tr>
            <td class="table-secondary">kg</td>
            <td class="table-secondary">Valor</td>
        </tr>
        <tr>
            <td class="table-secondary">Valor estimado</td>
            <td class="table-secondary">Valor</td>
        </tr>
        <tr>
            <td class="table-dark" colspan="2">Proveedores</td>
        </tr>
        <tr>
            <td class="table-secondary">Saldo pendiente</td>
            <td class="table-secondary">Valor</td>
        </tr>
        <tr>
            <td class="table-dark" colspan="2">Clientes</td>
        </tr>
        <tr>
            <td class="table-secondary">Saldo pendiente</td>
            <td class="table-secondary">Valor</td>
        </tr>
        <tr>
            <td class="table-dark" colspan="2">Faena</td>
        </tr>
        <tr>
            <td class="table-secondary">Saldo pendiente</td>
            <td class="table-secondary">Valor</td>
        </tr>
    
        <tr>
            <td class="table-dark" colspan="2">General</td>
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