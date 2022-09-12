import React from "react";
import styleL from "./Login.module.scss"
import {useNavigate} from "react-router-dom";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";

export default function Login(){

    const navigate= useNavigate()
    return(
        <div className={styleL.wallpaper}>
            <div className={styleL.block1BH}><div className={styleL.logo}></div></div>
            <div className={styleL.block2BH}>
            <div className={styleL.conteiner}>
        <h1>Login</h1>
        <div className={styleL.cont}>
          <p>Usuario</p>
          <input placeholder="Ingrese el usuario"></input>
        </div>
        <div className={styleL.cont}>
          <p>Contraseña</p>
          <input 
          placeholder="Ingrese la contraseña"
          maxlength="8"
          type="password"
          >
          </input>
        </div>
        <LargeButton
            title="Entrar"
            onClick={()=> navigate("/Home")}
        />
    </div>
            </div>
        </div>
    )

}