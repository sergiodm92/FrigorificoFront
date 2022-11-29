import React, {useEffect} from "react";
import { PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { getComrpaByID} from "../../Redux/Actions/Actions"
import style from "./Compras.module.scss"
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import DocPDFDetalleC from "../../Components/PDFDoc/PDFDocDetalleCompra";

export default function PdfDetalleCompra(){
    
    const dispatch = useDispatch()
    const {id}=useParams()
    
    useEffect(() => {
            dispatch(getComrpaByID(id))
    }, [dispatch])

    const compra = useSelector((state)=>state.CompraByID)

    return(
        
        <div className={style.ConteinerCompras} id={style.asd}>
        {compra?
            <div>
                <div className="d-none d-lg-block">
                    <PDFViewer style={{width:"100%", height: "95vh"}}>
                        <DocPDFDetalleC
                            transaccion={compra}
                            transaccionName={"Compra"}
                            person={compra.proveedor}
                            name={"Proveedor"}
                            array={compra.grupos}
                            cant={compra.cant_total}
                        />
                    </PDFViewer> 
                </div>
                <div className="d-lg-none" >
                    <PDFDownloadLink 
                        style={{textDecoration:"none"}}
                        document={<DocPDFDetalleC
                            transaccion={compra}
                            transaccionName={"Compra"}
                            person={compra.proveedor}
                            name={"Proveedor"}
                            array={compra.grupos}
                            cant={compra.cant_total}
                        />}
                        fileName='Detalle de la Compra'
                    >
                        <LargeButton
                            
                            title={"Descargar PDF"}
                        />
                    </PDFDownloadLink>
                </div>
            </div>
        :null}
        </div>
        
    )
}
