import React from "react";
import NavBar from "../../Components/Navbar/Navbar";
import CardLarge from "../../Components/Cards/Card_Large/Card_Large";
import styleF from "./Faenas.module.scss";
const data = require("../../Components/Details/data.json")

export default function Faenas(){

    return(
        <div className={styleF.ConteinerCompras}>
            <NavBar
            title={"Compras"}
            />
            <div>
                
            </div>
        </div>
    )
}