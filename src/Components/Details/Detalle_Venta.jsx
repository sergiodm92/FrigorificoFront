import React from "react"
import tableVentaStyle from "./tableVentaStyle.module.scss"


export default function TableVenta({venta, pagos}){
    
    function currencyFormatter({ currency, value}) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        }) 
        return formatter.format(value)
        }

        const costoPorKG = currencyFormatter({
            currency: "USD",
            value : venta.costo*1
        })
        const margenEnPesos = currencyFormatter({
            currency: "USD",
            value : venta.margen*1
        })
        const precioPorKGProm = currencyFormatter({
            currency: "USD",
            value : venta.precio_kg_prom*1
        })
        const precioUnit = currencyFormatter({
            currency: "USD",
            value : venta.precioUnitario*1
        })

        const saldoTotalEstenPesos = currencyFormatter({
        currency: "USD",
        value : venta.saldo*1
        })

        const TotalEstenPesos = currencyFormatter({
                currency: "USD",
                value : venta.total*1
        })


    return(
        <div className={tableVentaStyle.conteiner}>

            <table className="table">
            {venta.cliente?
                <tbody>
                    <tr className="table-warning">
                        <td>id</td>
                        <td className={tableVentaStyle.tdr}>{venta.id}</td>
                    </tr>
                    <tr className="table-warning">
                        <td >Fecha</td>
                        <td className={tableVentaStyle.tdr}>{(new Date(venta.fecha*1)).toLocaleDateString('es').replaceAll("/", "-")}</td>
                    </tr>
                    <tr className="table-warning">
                        <td>Cliente</td>
                        <td className={tableVentaStyle.tdr}>{venta.cliente}</td>
                    </tr>
                    <tr className="table-warning">
                        <td>Cantidad</td>
                        <td className={tableVentaStyle.tdr}>{venta.cant}</td>
                    </tr>
                    <tr className="table-warning">
                        <td>kg</td>
                        <td className={tableVentaStyle.tdr}>{venta.kg}kg</td>
                    </tr>
                    <tr className="table-warning">
                        <td>Costo/kg</td>
                        <td className={tableVentaStyle.tdr}>{costoPorKG}</td>
                    </tr>
                    <tr className="table-warning">
                        <td>Margen</td>
                        <td className={tableVentaStyle.tdr}>{margenEnPesos}</td>
                    </tr>
                    <tr className="table-warning">
                        <td>Margen %</td>
                        <td className={tableVentaStyle.tdr}>{venta.margen_porc.toFixed(2)}%</td>
                    </tr>
                    <tr className="table-warning">
                        <td>$/kg promedio</td>
                        <td className={tableVentaStyle.tdr}>{precioPorKGProm}</td>
                    </tr>
                    <tr className="table-warning">
                        <td >Total</td>
                        <td className={tableVentaStyle.tdr} colSpan="2">{TotalEstenPesos}</td>
                    </tr>
                </tbody>
                :
                <tbody>
                    <tr className="table-warning">
                        <td>id</td>
                        <td className={tableVentaStyle.tdr} colSpan="2">{venta.id}</td>
                    </tr>
                    <tr className="table-warning">
                        <td >Fecha</td>
                        <td className={tableVentaStyle.tdr} colSpan="2">{(new Date(venta.fecha*1)).toLocaleDateString('es').replaceAll("/", "-")}</td>
                    </tr>
                    <tr className="table-warning">
                        <td>Cliente</td>
                        <td className={tableVentaStyle.tdr} colSpan="2">{venta.clien}</td>
                    </tr>
                    <tr className="table-warning">
                        <td>Cantidad</td>
                        <td className={tableVentaStyle.tdr} colSpan="2">{venta.cantidad}</td>
                    </tr>
                    <tr className="table-warning">
                        <td>Precio Unitario</td>
                        <td className={tableVentaStyle.tdr} colSpan="2">{precioUnit}</td>
                    </tr>
                    <tr className="table-warning">
                        <td >Total</td>
                        <td className={tableVentaStyle.tdr} colSpan="2">{TotalEstenPesos}</td>
                    </tr>
                </tbody>}
                <tbody>
                    <tr>
                        <td className="table-dark" colSpan="3">Pagos</td>
                    </tr>
                    {pagos?.map((a,i)=>
                    <tr key={i} className="table-warning">
                    
                            <td>{(new Date(a.fecha*1)).toLocaleDateString('es').replaceAll("/", "-")}</td>
                            <td>{currencyFormatter({
                                currency: "USD",
                                value : a.monto*1
                        })}</td>
                        <td className={tableVentaStyle.tdr}>{a.formaDePago}</td>
                            
                    </tr>
                    )}
                    <tr>
                            <td>Saldo</td>
                            <td className={tableVentaStyle.tdr}>{saldoTotalEstenPesos}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

