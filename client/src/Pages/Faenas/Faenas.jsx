import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import styleF from "./Faenas.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import {getAllFaenas} from "../../Redux/Actions/Actions.js"
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardSmallFaenas from "../../Components/Cards/Card_Small_faenas/Card_Small";


export default function Faenas(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllFaenas())
    }, [dispatch])

    const faenasPendientes = useSelector((state)=>state.faenasPendientes)

    const navigate = useNavigate();

    function currencyFormatter({ currency, value}) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        }) 
        return formatter.format(value)
        }
    
        let saldoEstenPesos

    return(
        <div className={styleF.ConteinerFaenas}>
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
                    <div><b>Tropa</b></div>
                    <div><b>|</b></div>
                    <div><b>Saldo($)</b></div>
                </div>
                <div className={styleF.cardsCont}>
                    {faenasPendientes.map((a,i)=>{
                        saldoEstenPesos = currencyFormatter({
                            currency: "USD",
                            value : a.saldo
                        })
                        return(
                            <CardSmallFaenas
                                id={a.id}
                                key={i}
                                fecha={a.fecha}
                                frigorifico={a.frigorifico}
                                tropa={a.tropa}
                                saldo={saldoEstenPesos}
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