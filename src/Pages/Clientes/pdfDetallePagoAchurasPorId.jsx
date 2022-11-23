import React, {useEffect} from "react";
import {PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { getPagosVentaAchurasByCliente, getVentaAchurasByID} from "../../Redux/Actions/Actions"
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import style from "./Clientes.module.scss";
import DocPDFbyidVA from "../../Components/PDFDoc/PDFByidVA";

export default function PdfDetallePagoPorIdCliente(){
    
    const dispatch = useDispatch()
    const {nombre, id}=useParams()

    useEffect(() => {
        dispatch(getPagosVentaAchurasByCliente(nombre))
    }, [nombre])

    let pago = []
    let pagosAnteriores = []

    const pagos = useSelector((state)=>state.pagosAchurasByCliente)
    pago = pagos!==[]?pagos.filter(a=>a.id==id):[]
    pagosAnteriores= pagos!==[]?pagos.filter(a=>(a.ventaID==pago[0].ventaID && a!==pago[0] )):[]
    
    useEffect(() => {
        if(pago.length!==0)dispatch(getVentaAchurasByID(pago[0].ventaID))
    },[pagos])

    let venta = useSelector((state)=>state.VentaAchuraByID)

    
    return( 
        <div className={style.conteinerAll} id={style.asd}>
            <div className="d-none d-lg-block">
                <PDFViewer style={{width:"100%", height: "95vh"}} >
                    <DocPDFbyidVA
                        pagosAnteriores={pagosAnteriores}
                        pago={pago}
                        venta={venta}
                        nombre={nombre}
                    />
                </PDFViewer>
            </div>
            <div className="d-lg-none" >
                <PDFDownloadLink 
                    style={{textDecoration:"none"}}
                    document={<DocPDFbyidVA
                        pagosAnteriores={pagosAnteriores}
                        pago={pago}
                        venta={venta}
                        nombre={nombre}
                    />}
                    fileName='Comprobante de Pago'
                >
                    <LargeButton
                        
                        title={"Descargar PDF"}
                    />
                </PDFDownloadLink>
            </div>
        </div>       
                
    )
}