import React from "react";
import tableVentaStyle from "./tableVentaStyle.module.scss"
const data = require("./data.json")


export default function Table_Cliente({name}){

const objClient=data.Cliente.find((a)=>a.Nombre==name)


    return(
        <div className={tableVentaStyle.conteiner}>
        <table class="table">
            <tbody>
                <tr>
                    <td>Teléfono</td>
                    <td>{objClient.Telefono}</td>
                </tr>
                <tr>
                    <td>e-mail</td>
                    <td>{objClient.Email}</td>
                </tr>
                <tr>
                    <td>Dirección</td>
                    <td>{objClient.Direccion}</td>
                </tr>
            </tbody>
        </table>

        </div>
    )
}




