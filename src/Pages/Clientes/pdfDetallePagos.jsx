import React, {useEffect} from "react";
import { PDFViewer} from '@react-pdf/renderer';
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { getClienteByName, getPagosVentaAchurasByCliente, getPagosVentasByCliente } from "../../Redux/Actions/Actions"
import DocPDF from "../../Components/PDFDoc/PDFDoc";

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
        <PDFViewer style={{width:"100%", height: "95vh"}} >
            <DocPDF
                pagosT={pagosT}
                person={cliente}
                name={"Cliente"}
            />
        </PDFViewer>        
    )
}