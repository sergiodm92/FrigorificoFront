import React, {useEffect} from "react";
import { PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import {getPagosFaenasByFrigorifico } from "../../Redux/Actions/Actions"
import DocPDFFaena from "../../Components/PDFDoc/PDFDocF";
import style from './Faenas.module.scss'
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";

export default function PdfDetallePagosFrigorifico(){
    
    const dispatch = useDispatch()
    const {nombre}=useParams()

    useEffect(() => {
        dispatch(getPagosFaenasByFrigorifico(nombre))
    }, [dispatch])

    const pagos = useSelector((state)=>state.pagosByFrigorifico)

    
    return(
        <div className={style.ConteinerFaenas} id={style.ConteinerCenterPDF}>
            <div className="d-none d-lg-block">
                <PDFViewer style={{width:"100%", height: "95vh"}}>
                    <DocPDFFaena
                        pagos={pagos}
                        nombre={nombre}
                    />
                </PDFViewer>
            </div>
            <div className="d-lg-none" >
                <PDFDownloadLink 
                    style={{textDecoration:"none"}}
                    document={<DocPDFFaena
                                pagos={pagos}
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