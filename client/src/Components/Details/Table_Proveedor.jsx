import React from "react";
import tableVentaStyle from "./tableVentaStyle.module.scss"



export default function Table_Proveedor({ProveedorById}){




    return(
        <div className={tableVentaStyle.conteiner}>
        <table class="table">
            <tbody>
                <tr>
                    <td>Teléfono</td>
                    <td>{ProveedorById.telefono}</td>
                </tr>
                <tr>
                    <td>e-mail</td>
                    <td>{ProveedorById.email}</td>
                </tr>
                <tr>
                    <td>Dirección</td>
                    <td>{ProveedorById.direccion}</td>
                </tr>
            </tbody>
        </table>

        </div>
    )
}


