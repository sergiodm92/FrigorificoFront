import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPagosVentaByID } from "../../Redux/Actions/Actions"
import tableVentaStyle from "./tableVentaStyle.module.scss"



export default function TableVenta({venta, pagos}){
        const dispatch = useDispatch()
        const array=[]
        // useEffect(() => {
        //         if(venta)getPagosVentaByID(venta.id)
        // }, [dispatch])
        
        // let pagosByVentaID = useSelector((state)=>state.pagosByVentaID)
        
        

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
                        <td className={tableVentaStyle.columnRight}>{e.key=="kg_total"?e.value.toFixed(2):e.key=="margen_porc"?e.value.toFixed(2)+"%":
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
                            <td className="table-dark" colspan="2">Pagos</td>
                       
                    </tr>
                    {pagos?.map((a)=>
                    <tr>
                    
                            <td>{a.fecha}</td>
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
