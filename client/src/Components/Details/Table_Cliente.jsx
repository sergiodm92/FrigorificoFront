import React from "react";
import tableVentaStyle from "./tableVentaStyle.module.scss"


export default function Table_Cliente({email,telefono,direccion}){




    return(
        <div className={tableVentaStyle.conteiner}>
        <table class="table">
            <tbody>
                <tr className="table-warning">
                    <td>Teléfono</td>
                    <td className={tableVentaStyle.tdr}>{telefono}</td>
                </tr>
                <tr className="table-warning">
                    <td>e-mail</td>
                    <td className={tableVentaStyle.tdr}>{email}</td>
                </tr>
                <tr className="table-warning">
                    <td>Dirección</td>
                    <td className={tableVentaStyle.tdr}>{direccion}</td>
                </tr>
            </tbody>
        </table>

        </div>
    )
}




