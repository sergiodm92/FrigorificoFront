import React, {useEffect} from "react";
import {PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { getFaenaById, getPagosFaenasByFrigorifico } from "../../Redux/Actions/Actions"
import DocPDFByidF from "../../Components/PDFDoc/PDFByidF";
import style from './Faenadetail.module.scss'
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";

export default function PdfDetallePagoPorIdFrigorifico(){
    
    const dispatch = useDispatch()
    const {nombre, id}=useParams()

    useEffect(() => {
        dispatch(getPagosFaenasByFrigorifico(nombre))
    }, [nombre])

    let pago = []
    let pagosAnteriores = []

    const pagos = useSelector((state)=>state.pagosByFrigorifico)
    pago = pagos!==[]?pagos.filter(a=>a.id==id):[]
    pagosAnteriores= pagos!==[]?pagos.filter(a=>(a.faenaID==pago[0].faenaID && a!==pago[0] )):[]

    useEffect(() => {
        if(pago.length!==0)dispatch(getFaenaById(pago[0].faenaID))
    },[pagos])

    const faena = useSelector((state)=>state.FaenaById)

    return(     
        <div className={style.wallpaper2}>
            <div className="d-none d-lg-block">
            <PDFViewer style={{width:"100%", height: "95vh"}} >
                <DocPDFByidF
                    pagosAnteriores={pagosAnteriores}
                    pago={pago}
                    faena={faena}
                    nombre={nombre}
                />
            </PDFViewer>   
            </div>
            <div className="d-lg-none" >
                <PDFDownloadLink 
                    style={{textDecoration:"none"}}
                    document={<DocPDFByidF
                    pagosAnteriores={pagosAnteriores}
                    pago={pago}
                    faena={faena}
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