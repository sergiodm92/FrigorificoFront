import React from "react";
import styleBD from "./Button_Doble_Home.module.scss";

const DoubleButton = ({ title, onClick1, onClick2}) => {
  
  return (
      <div className={styleBD.cont}>
        <button
          className={styleBD.button1}
          onClick={onClick1}
        >{title}
        </button>
        <button
          className={styleBD.button2}
          onClick={onClick2}
        ></button>
      </div>
  );
};

export default DoubleButton;