import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import styleL from "./Login.module.scss"
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import {postLogin, setlogin_state, setStatus} from "../../Redux/Actions/Actions.js"

export default function Login(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [log,setlog] = useState({name:"",password:""})
    const login_status = useSelector((state)=>state.login_status)
  
    const handleChange = (e) => {
        setlog({
        ...log,
        [e.target.name]: e.target.value,
        });
    };

    const validate = ()=> {
      dispatch(postLogin(log))
      }

      useEffect(() => {
        if(login_status==="ok"){
          localStorage.setItem("login","true")
          dispatch(setlogin_state(true))
          navigate("/Home")
          swal({
            title: "Alerta de Ingreso",
            text: "Ingreso correctamente",
            icon: "success",
            button: "ok",
          })
          dispatch(setStatus(""))
        }
        if(login_status==="error"){ swal({
      title: "Ingreso incorrecto",
      text: "Error en usuario o Contraseña",
      icon: "warning",
      button: "ok",
      dangerMode: true,
    })
    dispatch(setStatus(""))
    }

    }, [login_status])

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