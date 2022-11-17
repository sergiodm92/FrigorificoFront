import React from "react";
import styleCard from "./CardAlert.module.scss";

const CardAlert = ({ tropa, categoria, correlativo, frigorifico, fecha, dias}) => {

    return (
        <div>
            <div className={styleCard.card}>
                <div className={styleCard.items}>
                    <div><b>Dias: </b></div>
                    <div><p>{dias}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>Tropa: </b></div>
                    <div><p>{tropa}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>Categoría: </b></div>
                    <div><p>{categoria}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>correlativo: </b></div>
                    <div><p>{correlativo}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>Frigorifico: </b></div>
                    <div><p>{frigorifico}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>Fecha: </b></div>
                    <div><p>{fecha}</p></div>
                </div>

            </div>
        </div>
    );
};

export default CardAlert;