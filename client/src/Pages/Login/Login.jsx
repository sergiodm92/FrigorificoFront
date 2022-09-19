import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import styleL from "./Login.module.scss"
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import {postLogin} from "../../Redux/Actions/Actions.js"

export default function Login(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [log,setlog] = useState({name:"",password:""})
   
    const handleChange = (e) => {
        setlog({
        ...log,
        [e.target.name]: e.target.value,
        });
    };

    const validate = ()=> {
      
      postLogin(log)
      
      if(log.name==="sergio" && log.password==="123456"){
          localStorage.setItem("login","true")
          navigate("/Home")
          swal({
            title: "Alerta de Ingreso",
            text: "Ingreso correctamente",
            icon: "success",
            button: "ok",
          })
        
      }
    

    else    swal({
      title: "Ingreso incorrecto",
      text: "Error en usuario o Contraseña",
      icon: "warning",
      button: "ok",
      dangerMode: true,
    })
    }

    const AuthLogin = useSelector((state)=>state.AuthLogin)
    localStorage.setItem("AuthLogin",AuthLogin)



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
          name="name"
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