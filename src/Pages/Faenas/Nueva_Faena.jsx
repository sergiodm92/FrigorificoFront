import React from "react";
import {useNavigate} from "react-router-dom";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import NavBar from "../../Components/Navbar/Navbar";
import style from "./Faenas.module.scss";

const Nueva_Faena = ()=>{

    const navigate=useNavigate()

    return(
        <div className={style.ConteinerFaenas}>
            <NavBar
            title={"Nueva Faena"}
            />
            <div className={style.cont}>
                <div>
                    <LargeButton
                        title={"Faena de Cerdo 🐷"}
                        onClick={()=>navigate("/NuevaFaena/FormFaenaCerdo")}
                    />
                </div>
                <div>
                    <LargeButton
                        title={"Faena de Carne 🐮"}
                        onClick={()=>navigate("/NuevaFaena/FormFaenaCarne")}
                    />
                </div>
            </div>
        </div>
    )
}

export default Nueva_Faena;