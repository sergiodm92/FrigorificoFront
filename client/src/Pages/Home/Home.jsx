import React from "react";
import DoubleButton from "../../Components/Buttons/Button_Doble_Home/Button_Doble_Home";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import styleH from "./Home.module.scss";
import {useNavigate} from "react-router-dom";

export default function Home(){

    const navigate= useNavigate()
    return(
        <div className={styleH.wallpaper}>
            <div className={styleH.block1BH}><div className={styleH.logo}></div></div>
            <div className={styleH.block2BH}>
                <DoubleButton title={"Compras"} onClick1={()=> navigate("/Compras")} onClick2={()=> navigate("/Form_Compra")}/>
                <DoubleButton title={"Faenas"} onClick1={()=> navigate("/Faenas")} onClick2={()=> navigate("/Form_Faena")}/>
                <DoubleButton title={"Ventas"} onClick1={()=> navigate("/Ventas")} onClick2={()=> navigate("/Form_Venta")}/>
                <LargeButton title={"Clientes"} onClick={()=> navigate("/Clientes")}/>
                <LargeButton title={"Proveedores"} onClick={()=> navigate("/Proveedores")}/>
                <LargeButton title={"Stock"} onClick={()=> navigate("/Stock")}/>
                <LargeButton title={"Balance"} onClick={()=> navigate("/Balance")}/>
            </div>
        </div>
    )
}

