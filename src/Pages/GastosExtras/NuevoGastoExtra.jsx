import React from "react";
import {useNavigate} from "react-router-dom";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import NavBar from "../../Components/Navbar/Navbar";
import style from "./GastosExtras.module.scss";

const NuevoGastoExtra = ()=>{

    const navigate=useNavigate()

    return(
        <div className={style.Conteiner}>
            <NavBar
            title={"Nuevo Gasto Extra"}
            />
            <div className={style.cont}>
                <div>
                    <LargeButton
                        title={"Combustible ⛽"}
                        onClick={()=>navigate("/NuevoGastoExtra/FormCombustible")}
                    />
                </div>
                <div>
                    <LargeButton
                        title={"Transporte 🛻"}
                        onClick={()=>navigate("/NuevoGastoExtra/FormTransporte")}
                    />
                </div>
                <div>
                    <LargeButton
                        title={"Impositivo 🧾"}
                        onClick={()=>navigate("/NuevoGastoExtra/FormImpositivo")}
                    />
                </div>
                <div>
                    <LargeButton
                        title={"Administrativo 🗃️"}
                        onClick={()=>navigate("/NuevoGastoExtra/FormAdministrativo")}
                    />
                </div>
            </div>
        </div>
    )
}

export default NuevoGastoExtra;