import React, {useEffect} from "react";
import {Page, Text, View, Document, PDFViewer, Image, Font} from '@react-pdf/renderer';
import {Table, TableHeader,TableCell, TableBody, DataTableCell} from 'react-pdf-table-fork'
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { getClienteByName, getPagosVentaAchurasByCliente, getPagosVentasByCliente } from "../../Redux/Actions/Actions"
// import stylesheet from '@react-pdf/stylesheet';

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

    let fecha = new Date().toLocaleDateString('es').replaceAll("/", "-")

    let pagosT=[ ...pagos, ...pagosAchuras]
    // let pagosT=[{id:1, fecha:"2-10-2022", formaDePago:"Efectivo", monto:1000}]
    function currencyFormatter({ currency, value}) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        }) 
        return formatter.format(value)
    }
    pagosT.map(a=> a.newMonto = currencyFormatter({
                                currency: "USD",
                                value : a.monto
                                }))

        
    const tableText = {
        margin:"0.5vh",
        borderColor:"white"
    };
    const tableTitle = {
        fontSize:"1.5vh",
        margin:"0.5vh",
        borderColor:"white",
        fontFamily:"Helvetica-Bold"
    };
    const border={
        borderColor:"white"
    };
    const datosCliente = {
        fontSize:"1.5vh",
        margin:"0.5vh"

    }
    // const computed = stylesheet(container, style);

    return(        
        <PDFViewer style={{width:"100%", height: "95vh"}} >
            <Document>
                <Page size='A4'>
                    <View>
                        <View style={{width:"100%"}}>
                            <Image src="https://res.cloudinary.com/dc8ustv0k/image/upload/v1667830724/GestionApp/membrete_primera_opcion_neo3mh.png"/>
                        </View>
                        <View style={{margin:"4vh", marginTop:0}}>
                            <View>
                                <Text style={{fontSize:"1.5vh", textAlign:"right", fontFamily:"Helvetica"}}>{fecha}</Text>
                            </View>
                            <View>
                                <Text style={{fontSize:"1.8vh", textAlign:"center", textDecoration:'underline', fontFamily:"Helvetica-Bold"}}>Detalle de Pagos</Text>
                            </View>
                            <View style={{marginTop:"2vh", marginBottom:"2vh"}}>
                                <Text style={datosCliente}>Cliente: {cliente.nombre}</Text>
                                <Text style={datosCliente}>Cuil: {cliente.cuil}</Text>
                                {cliente.telefono? <Text style={datosCliente}>Teléfono: {cliente.telefono}</Text>:<null/>}
                                {cliente.email? <Text style={datosCliente}>E-mail: {cliente.email}</Text>:<null/>}
                                {cliente.direccion? <Text style={datosCliente}>Dirección: {cliente.direccion}</Text>:<null/>}
                            </View>
                            <Table data = {pagosT}>
                                <TableHeader includeBottomBorder={false}
                                            includeLeftBorder={false}
                                            includeRightBorder={false}
                                            includeTopBorder={false}>
                                    <TableCell style={border} weighting={0.4}><Text style={tableTitle}>Fecha</Text></TableCell>  
                                    <TableCell style={border}><Text style={tableTitle}>Forma de pago</Text></TableCell>
                                    <TableCell style={border}><Text style={tableTitle}>Monto</Text></TableCell>
                                </TableHeader>
                                <TableBody  includeBottomBorder={false}
                                            includeLeftBorder={false}
                                            includeRightBorder={false}
                                            includeTopBorder={false}>
                                                <DataTableCell getContent={(e)=>(new Date(e.fecha*1)).toLocaleDateString('es').replaceAll("/", "-")} style={tableText} weighting={0.4}/>
                                                <DataTableCell getContent={(e)=>e.formaDePago} style={tableText}/>
                                                <DataTableCell getContent={(e)=>e.newMonto} style={tableText}/>
                                </TableBody>
                            </Table>
                        </View>
                    </View>
                </Page>
            </Document>
        </PDFViewer>        
    )
}