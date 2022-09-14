import React from "react"
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar"
import CardLarge from "../../Components/Cards/Card_Large/Card_Large"
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large"
import Table_Det_Faena from "../../Components/Details/Detalle_Faena";
import { useParams } from "react-router-dom";
import StyleDF from "./Faenadetail.module.scss"
const data = require("../../Components/Details/data.json")



export default function Detalle_Faena(){
const {tropa}=useParams()
    return(
        <div className={StyleDF.conteiner}>
        <NavBar
        title="Faena"    
        />
        <div className={StyleDF.tablefaena}>
        <Table_Det_Faena
        tropa={tropa}
        />
        </div>
        </div>

    )
}