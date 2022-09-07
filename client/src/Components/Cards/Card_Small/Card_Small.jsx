import React from "react";
import {useNavigate} from 'react-router-dom';
import ButtonNew from "../../Buttons/ButtonNew/ButtonNew";
import styleCS from "./Card_Small.module.scss";

const CardSmall = ({ id, fecha, otro, monto, tipo, nav, pago}) => {

    const navigate = useNavigate()

    return (
        <div className={styleCS.totalCard}>
            <div className={styleCS.cont} onClick={()=>navigate(`/${tipo}/${id}`)}>
                <div className={styleCS.items}><p>{fecha}</p></div>
                <div className={styleCS.items}><p>|</p></div>
                <div className={styleCS.items}><p>{otro}</p></div>
                <div className={styleCS.items}><p>|</p></div>
                <div className={styleCS.items}><p>{monto}</p></div>
            </div>
            {pago===true?
            <div className={styleCS.button_pago}>
                <ButtonNew
                    onClick={()=>navigate(`/${nav}/${id}`)}
                />
            </div>
            : null
            }
        </div>
    );
};

export default CardSmall;