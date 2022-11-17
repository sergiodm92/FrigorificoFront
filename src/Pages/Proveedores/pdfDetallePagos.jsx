import React, {useEffect} from "react";
import { PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { getAllComrpasByProveedor, getPagosComprasByProveedor, getProveedorByName } from "../../Redux/Actions/Actions"
import DocPDF from "../../Components/PDFDoc/PDFDoc";

export default function PdfDetallePagosProveedores(){
    
    const dispatch = useDispatch()
    const {nombre}=useParams()

    useEffect(() => {
        dispatch(getPagosComprasByProveedor(nombre))
        dispatch(getProveedorByName(nombre))
        dispatch(getAllComrpasByProveedor(nombre))
    }, [dispatch])

    const pagos = useSelector((state)=>state.pagosByProveedor)
    const proveedor = useSelector((state)=>state.provByNombre)

    
    return(
        <div>
            <div class="d-none d-lg-block">
                <PDFViewer style={{width:"100%", height: "95vh"}}>
                    <DocPDF
                        pagosT={pagos}
                        person={proveedor}
                        name={"Proveedor"}
                    />
                </PDFViewer> 
            </div>
            <div class="d-lg-none">
                <PDFDownloadLink>
                    <DocPDF
                        pagosT={pagos}
                        person={proveedor}
                        name={"Proveedor"}
                    />
                </PDFDownloadLink>
            </div>
        </div>
    )
}