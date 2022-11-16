import React from "react"
import { useDispatch } from "react-redux"
import tableVentaStyle from "./tableVentaStyle.module.scss"


export default function TableVenta({venta, pagos}){
        const array=[]

    for(const [key,value] of Object.entries(venta)){ 
        if(key!=="detalle" && key!=="saldo" && key!=="total")array.push({key,value})   
    }

    function currencyFormatter({ currency, value}) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        }) 
        return formatter.format(value)
        }

        const saldoTotalEstenPesos = currencyFormatter({
        currency: "USD",
        value : venta.saldo
        })

        const TotalEstenPesos = currencyFormatter({
                currency: "USD",
                value : venta.total
        })


    return(
        <div className={tableVentaStyle.conteiner}>

            <table className="table">

            <tbody>
            {array.map((e,i) => {
                    return(

                    <tr key={i} className={e.key.includes("Margen")?"table-secondary":"table-warning"}>

                        <td>{e.key.includes("_")?(e.key.replace("_"," ").includes("_")?e.key.replace("_"," ").replace("_"," "):e.key.replace("_"," ")):e.key }</td>
                        <td className={tableVentaStyle.columnRight}>{e.key=="fecha"?(new Date(e.value*1)).toLocaleDateString('es').replaceAll("/", "-"):e.key=="kg_total"?e.value.toFixed(2):e.key=="margen_porc"?e.value.toFixed(2)+"%":
                        e.key!=="id" && e.key!=="fecha" && e.key!=="cliente" && e.key!=="clien"?
                        currencyFormatter({
                                currency: "USD",
                                value : e.value
                        }):e.value}</td>            
                    </tr>
                    )
            })
            }
                    <tr className="table-warning">
                            <td >Total</td>
                            <td className={tableVentaStyle.columnRight}>{TotalEstenPesos}</td>
                       
                    </tr>
                    <tr>
                            <td className="table-dark" colSpan="2">Pagos</td>
                       
                    </tr>
                    {pagos?.map((a,i)=>
                    <tr key={i}>
                    
                            <td>{(new Date(a.fecha*1)).toLocaleDateString('es').replaceAll("/", "-")}</td>
                            <td>{currencyFormatter({
                                currency: "USD",
                                value : a.monto
                        })}</td>
                            
                    </tr>
                    )}
                    <tr>
                            <td>Saldo</td>
                            <td>{saldoTotalEstenPesos}</td>
                    </tr>

                    
            </tbody>
        </table>


        </div>
    )
}
