import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../Components/Navbar/Navbar"
import CardLarge from "../../Components/Cards/Card_Large/Card_Large"
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large"
import Table_Det_Faena from "../../Components/Details/Detalle_Faena";
import { useParams } from "react-router-dom";
import StyleDF from "./Faenadetail.module.scss"
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew";
const data = require("../../Components/Details/data.json")



export default function Detalle_Faena(){

    const {tropa}=useParams()
    const navigate = useNavigate()

    return(
        <div className={StyleDF.conteiner}>
            <NavBar
                title="Faena"    
            />
            <div className={StyleDF.page}>
                <div className={StyleDF.buttonEdith}>
                    <ButtonNew
                        style={"edith"}
                        icon={"edith"}
                        onClick={()=>navigate(`/Faenas`)}
                    />
                </div>
                <div className={StyleDF.tablefaena}>
                    <Table_Det_Faena
                        tropa={tropa}
                    />
                </div>
            </div>
        </div>

    )
}