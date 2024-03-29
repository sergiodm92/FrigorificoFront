import React from "react";
import {Page, Text, View, Document, Image} from '@react-pdf/renderer';
import {Table, TableHeader,TableCell, TableBody, DataTableCell} from 'react-pdf-table-fork'

export default function DocPDFDetalleV({transaccion,transaccionName, person, name, array}){

    let fecha = new Date().toLocaleDateString('es').replaceAll("/", "-")

    array = array?array:[]

    function currencyFormatter({ currency, value}) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        }) 
        return formatter.format(value)
    }

    let fechaFormat = (new Date(transaccion.fecha*1)).toLocaleDateString('es').replaceAll("/", "-")
        
    const tableText = {
        margin:"0.5vh",
        borderColor:"white",
        fontSize:"1.25vh",

    };
    const tableTitle = {
        fontSize:"1.25vh",
        margin:"0.5vh",
        borderColor:"white",
        fontFamily:"Helvetica-Bold"
    };
    const border={
        borderColor:"white"
    };
    const datosPerson = {
        fontSize:"1.4vh",
        margin:"0.5vh"

    }
    const datosClienteBold = {
        fontSize:"1.4vh",
        margin:"0.5vh",
        fontFamily:"Helvetica-Bold"
    }
    const pageNumber = {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
      }

    return(
        <Document>
            <Page size="A4" style={{paddingBottom: 65}}>
                <View>
                    <View style={{ width: "100%", marginBottom: 20 }} fixed>
                        <Image src="https://res.cloudinary.com/dc8ustv0k/image/upload/v1667830724/GestionApp/membrete_primera_opcion_neo3mh.png"/>
                    </View>
                    <View style={{ margin: "4vh", marginTop: 0, marginBottom: 0 }}>
                        <View>
                            <Text style={{fontSize:"1.5vh", textAlign:"right", fontFamily:"Helvetica", marginBottom:"0.2vh"}}>Fecha de emisión: {fecha}</Text>
                        </View>
                        <View>
                            <Text style={{fontSize:"1.8vh", textAlign:"center", textDecoration:'underline', fontFamily:"Helvetica-Bold"}}>Detalle de {transaccionName}</Text>
                        </View>
                        <View style={{marginTop:"2vh", marginBottom:"0.2vh"}}>
                            <Text style={datosPerson}>Fecha: {fechaFormat}</Text>
                        </View>
                        <View style={{marginTop:"0.2vh", marginBottom:"2vh"}}>
                            <Text style={datosPerson}>{name}: {person}</Text>
                        </View>
                        {transaccionName=="Venta de Carne"?
                        <View>
                            <Table data = {array}>
                                <TableHeader includeBottomBorder={false}
                                            includeLeftBorder={false}
                                            includeRightBorder={false}
                                            includeTopBorder={false}>
                                    <TableCell style={border}><Text style={tableTitle}>Correlativo</Text></TableCell>
                                    <TableCell style={border}><Text style={tableTitle}>Categoría</Text></TableCell>
                                    <TableCell style={border}><Text style={tableTitle}>media res</Text></TableCell>  
                                    <TableCell style={border}><Text style={tableTitle}>kg</Text></TableCell>
                                    <TableCell style={border}><Text style={tableTitle}>Precio/kg</Text></TableCell>
                                    <TableCell style={border}><Text style={{fontSize:"1.5vh", margin:"0.5vh", borderColor:"white", fontFamily:"Helvetica-Bold", textAlign:"right"}}>Subtotal</Text></TableCell>
                                </TableHeader>
                                <TableBody  includeBottomBorder={false}
                                            includeLeftBorder={false}
                                            includeRightBorder={false}
                                            includeTopBorder={false}>
                                    <DataTableCell getContent={(e)=>e.correlativo} style={tableText}/>
                                    <DataTableCell getContent={(e)=>e.categoria} style={tableText}/>
                                    <DataTableCell getContent={(e)=>e.total_media} style={tableText}/>
                                    <DataTableCell getContent={(e)=>e.kg} style={tableText}/>
                                    <DataTableCell getContent={(e)=>currencyFormatter({
                                                                        currency: "USD",
                                                                        value : e.precio_kg
                                                                    })} style={tableText}/>
                                    <DataTableCell getContent={(e)=>currencyFormatter({
                                                                        currency: "USD",
                                                                        value : (e.precio_kg*e.kg)
                                                                    })} style={{fontSize:"1.25vh", margin:"0.5vh", borderColor:"white", fontFamily:"Helvetica", textAlign:"right"}}/>
                                </TableBody>
                            </Table>
                            <View style={{marginTop:"3vh", marginBottom:"0.1vh", textAlign:"right"}}>
                                <Text style={datosClienteBold}>Total:   {currencyFormatter({
                                                                        currency: "USD",
                                                                        value : transaccion.total
                                                                    })}</Text>
                            </View>
                            <View style={{marginTop:"0.1vh", marginBottom:"0.1vh"}}>
                                <Text style={{fontSize:"1.3vh", textAlign:"right", fontFamily:"Helvetica", marginTop:"10vh"}}>Carnes Don Alberto</Text>
                            </View>
                        </View>
                        :
                        <View>
                            <Table data = {[transaccion]}>
                                <TableHeader includeBottomBorder={false}
                                            includeLeftBorder={false}
                                            includeRightBorder={false}
                                            includeTopBorder={false}>
                                    <TableCell style={border}><Text style={tableTitle}>Cantidad de Achuras</Text></TableCell>
                                    <TableCell style={border}><Text style={{fontSize:"1.25vh", margin:"0.5vh", borderColor:"white", fontFamily:"Helvetica-Bold"}}>Precio unitario</Text></TableCell>
                                </TableHeader>
                                <TableBody  includeBottomBorder={false}
                                            includeLeftBorder={false}
                                            includeRightBorder={false}
                                            includeTopBorder={false}>
                                    <DataTableCell getContent={(e)=>e.cantidad} style={tableText}/>
                                    <DataTableCell getContent={(e)=>currencyFormatter({
                                                                        currency: "USD",
                                                                        value : e.precioUnitario
                                                                    })} style={{fontSize:"1.25vh", margin:"0.5vh", borderColor:"white", fontFamily:"Helvetica"}}/>
                                </TableBody>
                            </Table>
                            <View style={{marginTop:"3vh", marginBottom:"0.1vh", textAlign:"right"}}>
                                    <Text style={datosClienteBold}>Total:   {currencyFormatter({
                                                                            currency: "USD",
                                                                            value : transaccion.total
                                                                        })}</Text>
                                </View>
                            <View style={{marginTop:"0.1vh", marginBottom:"0.1vh"}}>
                                <Text style={{fontSize:"1.5vh", textAlign:"right", fontFamily:"Helvetica", marginTop:"10vh"}}>Carnes Don Alberto</Text>
                            </View>
                        </View>
                        }
                    </View>
                </View>
                <Text style={pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
            </Page>
        </Document>
    )
}
