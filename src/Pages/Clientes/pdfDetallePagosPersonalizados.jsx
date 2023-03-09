import React from "react";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { useSelector } from "react-redux"
import style from "./Clientes.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import DocPDFPersonalizado from "../../Components/PDFDoc/PDFDocPersonalizado";

export default function PdfDetallePagosClientesPersonalizado() {

    //const pagos=useSelector((state)=>state.pagosPDF[0])
    //const saldo=useSelector((state)=>state.pagosPDF[1])
    //const cliente=useSelector((state)=>state.pagosPDF[2])
    //const ventasByCliente=useSelector((state)=>state.AllVentasByCliente)
    //const ventasAchurasByCliente=useSelector((state)=>state.AllVentasAchurasByCliente)
    //const todasVentas = [...ventasByCliente, ...ventasAchurasByCliente]
    const pagos = JSON.parse(localStorage.getItem("pagos")).data
    const saldo = localStorage.getItem("saldoPagos")
    const cliente = JSON.parse(localStorage.getItem("cliente"))
    const ventasByCliente = JSON.parse(localStorage.getItem("ventasByCliente")).data
    const ventasAchurasByCliente = JSON.parse(localStorage.getItem("ventasAchurasByCliente")).data
    const todasVentas = [...ventasByCliente, ...ventasAchurasByCliente]

    let ventas = []
    let totalVentas = 0

    function currencyFormatter({ currency, value }) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        })
        return formatter.format(value)
    }

    todasVentas.map((venta) => {
        if (venta.saldo > 0) {
            venta.newTotal = currencyFormatter({
                currency: "USD",
                value: venta.total * 1
            })
            totalVentas += venta.total * 1
            ventas.push(venta)
        }
        else {
            pagos?.map((pago) => {
                if (pago.ventaID == venta.id && ventas.filter(v => v.id == pago.ventaID).length == 0) {
                    venta.newTotal = currencyFormatter({
                        currency: "USD",
                        value: venta.total * 1
                    })
                    totalVentas += venta.total * 1
                    ventas.push(venta)
                }
            })
        }
    })
    ventas.sort(function (a, b) {
        if (a.fecha > b.fecha) { return -1 }
        if (a.fecha < b.fecha) { return 1 }
        return 0
    })
    return (
        <div className={style.conteinerAll} id={style.asd}>
            <div className="d-none d-lg-block">
                <PDFViewer style={{ width: "100%", height: "95vh" }}>
                    <DocPDFPersonalizado
                        pagosT={pagos}
                        saldo={saldo}
                        person={cliente}
                        name={"Cliente"}
                        ventas={ventas}
                        totalVentas={totalVentas}
                    />
                </PDFViewer>
            </div>
            <div className="d-lg-none" >
                <PDFDownloadLink
                    style={{ textDecoration: "none" }}
                    document={<DocPDFPersonalizado
                        pagosT={pagos}
                        saldo={saldo}
                        person={cliente}
                        name={"Cliente"}
                        ventas={ventas}
                        totalVentas={totalVentas}
                    />}
                    fileName={'Comprobante de Pago - ' + cliente?.nombre}
                >
                    <LargeButton
                        title={"Descargar PDF"}
                    />
                </PDFDownloadLink>
            </div>
        </div>
    )
}
