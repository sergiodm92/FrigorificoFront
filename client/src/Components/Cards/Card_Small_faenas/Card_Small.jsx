import React from "react";
import {useNavigate} from 'react-router-dom';
import ButtonNew from "../../Buttons/ButtonNew/ButtonNew";
import styleCS from "./Card_Small.module.scss";

const CardSmallFaenas = ({ id, fecha, frigorifico, tropa, saldo, tipo,pago, bstyle, bicon, bonClick}) => {

    const navigate = useNavigate()

    return (
        <div className={styleCS.totalCard}>
            <div className={styleCS.cont} onClick={()=>navigate(`/${tipo}/${id}`)}>
                <div className={styleCS.items}><p>{fecha}</p></div>
                <div className={styleCS.items}><p>|</p></div>
                <div className={styleCS.items}><p>{frigorifico}</p></div>
                <div className={styleCS.items}><p>|</p></div>
                <div className={styleCS.items}><p>{tropa}</p></div>
                <div className={styleCS.items}><p>|</p></div>
                <div className={styleCS.items}><p>{saldo}</p></div>
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
export default CardSmallFaenas;