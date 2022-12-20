import React, {useEffect} from "react";
import { PDFDownloadLink , PDFViewer} from '@react-pdf/renderer';
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { getPagosVentasByCliente, getVentaByID } from "../../Redux/Actions/Actions"
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import style from "./Clientes.module.scss";
import DocPDFbyidV from "../../Components/PDFDoc/PDFByidV.js";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export default function PdfDetallePagoPorIdCliente(){
    
    const dispatch = useDispatch()
    const {nombre, id}=useParams()

    useEffect(() => {
        dispatch(getPagosVentasByCliente(nombre))
    }, [nombre])

    let pago = []
    let pagosAnteriores = []



    const pagos = useSelector((state)=>state.pagosByCliente)

    pago = pagos[0]!=='sin datos'?pagos.filter(a=>a.id==id):[]
    pagosAnteriores= pagos[0]!=='sin datos'?pagos.filter(a=>(a.ventaID==pago[0].ventaID && a!==pago[0] )):[]
    
    useEffect(() => {
        if(pago.length!==0)dispatch(getVentaByID(pago[0].ventaID))
    },[pagos])

    const venta = useSelector((state)=>state.VentaByID)

    return( 
        <div className={style.conteinerAll} id={style.asd}>
          <div className="d-none d-lg-block">
                <PDFViewer style={{width:"100%", height: "95vh"}} >
                    <DocPDFbyidV
                        pagosAnteriores={pagosAnteriores}
                        pago={pago}
                        venta={venta}
                        nombre={nombre}
                        array={venta.detalle}
                    />
                </PDFViewer>
            </div>
            <div className="d-lg-none" >
                <PDFDownloadLink 
                    style={{textDecoration:"none"}}
                    document={<DocPDFbyidV
                        pagosAnteriores={pagosAnteriores}
                        pago={pago}
                        venta={venta}
                        nombre={nombre}
                        array={venta.detalle}
                    />}
                    fileName={'Comprobante de Pago - '+nombre}
                >
                {pagos.length>0?
                    <LargeButton
                        
                        title={"Descargar PDF"}
                    />
                    :  <Box sx={{ display: 'flex', justifyContent:'center' }}>
                        <CircularProgress />
                        </Box>
                }
                </PDFDownloadLink>
            </div>
        </div>       
                
    )
}