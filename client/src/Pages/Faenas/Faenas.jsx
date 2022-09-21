import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getAllFaenas} from "../../Redux/Actions/Actions.js"
import NavBar from "../../Components/Navbar/Navbar";
import CardSmall from "../../Components/Cards/Card_Small/Card_Small";
import styleF from "./Faenas.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";



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
    // const faenasPendientes = [];
    // for(let i=0; i<data.faena.length; i++){
    //     if(data.faena[i].Saldo>0) faenasPendientes.push(data.faena[i])
    // }
    const faenasPendientes = [];
    for(let i=0; i<AllFaenas.length; i++){
        if(AllFaenas[i].saldo*1>0) faenasPendientes.push(AllFaenas[i])
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
                                nav={`Form_Pago_Faena/${a.tropa}`}
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