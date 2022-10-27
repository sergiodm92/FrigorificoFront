import Style from "./tableVentaStyle.module.scss"
import React from "react";
import moment from 'moment'
// salida

export default function Table_Det_Caja({pagos, total}){

    //ORDENAR POR FECHA
pagos.sort((a, b) => moment(a.fecha, "DD-MM-YYYY").unix() - moment(b.fecha, "DD-MM-YYYY").unix());



    function currencyFormatter({ currency, value}) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        }) 
        return formatter.format(value)
        }

    return(
        <div className={Style.conteinerCaja}>
            <table className="table">
                <thead className={"table-dark"}>
                    <tr>
                        <th>Fecha</th>
                        <th>Concepto</th>
                        <th className={Style.columnRight}>ID</th>
                        <th>Forma de Pago</th>
                        <th>Entrada</th>
                        <th>Salida</th>                  
                    </tr>
                </thead>
                <tbody>
                    {pagos.map((e,j) => {
                        return(
                            
                        e.ventaID?
                        <tr key={j} className={"table-success"}>
                            <td>{e.fecha}</td>
                            <td>{e.concepto?e.concepto:e.clien?e.clien:e.cliente?e.cliente:null}</td>
                            <td className={Style.columnRight}>{e.cliente?e.ventaID+"-V":e.clien?e.ventaID+"-VAch":e.ventaID+"-IE"}</td>
                            <td>{e.formaDePago}</td>
                            <td>{currencyFormatter({
                                    currency: "USD",
                                    value : e.monto
                                })}
                            </td>
                            <td>{null}</td>
                        </tr>
                        :
                        <tr key={j} className={"table-danger"}>
                            <td>{e.fecha}</td>
                            {e.concepto?
                                <td>{e.concepto}</td>
                                :
                                <td>Pago a {e.proveedor?e.proveedor:e.frigorifico?e.frigorifico:null}</td>
                            }
                            <td className={Style.columnRight}>{e.compraID?e.compraID+"-C":e.faenaID?e.faenaID+"-F":e.id?e.id:null}</td>
                            <td>{e.formaDePago}</td>
                            <td>{null}</td>
                            <td>{currencyFormatter({
                                    currency: "USD",
                                    value : e.monto
                                })}
                            </td>                            
                        </tr>
                        
                    
                    
                    )})}
                    </tbody>

                <tbody>
                    <tr>
                        <td colSpan="3">Total en Caja</td>
                        <td colSpan="2" className={Style.columnRight}>{currencyFormatter({
                                    currency: "USD",
                                    value : total
                                })}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

}








