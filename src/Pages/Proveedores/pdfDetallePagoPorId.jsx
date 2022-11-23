import React, {useEffect} from "react";
import {PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { getComrpaByID, getPagosComprasByProveedor} from "../../Redux/Actions/Actions"
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import style from './Proveedores.module.scss'
import DocPDFbyidC from "../../Components/PDFDoc/PDFByidC";

export default function PdfDetallePagoPorIdProveedor(){
    
    const dispatch = useDispatch()
    const {nombre, id}=useParams()

    useEffect(() => {
        dispatch(getPagosComprasByProveedor(nombre))
    }, [nombre])

    let pago = []
    let pagosAnteriores = []

    const pagos = useSelector((state)=>state.pagosByProveedor)
    pago = pagos!==[]?pagos.filter(a=>a.id==id):[]
    pagosAnteriores= pagos!==[]?pagos.filter(a=>(a.compraID==pago[0].compraID && a!==pago[0] )):[]
    
    useEffect(() => {
        if(pago.length!==0)dispatch(getComrpaByID(pago[0].compraID))
    },[pagos])

    const compra = useSelector((state)=>state.CompraByID)

    return( 
        <div className={style.ConteinerProveedores} id={style.pdfCenter}>
            <div className="d-none d-lg-block">
                <PDFViewer style={{width:"100%", height: "95vh"}} >
                    <DocPDFbyidC
                        pagosAnteriores={pagosAnteriores}
                        pago={pago}
                        compra={compra}
                        nombre={nombre}
                        array={compra.grupos}
                    />
                </PDFViewer>
            </div>
            <div className="d-lg-none" >
                <PDFDownloadLink 
                    style={{textDecoration:"none"}}
                    document={<DocPDFbyidC
                        pagosAnteriores={pagosAnteriores}
                        pago={pago}
                        compra={compra}
                        nombre={nombre}
                        array={compra.grupos}
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