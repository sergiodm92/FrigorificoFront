import React from "react";
import {useNavigate} from "react-router-dom";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import NavBar from "../../Components/Navbar/Navbar";
import style from "./GastosExtras.module.scss";

const GastosExtras = ()=>{

    const navigate=useNavigate()

    return(
        <div className={style.Conteiner}>
            <NavBar
            title={"Gastos Extras"}
            />
            <div className={style.cont}>
                <div>
                    <LargeButton
                        title={"Combustible ⛽"}
                        onClick={()=>navigate("/NuevaFaena/FormFaenaCerdo")}
                    />
                </div>
                <div>
                    <LargeButton
                        title={"Transporte 🛻"}
                        onClick={()=>navigate("/NuevaFaena/FormFaenaCerdo")}
                    />
                </div>
                <div>
                    <LargeButton
                        title={"Impositivo 🧾"}
                        onClick={()=>navigate("/NuevaFaena/FormFaenaCarne")}
                    />
                </div>
                <div>
                    <LargeButton
                        title={"Administrativo 🗃️"}
                        onClick={()=>navigate("/NuevaFaena/FormFaenaCarne")}
                    />
                </div>
            </div>
        </div>
    )
}

export default GastosExtras;