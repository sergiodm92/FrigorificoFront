import React from "react";
import {useNavigate} from "react-router-dom";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import NavBar from "../../Components/Navbar/Navbar";
import style from "./Compras.module.scss";

const Nueva_Compra = ()=>{

    const navigate=useNavigate()

    return(
        <div className={style.ConteinerCompras}>
            <NavBar
            title={"Nueva Faena"}
            />
            <div className={style.cont}>
                <div>
                    <LargeButton
                        title={"Compra de Cerdo 🐷"}
                        onClick={()=>navigate("/NuevaCompra/FormCompraCerdo")}
                    />
                </div>
                <div>
                    <LargeButton
                        title={"Compra de Carne 🐮"}
                        onClick={()=>navigate("/NuevaCompra/FormCompraCarne")}
                    />
                </div>
            </div>
        </div>
    )
}

export default Nueva_Compra;