import React from "react";
import {useNavigate} from 'react-router-dom';
import ButtonNew from "../../Buttons/ButtonNew/ButtonNew";
import style from "./Card_Small.module.scss";

const CardSmallFaenas = ({ fecha, frigorifico, tropa, saldo, tipo,pago, bstyle, bicon, bonClick}) => {

    const navigate = useNavigate()
    
    function currencyFormatter({ currency, value}) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 0,
            currency
        }) 
        return formatter.format(value)
        }
        
        let fechaFormat = (new Date(fecha*1)).toLocaleDateString('es').replaceAll("/", "-")


    const totalEstenPesos = currencyFormatter({
        currency: "USD",
        value : saldo
        })

    return (
        <div className={style.totalCard}>
            <div className={style.cont} onClick={()=>navigate(`/${tipo}/${tropa}`)}>
                <div className={style.item1}><p>{fechaFormat}</p></div>
                <div className={style.item2}><p>{frigorifico}</p></div>
                <div className={style.item3}><p>{tropa}</p></div>
                <div className={style.item4}><p>{totalEstenPesos}</p></div>
            </div>
            {pago===true?
            <div className={style.button_pago}>
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
export default CardSmallFaenas;