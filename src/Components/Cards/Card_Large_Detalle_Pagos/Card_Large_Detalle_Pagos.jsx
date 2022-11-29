import React, { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import styleCL from "./Card_Large.module.scss";
import ButtonNew from "../../Buttons/ButtonNew/ButtonNew";

const CardLargeDetallePagos = ({ id, idv, fecha, formaDePago, monto, check}) => {

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
        value : monto
        })
    let fechaFormat = (new Date(fecha*1)).toLocaleDateString('es').replaceAll("/", "-")
    return (
        <div>
            <div className={styleCL.cont}>

                <div className={styleCL.item1}><p>{id}</p></div>

                <div className={styleCL.item2}><p>{idv}</p></div>

                <div className={styleCL.item3}><p>{fechaFormat}</p></div>

                <div className={styleCL.item4}><p>{formaDePago}</p></div>

                <div className={styleCL.item5}><p>{totalEstenPesos}</p></div>

            </div>
        </div>
    );
};

export default CardLargeDetallePagos;