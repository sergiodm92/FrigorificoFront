import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../../Components/Navbar/Navbar";
import CardSmall from "../../Components/Cards/Card_Small/Card_Small";
import styleF from "./Faenas.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";

const data = require("../../Components/Details/data.json")

export default function Faenas(){
const AllFaenas = useSelector((state)=>state.Faenas)
console.log(AllFaenas)
console.log("token")
console.log(localStorage.getItem("auth_token"))
    const navigate = useNavigate();
    const faenasPendientes = [];
    for(let i=0; i<Faenas.length; i++){
        if(Faenas[i].Saldo>0) faenasPendientes.push(Faenas[i])
    }

    return(
        <div className={styleF.ConteinerCompras}>
            <NavBar
            title={"Faenas"}
            />
            <div>
                <div className={styleF.contTitle}>
                    <h1 className={styleF.titleP}>Pendientes</h1>
                </div>
                <div className={styleF.title}>
                    <div><b>Fecha</b></div>
                    <div><b>|</b></div>
                    <div><b>Frigorífico</b></div>
                    <div><b>|</b></div>
                    <div><b>Saldo($)</b></div>
                </div>
                <div className={styleF.cardsCont}>
                    {faenasPendientes.map((a)=>{
                        return(
                            <CardSmall
                                id={a.Tropa}
                                fecha={a.Fecha}
                                otro={a.Frigorifico}
                                monto={a.Saldo}
                                tipo={"Faenas"}
                                pago={true}
                                bstyle={"new"}
                                bicon={"new"}
                                bonClick={()=>navigate(`Form_Pago_Faena/${a.Tropa}`)}
                            />
                        )
                        
                    })
                    }
                </div>
                <div className={styleF.buttonLarge}>
                    <LargeButton
                        title={"Historial de Faenas"}
                        onClick={()=>navigate("/Historial_Faena")}
                    ></LargeButton>
                </div>
            </div>
        </div>
    )
}