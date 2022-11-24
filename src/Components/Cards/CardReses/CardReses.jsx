import React from "react";
import ButtonNew from "../../Buttons/ButtonNew/ButtonNew";
import styleCard from "./CardReses.module.scss";

const CardReses = ({ correlativo, categoria, kg, res, costo_kg, margen, precio_kg, garron, kg2, kg1, onClick}) => {

    
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
                { garron && kg1 && kg2 ?
                    <div>
                    <div className={styleCard.items}>
                        <div><b>Garrón: </b></div>
                        <div><p>{garron}</p></div>
                    </div>
                    <div className={styleCard.items}>
                        <div><b>kg1: </b></div>
                        <div><p>{kg1}</p></div>
                    </div>
                    <div className={styleCard.items}>
                        <div><b>kg2: </b></div>
                        <div><p>{kg2}</p></div>
                    </div>
                </div>
                :
                <div>
                    <div className={styleCard.items}>
                        <div><b>Correlativo: </b></div>
                        <div><p>{correlativo}</p></div>
                    </div>
                    <div className={styleCard.items}>
                        <div><b>kg: </b></div>
                        <div><p>{kg}</p></div>
                    </div>
                    <div className={styleCard.items}>
                        <div><b>costo$/kg: </b></div>
                        <div><p>${(costo_kg*1).toFixed(2)}</p></div>
                    </div>
                    <div className={styleCard.items}>
                        <div><b>precio $/kg: </b></div>
                        <div><p>${precio_kg}</p></div>
                    </div>
                    <div className={styleCard.items}>
                        <div><b>margen/kg: </b></div>
                        <div><p>${((precio_kg*1-costo_kg*1)).toFixed(2)}</p></div>
                    </div>
                    <div className={styleCard.items}>
                        <div><b>margen: </b></div>
                        <div><p>${((precio_kg*1-costo_kg*1)*kg).toFixed(2)}</p></div>
                    </div>
                    <div className={styleCard.items}>
                        <div><b>total: </b></div>
                        <div><p>${(precio_kg*1*kg).toFixed(2)}</p></div>
                    </div>
                </div>}
                { res && costo_kg && margen && precio_kg ?
                <div>
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
                :null
                }
            </div>
            
        </div>
    );
};

export default CardReses;