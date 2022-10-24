import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { getSaldoByCliente } from "../../../Redux/Actions/Actions";
import ButtonNew from "../../Buttons/ButtonNew/ButtonNew";
import styleCS from "./Card_Small.module.scss";

const CardSmallCliente = ({ id, nombre, tipo, pago, bstyle, bicon, bonClick, cuil}) => {
const dispatch = useDispatch()
useEffect(() => {
dispatch(getSaldoByCliente(nombre))
}, [dispatch])


let saldoCliente = useSelector((state)=>state.saldoCliente)
    const navigate = useNavigate()

    function currencyFormatter({ currency, value}) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        }) 
        return formatter.format(value)
        }

    const totalEstenPesos = currencyFormatter({
        currency: "USD",
        value : saldoCliente
        })

    return (
        <div className={styleCS.totalCard}>
            <div className={styleCS.cont} onClick={()=>navigate(`/${tipo}/${id}`)}>
                <div className={styleCS.items}><p>{nombre}</p></div>
                <div className={styleCS.items}><p>|</p></div>
                <div className={styleCS.items}><p>{cuil}</p></div>
                <div className={styleCS.items}><p>|</p></div>
                <div className={styleCS.items}><p>{totalEstenPesos}</p></div>
            </div>
            {pago===true?
            <div className={styleCS.button_pago}>
                <ButtonNew
                    style={bstyle}
                    icon={bicon}
                    onClick={bonClick}
                />
            </div>
            : null
            }
        </div>
    );
};

export default CardSmallCliente;