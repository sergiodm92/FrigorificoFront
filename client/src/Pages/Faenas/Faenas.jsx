import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import CardSmall from "../../Components/Cards/Card_Small/Card_Small";
import styleF from "./Faenas.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import {getAllFaenas} from "../../Redux/Actions/Actions.js"
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Faenas(){
const dispatch = useDispatch()

    useEffect(() => {
    dispatch(getAllFaenas())
    }, [dispatch])

const AllFaenas = useSelector((state)=>state.AllFaenas)
console.log(AllFaenas)
console.log("token")
console.log(localStorage.getItem("AuthLogin"))
    const navigate = useNavigate();
    const faenasPendientes = [];
    for(let i=0; i<Faenas.length; i++){
        if(Faenas[i].saldo>0) faenasPendientes.push(Faenas[i])
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
                                id={a.tropa}
                                fecha={a.fecha.substr(2,6)+a.fecha.substr(0,4)}
                                otro={a.frigorifico}
                                monto={a.saldo}
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