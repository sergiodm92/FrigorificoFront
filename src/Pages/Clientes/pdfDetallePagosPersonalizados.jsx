import React from "react";
import { PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';
import { useSelector } from "react-redux"
import style from "./Clientes.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import DocPDFPersonalizado from "../../Components/PDFDoc/PDFDocPersonalizado";

export default function PdfDetallePagosClientesPersonalizado(){
    
    const pagos = useSelector((state)=>state.pagosPDF[0])
    const saldo = useSelector((state)=>state.pagosPDF[1])
    const cliente = useSelector((state)=>state.pagosPDF[2])

    return(
        <div className={style.conteinerAll} id={style.asd}>
            <div className="d-none d-lg-block">
                <PDFViewer style={{width:"100%", height: "95vh"}}>
                    <DocPDFPersonalizado
                        pagosT={pagos}
                        saldo={saldo}
                        person={cliente}
                        name={"Cliente"}
                    />
                </PDFViewer> 
            </div>
            <div className="d-lg-none" >
                <PDFDownloadLink 
                    style={{textDecoration:"none"}}
                    document={<DocPDFPersonalizado
                        pagosT={pagos}
                        saldo={saldo}
                        person={cliente}
                        name={"Cliente"}
                    />}
                    fileName={'Comprobante de Pago - '+ cliente.nombre}
                >
                    <LargeButton
                        title={"Descargar PDF"}
                    />
                </PDFDownloadLink>
            </div>
        </div>
    )
}
