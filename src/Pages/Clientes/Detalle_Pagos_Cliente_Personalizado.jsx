import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import NavBar from "../../Components/Navbar/Navbar";
import {
  getAllPagosVentasByCliente,
  getClienteByName,
  getSaldoVentasByCliente,
  pagosPDF,
} from "../../Redux/Actions/Actions";
import style from "./Clientes.module.scss";
import CardLargeDetallePagos from "../../Components/Cards/Card_Large_Detalle_Pagos/Card_Large_Detalle_Pagos";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import Swal from "sweetalert2";

export default function PdfDetallePagosClientesPersonalizado() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { nombre } = useParams();

  useEffect(() => {
    dispatch(getAllPagosVentasByCliente(nombre));
    dispatch(getSaldoVentasByCliente(nombre));
    dispatch(getClienteByName(nombre));
  }, [nombre]);

  let pagosT = useSelector((state) => state.pagosT);
  let saldoPagos = useSelector((state) => state.saldoPagos);
  let cliente = useSelector((state) => state.clienteByNombre);
  const ventasByCliente = useSelector((state) => state.AllVentasByCliente);
  const ventasAchurasByCliente = useSelector(
    (state) => state.AllVentasAchurasByCliente
  );
  const todasVentas = [...ventasByCliente, ...ventasAchurasByCliente];

  let arrPagosCancelados = [];
  let arrPagosConSaldo = [];

  todasVentas.map((venta) => {
    pagosT.map((pago) => {
      if (pago.ventaID == venta.id) {
        if (venta.saldo == 0) {
          arrPagosCancelados.push(pago);
          
        } else {
          arrPagosConSaldo.push(pago);
        }
      }
    });
  });
  arrPagosCancelados.sort(function(a,b){
    if(a.fecha>b.fecha){return -1}
    if(a.fecha<b.fecha){return 1}
    return 0})

  function checkear(e) {
    arrPagosCancelados[e.target.id].check = arrPagosCancelados[e.target.id]
      .check
      ? false
      : true;
  }

  function hasSameVentaID(pagos, pagosNoCheck) {
    // Recorrer cada objeto del array 'pagosNoCheck'
    for (let i = 0; i < pagosNoCheck.length; i++) {
      const ventaID = pagosNoCheck[i].ventaID;
      
      // Comprobar si algún objeto del array 'pagos' tiene el mismo 'ventaID'
      const found = pagos.some(pago => pago.ventaID === ventaID);
      
      if (found) {
        // Se encontró una coincidencia, devolver 'true'
        return true;
      }
    }
    
    // No se encontró ninguna coincidencia
    return false;
  }

  function generarPDF() {
    let pagos = []
    let pagosNoCheck = []
    arrPagosCancelados.map((pago)=>pago.check==true?pagos.push(pago):pagosNoCheck.push(pago))
    if(!hasSameVentaID(pagos, pagosNoCheck)){
    dispatch(
      pagosPDF(pagos, saldoPagos, cliente, arrPagosConSaldo)
    );
    navigate("/Clientes/DetallePagos/PdfDetallePagosClientesPersonalizado");
    }
    else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'warning',
        title: "debe seleccionar todos los pagos que pertenecen a una misma venta"
      })  
      }
  }
  return (
    <div className={style.conteinerAll}>
      <NavBar title={"Detalle personalizado"} />
      <div className={style.titlesPer}>
        <div className={style.titlePer1}>
          <b>ID</b>
        </div>
        <div className={style.titlePer2}>
          <b>ID-V</b>
        </div>
        <div className={style.titlePer3}>
          <b>Fecha</b>
        </div>
        <div className={style.titlePer4}>
          <b>Form de Pago</b>
        </div>
        <div className={style.titlePer5}>
          <b>Monto</b>
        </div>
      </div>
      <div>
        {arrPagosCancelados?.map((a, i) => {
          return (
            <div className={style.PDFcards}>
              <input id={i} type="checkbox" onChange={(e) => checkear(e)} />
              <CardLargeDetallePagos
                key={i}
                id={a.id.slice(-3, a.id.length)}
                idv={a.ventaID.slice(-3, a.ventaID.length)}
                fecha={a.fecha}
                formaDePago={a.formaDePago}
                monto={a.monto}
                check={a.check}
              />
            </div>
          );
        })}
        <LargeButton title={"Generar PDF Personalizado"} onClick={generarPDF} />
      </div>
    </div>
  );
}
