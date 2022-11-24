import React from "react";
import ButtonNew from "../../Buttons/ButtonNew/ButtonNew";
import styleCard from "./CardReses.module.scss";

const CardResesFaena = ({ correlativo, categoria, kg, onClick}) => {

    
    return (
        <div>
            <div className={styleCard.miniButton}>
                <ButtonNew
                    onClick={onClick}
                    style={"delete"}
                    icon={"delete"}
                />
            </div>
            <div className={styleCard.card}>
                <div className={styleCard.items}>
                    <div><b>Categoría: </b></div>
                    <div><p>{categoria}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>Correlativo: </b></div>
                    <div><p>{correlativo}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>kg: </b></div>
                    <div><p>{kg}</p></div>
                </div>
            </div>
            
        </div>
    );
};

export default CardResesFaena;