import React, {useEffect} from "react";
import { PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { getVentaAchurasByID } from "../../Redux/Actions/Actions"
import style from "./Ventas.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import DocPDFDetalleV from "../../Components/PDFDoc/PDFDocDetalleVenta";

export default function PdfDetalleVentaAch(){
    
    const dispatch = useDispatch()
    const {id}=useParams()
    
    useEffect(() => {
            dispatch(getVentaAchurasByID(id))
        
    }, [dispatch])

    const venta = useSelector((state)=>state.VentaAchuraByID)    

    return(
        <div className={style.ConteinerVenta} id={style.asd}>
            <div className="d-none d-lg-block">
                <PDFViewer style={{width:"100%", height: "95vh"}}>
                    <DocPDFDetalleV
                        transaccion={venta}
                        transaccionName={"Venta de Achuras"}
                        person={venta.clien}
                        name={"Cliente"}
                    />
                </PDFViewer> 
            </div>
            <div className="d-lg-none" >
                <PDFDownloadLink 
                    style={{textDecoration:"none"}}
                    document={<DocPDFDetalleV
                        transaccion={venta}
                        transaccionName={"Venta de Achuras"}
                        person={venta.clien}
                        name={"Cliente"}
                    />}
                    fileName='Detalle de Venta de Achuras'
                >
                    <LargeButton
                        
                        title={"Descargar PDF"}
                    />
                </PDFDownloadLink>
            </div>
        </div>
    )
}
