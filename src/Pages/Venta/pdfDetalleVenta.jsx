import React, {useEffect} from "react";
import { PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { getVentaByID } from "../../Redux/Actions/Actions"
import style from "./Ventas.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import DocPDFDetalleV from "../../Components/PDFDoc/PDFDocDetalleVenta";

export default function PdfDetalleVenta(){
    
    const dispatch = useDispatch()
    const {id}=useParams()
    
    useEffect(() => {
            dispatch(getVentaByID(id))
        
    }, [dispatch])

    const venta = useSelector((state)=>state.VentaByID)    

    return(
        <div className={style.ConteinerVenta} id={style.asd}>
            <div className="d-none d-lg-block">
                <PDFViewer style={{width:"100%", height: "95vh"}}>
                    <DocPDFDetalleV
                        transaccion={venta}
                        transaccionName={"Venta de Carne"}
                        person={venta.cliente}
                        name={"Cliente"}
                        array={venta.detalle}
                    />
                </PDFViewer> 
            </div>
            <div className="d-lg-none" >
                <PDFDownloadLink 
                    style={{textDecoration:"none"}}
                    document={<DocPDFDetalleV
                        transaccion={venta}
                        transaccionName={"Venta de Carne"}
                        person={venta.cliente}
                        name={"Cliente"}
                        array={venta.detalle}
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
