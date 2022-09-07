import React from "react";
import styleBP from "./ButtonNew.module.scss";

const ButtonNew = ({onClick}) => {
  
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

export default ButtonNew;