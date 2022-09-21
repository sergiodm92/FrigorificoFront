import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../Components/Navbar/Navbar"
import CardLarge from "../../Components/Cards/Card_Large/Card_Large"
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large"
import Table_Det_Faena from "../../Components/Details/Detalle_Faena";
import { useParams } from "react-router-dom";

import StyleDF from "./Faenadetail.module.scss"



export default function Detalle_Faena(){
    const {tropa}=useParams()
    

    
    return(
        <div className={StyleDF.conteiner}>
        <NavBar
        title="Faena"    
        />
        <div className={StyleDF.tablefaena}>
        <Table_Det_Faena
        FaenaByTropa={tropa}
        />
        </div>
        </div>

    )
}