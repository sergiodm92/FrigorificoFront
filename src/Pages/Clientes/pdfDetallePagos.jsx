import React, {useEffect} from "react";
import { PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { getClienteByName, getPagosVentaAchurasByCliente, getPagosVentasByCliente } from "../../Redux/Actions/Actions"
import DocPDF from "../../Components/PDFDoc/PDFDoc";
import style from './Form_Cliente.module.scss';
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";

export default function PdfDetallePagosClientes(){
    
    const dispatch = useDispatch()
    const {nombre}=useParams()

    useEffect(() => {
        dispatch(getPagosVentasByCliente(nombre))
        dispatch(getPagosVentaAchurasByCliente(nombre))
        dispatch(getClienteByName(nombre))
    }, [dispatch])

    const pagos = useSelector((state)=>state.pagosByCliente)
    const pagosAchuras = useSelector((state)=>state.pagosAchurasByCliente)
    const cliente = useSelector((state)=>state.clienteByNombre)

    let pagosT=[ ...pagos, ...pagosAchuras]
    

    return(
        <div className={style.wallpaper2}>
            <div className="d-none d-lg-block">
                <PDFViewer style={{width:"100%", height: "95vh"}}>
                    <DocPDF
                        pagosT={pagosT}
                        person={cliente}
                        name={"Cliente"}
                    />
                </PDFViewer> 
            </div>
            <div className="d-lg-none" >
                <PDFDownloadLink 
                    style={{textDecoration:"none"}}
                    document={<DocPDF
                        pagosT={pagosT}
                        person={cliente}
                        name={"Cliente"}
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