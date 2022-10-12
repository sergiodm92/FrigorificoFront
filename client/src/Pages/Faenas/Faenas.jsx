import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import CardSmall from "../../Components/Cards/Card_Small/Card_Small";
import styleF from "./Faenas.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import {getAllFaenas} from "../../Redux/Actions/Actions.js"
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";

export default function Faenas(){
const dispatch = useDispatch()
useEffect(() => {
    dispatch(getAllFaenas())
    }, [dispatch])

    const faenasPendientes = useSelector((state)=>state.faenasPendientes)
    console.log(faenasPendientes)
    const navigate = useNavigate();

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
                                id={a.id}
                                fecha={a.fecha}
                                otro={a.frigorifico}
                                monto={a.saldo}
                                tipo={"Faenas"}
                                pago={true}
                                bstyle={"new"}
                                bicon={"new"}
                                bonClick={()=>navigate(`/Form_Pago_Faena/${a.id}`)}
                            />
                        )
                        
                    })
                    }
                </div>
                <div className={styleF.buttons}>
                    <div className={styleF.buttonLarge}>
                        <LargeButton
                            title={"Historial de Faenas"}
                            onClick={()=>navigate("/Historial_Faena")}
                        ></LargeButton>
                    </div>
                    <div className={styleF.buttonsPagos}>
                        <div className={styleF.buttonLarge}>
                            <LargeButton
                                title={"Pagos - Natilla"}
                                onClick={()=>navigate("/Detalle_Pagos_Frigorifico/Natilla")}
                            ></LargeButton>
                        </div>
                        <div className={styleF.buttonLarge}>
                            <LargeButton
                                title={"Pagos - El Hueco"}
                                onClick={()=>navigate("/Detalle_Pagos_Frigorifico/El Hueco")}
                            ></LargeButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}