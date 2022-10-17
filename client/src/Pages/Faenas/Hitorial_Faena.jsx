import React, { useEffect } from "react";
import NavBar from "../../Components/Navbar/Navbar";
import CardSmall from "../../Components/Cards/Card_Small/Card_Small";
import styleF from "./Faenas.module.scss";
import {getAllFaenas} from "../../Redux/Actions/Actions.js"
import { useDispatch, useSelector } from "react-redux";

export default function Historial_Faena(){
    const dispatch = useDispatch()

    useEffect(() => {
    dispatch(getAllFaenas())
    }, [dispatch])

const AllFaenas = useSelector((state)=>state.AllFaenas)
    return(
        <div className={styleF.ConteinerFaenas}>
            <NavBar
            title={"Hist. Faenas"}
            />
            <div>
                <div className={styleF.title}>
                    <div><b>Fecha</b></div>
                    <div><b>|</b></div>
                    <div><b>Frigorífico</b></div>
                    <div><b>|</b></div>
                    <div><b>Monto($)</b></div>
                </div>
                <div className={styleF.cardsCont}>
                    {AllFaenas.map((a)=>{
                        return(
                            <CardSmall
                                id={a.id}
                                fecha={a.fecha}
                                otro={a.frigorifico}
                                monto={a.saldo}
                                tipo={"Faenas"}
                                pago={false}
                            />
                        )
                        
                    })
                    }
                </div>
            </div>
        </div>
    )
}