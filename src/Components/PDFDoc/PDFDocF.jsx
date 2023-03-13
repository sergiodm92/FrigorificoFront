import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "react-pdf-table-fork";

export default function DocPDFFaena({ pagos, nombre }) {
  let fecha = new Date().toLocaleDateString("es").replaceAll("/", "-");
  let total = 0;

  function currencyFormatter({ currency, value }) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      minimumFractionDigits: 2,
      currency,
    });
    return formatter.format(value);
  }
  pagos.map((a) => {
    total += a.monto*1;
    a.newMonto = currencyFormatter({
      currency: "USD",
      value: a.monto*1,
    });
  });

  const tableText = {
    margin: "0.5vh",
    borderColor: "white",
  };
  const tableTitle = {
    fontSize: "1.5vh",
    margin: "0.5vh",
    borderColor: "white",
    fontFamily: "Helvetica-Bold",
  };
  const border = {
    borderColor: "white",
  };
  const datosCliente = {
    fontSize: "1.5vh",
    margin: "0.5vh",
  };
  //faena
  return (
    <Document>
      <Page size="A4">
        <View>
          <View style={{ width: "100%" }}>
            <Image src="https://res.cloudinary.com/dc8ustv0k/image/upload/v1667830724/GestionApp/membrete_primera_opcion_neo3mh.png" />
          </View>
          <View style={{ margin: "4vh", marginTop: 0 }}>
            <View>
              <Text
                style={{
                  fontSize: "1.5vh",
                  textAlign: "right",
                  fontFamily: "Helvetica",
                }}
              >
                {fecha}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: "1.8vh",
                  textAlign: "center",
                  textDecoration: "underline",
                  fontFamily: "Helvetica-Bold",
                }}
              >
                Detalle de Pagos
              </Text>
            </View>
            <View style={{ marginTop: "2vh", marginBottom: "2vh" }}>
              <Text style={{ fontSize: "1.5vh" }}>Frigorífico: {nombre}</Text>
            </View>
            <Table data={pagos}>
              <TableHeader
                includeBottomBorder={false}
                includeLeftBorder={false}
                includeRightBorder={false}
                includeTopBorder={false}
              >
                <TableCell style={border} weighting={0.4}>
                  <Text style={tableTitle}>Fecha</Text>
                </TableCell>
                <TableCell style={border}>
                  <Text style={tableTitle}>Forma de pago</Text>
                </TableCell>
                <TableCell style={border}>
                  <Text
                    style={{
                      fontSize: "1.5vh",
                      margin: "0.5vh",
                      borderColor: "white",
                      fontFamily: "Helvetica-Bold",
                      textAlign: "right",
                    }}
                  >
                    Monto
                  </Text>
                </TableCell>
              </TableHeader>
              <TableBody
                includeBottomBorder={false}
                includeLeftBorder={false}
                includeRightBorder={false}
                includeTopBorder={false}
              >
                <DataTableCell
                  getContent={(e) =>
                    new Date(e.fecha * 1)
                      .toLocaleDateString("es")
                      .replaceAll("/", "-")
                  }
                  style={tableText}
                  weighting={0.4}
                />
                <DataTableCell
                  getContent={(e) => e.formaDePago}
                  style={tableText}
                />
                <DataTableCell
                  getContent={(e) => e.newMonto}
                  style={{
                    fontSize: "1.5vh",
                    margin: "0.5vh",
                    borderColor: "white",
                    fontFamily: "Helvetica",
                    textAlign: "right",
                  }}
                />
              </TableBody>
            </Table>
          </View>
          <View
            style={{
              marginTop: "0.1vh",
              marginBottom: "0.1vh",
              marginRight: "4vh",
              textAlign: "right",
            }}
          >
            <Text
              style={{
                fontSize: "1.5vh",
                margin: "0.5vh",
                fontFamily: "Helvetica-Bold",
              }}
            >
              Total:
              {currencyFormatter({
                currency: "USD",
                value: total,
              })}
            </Text>
          </View>
          <View style={{marginTop:"0.1vh", marginBottom:"0.1vh"}}>
            <Text style={{fontSize:"1.5vh", textAlign:"right", fontFamily:"Helvetica", marginTop:"10vh", marginBottom: "5vh", marginRight:"4vh"}}>Carnes Don Alberto</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
