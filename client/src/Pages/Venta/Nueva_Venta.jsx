import React from "react";
import {useNavigate} from "react-router-dom";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import NavBar from "../../Components/Navbar/Navbar";
import style from "./Ventas.module.scss";

const Nueva_Venta = ()=>{

    const navigate=useNavigate()

    return(
        <div>
            <NavBar
            title={"Nueva Venta"}
            />
            <div className={style.cont}>
                <div>
                    <LargeButton
                        title={"Venta de Achuras"}
                        onClick={()=>navigate("/Form_Venta_Achuras")}
                    />
                </div>
                <div>
                    <LargeButton
                        title={"Venta de Carne"}
                        onClick={()=>navigate("/Form_Venta")}
                    />
                </div>
            </div>
        </div>
    )
}

export default Nueva_Venta;