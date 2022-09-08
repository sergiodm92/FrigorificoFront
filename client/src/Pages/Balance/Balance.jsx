import React from "react"
import NavBar from "../../Components/Navbar/Navbar";

export default function Balance(){

    return(
        <div>
        <NavBar
        title="Balance"    
        />
        <table class="table">
        <tbody>
        <tr>
            <td>Ganancia mensual</td>
            <td>Valor</td>
        </tr>
        <tr>
            <td>Rentabilidad promedio</td>
            <td>Valor</td>
        </tr>
        <tr>
            <td>Stock</td>
        </tr>
        <tr>
            <td>kg</td>
            <td>Valor</td>
        </tr>
        <tr>
            <td>Valor estimado</td>
            <td>Valor</td>
        </tr>
        <tr>
            <td>Proveedores</td>
        </tr>
        <tr>
            <td>Saldo pendiente</td>
            <td>Valor</td>
        </tr>
        <tr>
            <td>Clientes</td>
        </tr>
        <tr>
            <td>Saldo pendiente</td>
            <td>Valor</td>
        </tr>
        <tr>
            <td>Faena</td>
        </tr>
        <tr>
            <td>Saldo pendiente</td>
            <td>Valor</td>
        </tr>
    
        <tr>
            <td>General</td>
        </tr>
        <tr>
            <td>Saldo total a cobrar</td>
            <td>Valor</td>
        </tr>
        <tr>
            <td>Saldo total a pagar</td>
            <td>Valor</td>
        </tr>
        <tr>
            <td>kg por pagar</td>
            <td>Valor</td>
        </tr>
        <tr>
            <td>kg por cobrar</td>
            <td>Valor</td>
        </tr>







        </tbody>

        </table>




        </div>

    )
}