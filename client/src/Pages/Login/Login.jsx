import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import styleL from "./Login.module.scss"
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import { login_state } from "../../Redux/Actions/Actions";

export default function Login(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [log,setlog] = useState({user:"",password:""})
    
    const handleChange = (e) => {
        setlog({
        ...log,
        [e.target.name]: e.target.value,
        });
    };

    const validate = ()=> {
     if(log.user==="Gato" && log.password==="123"){
        navigate("/Home")
        swal({
          title: "Alerta de Ingreso",
          text: "Ingreso correctamente",
          icon: "success",
          button: "ok",
          
        })
        dispatch(login_state(true)) 
      }
    else    swal({
      title: "Ingreso incorrecto",
      text: "Error en usuario o Contraseña",
      icon: "warning",
      button: "ok",
      dangerMode: true,
    })
    }

    return(
        <div className={styleL.wallpaper}>
            <div className={styleL.block1BH}><div className={styleL.logo}></div></div>
            <div className={styleL.block2BH}>
            <div className={styleL.conteiner}>
        <h1>Login</h1>
        <div className={styleL.cont}>
          <p>Usuario</p>
          <input 
          placeholder="Ingrese el usuario"
          id="usuario"
          name="user"
          maxlength="10"
          type="text"
          onChange={handleChange}
          className={styleL.user}
          ></input>
        </div>
        <div className={styleL.cont}>
          <p>Contraseña</p>
          <input 
          placeholder="Ingrese la contraseña"
          id="password"
          name="password"
          maxlength="8"
          type="password"
          onChange={handleChange}
          className={styleL.user}
          >
          </input>
        </div>
        <LargeButton
            title="Entrar"
            onClick={validate}
        />
    </div>
            </div>
        </div>
    )

}