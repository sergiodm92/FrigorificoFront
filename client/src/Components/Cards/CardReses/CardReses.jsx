import React from "react";
import ButtonNew from "../../Buttons/ButtonNew/ButtonNew";
import styleCard from "./CardReses.module.scss";

const CardReses = ({ correlativo, categoria, kg, res, costo_kg, margen, precio_kg, onClick}) => {

    return (
        <div>
            <div className={styleCard.miniButton}>
                <ButtonNew
                    onClick={onClick}
                    style={"edith"}
                    icon={"delete"}
                />
            </div>
            <div className={styleCard.card}>
                <div className={styleCard.items}>
                    <div><b>Correlativo: </b></div>
                    <div><p>{correlativo}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>Categoría: </b></div>
                    <div><p>{categoria}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>kg: </b></div>
                    <div><p>{kg}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>res: </b></div>
                    <div><p>{res}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>Costo/kg: </b></div>
                    <div><p>{costo_kg}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>Margen: </b></div>
                    <div><p>{margen}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>Precio/kg: </b></div>
                    <div><p>{precio_kg}</p></div>
                </div>
            </div>
            
        </div>
    );
};

export default CardReses;