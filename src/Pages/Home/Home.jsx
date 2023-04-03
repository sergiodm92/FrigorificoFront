import React from "react";
import DoubleButton from "../../Components/Buttons/Button_Doble_Home/Button_Doble_Home";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import LargeButtoncs from "../../Components/Buttons/Button_Largecs/Button_Large";
import styleH from "./Home.module.scss";
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { setlogin_state } from "../../Redux/Actions/Actions";
import swal from "sweetalert";
import PrimarySearchAppBar from "../../Components/AppBar/AppBar";
import Marca from "../../Components/Marca/Marca";

export default function Home(){
    const navigate= useNavigate()
    const dispatch = useDispatch();
    const cerrarSesion = ()=>{
        swal({
            title: "Cerrar Sesión",
            text: "¿Está seguro que desea cerrar sesión?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
                dispatch(setlogin_state(false))
                localStorage.removeItem('login')
                navigate("/")
                        swal("Se ha cerrado sesión correctamente", {
                            icon: "success",
                        })
                    }
                });
    }

    return(
        <div className={styleH.conteiner}>
            <div className={styleH.appbarConteiner}>
            <PrimarySearchAppBar className={styleH.appbar}/>
            </div>
            <div className={styleH.block1BH}><div className={styleH.logo}></div></div>
            <div className={styleH.block2BH}>
                
                <DoubleButton title={"Faenas"} onClick1={()=> navigate("/Faenas")} onClick2={()=> navigate("/NuevaFaena")}/>
                <DoubleButton title={"Compras"} onClick1={()=> navigate("/Compras")} onClick2={()=> navigate("/NuevaCompra")}/>
                <DoubleButton title={"Ventas"} onClick1={()=> navigate("/Ventas")} onClick2={()=> navigate("/NuevaVenta")}/>
                <DoubleButton title={"Gastos Extras"} onClick1={()=> navigate("/GastosExtras")} onClick2={()=> navigate("/NuevoGastoExtra")}/>
                <DoubleButton title={"Clientes"} onClick1={()=> navigate("/Clientes")} title2={"Proveedores"} onClick2={()=> navigate("/Proveedores")}/>
                <LargeButton title={"Stock"} onClick={()=> navigate("/Stock")}/>
                <LargeButton title={"Caja"} onClick={()=> navigate("/Caja")}/>
                <LargeButton title={"Balance"} onClick={()=> navigate("/Balance")}/>
                {/* <LargeButton title={"Sobre DR-FullCode"} onClick={()=> navigate("/DR-FullCode")}/> */}
                <LargeButtoncs title={"Cerrar Sesión"} onClick={cerrarSesion}/>
            </div>
  
        </div>
    )
}
