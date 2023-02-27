import React from "react";
import {useNavigate} from 'react-router-dom';
import styleCL from "./Card_Large.module.scss";
import ButtonNew from "../../Buttons/ButtonNew/ButtonNew";

const CardLarge = ({ id, fecha, para, cant, kg, total, tipo, pago, bstyle, bicon, bonClick}) => {

    const navigate = useNavigate()

    function currencyFormatter({ currency, value}) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        }) //comentario para borrar
        return formatter.format(value)
        }

    const totalEstenPesos = currencyFormatter({
        currency: "USD",
        value : total
        })
    let fechaFormat = (new Date(fecha*1)).toLocaleDateString('es').replaceAll("/", "-")
    return (
        <div>
            <div className={styleCL.cont} onClick={()=>navigate(`/${tipo}/${id}`)}>
                <div className={styleCL.item1}><p>{id?.length>3?id.slice(id.length-3,id.length):id}</p></div>

                <div className={styleCL.item2}><p>{fechaFormat}</p></div>

                <div className={styleCL.item3}><p>{para?.length>10?para.slice(0,13):para}</p></div>

                <div className={styleCL.item4}><p>{cant}</p></div>

                <div className={styleCL.item5}><p>{typeof(kg)==="number"?kg.toFixed(2):kg}</p></div>

                <div className={styleCL.item6}><p>{totalEstenPesos}</p></div>
            </div>
            {pago===true?
            <div className={styleCL.button_pago}>
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

export default CardLarge;