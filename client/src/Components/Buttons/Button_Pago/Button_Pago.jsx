import React from "react";
import styleBP from "./Button_Pago.module.scss";

const ButtonPago = ({onClick}) => {
  
  return (
      <div className={styleBP.cont}>
        <div
          className={styleBP.buttonPago}
          onClick={onClick}
        ><b>+</b>
        </div>
      </div>
  );
};

export default ButtonPago;