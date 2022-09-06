import React from "react";
import DoubleButton from "../../Components/Buttons/Button_Doble_Home/Button_Doble_Home";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import styleH from "./Home.module.scss";

export default function Home(){

    return(
        <div className={styleH.wallpaper}>
            <div className={styleH.block1BH}><div className={styleH.logo}></div></div>
            <div className={styleH.block2BH}>
                <DoubleButton title={"Compras"}/>
                <DoubleButton title={"Faenas"}/>
                <DoubleButton title={"Ventas"}/>
                <LargeButton title={"Clientes"}/>
                <LargeButton title={"Proveedores"}/>
                <LargeButton title={"Stock"}/>
                <LargeButton title={"Balance"}/>
            </div>


        </div>

    )
}