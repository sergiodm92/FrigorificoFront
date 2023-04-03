import React from "react";
import styleBD from "./Button_Doble_Home.module.scss";

const DoubleButton = ({ title, onClick1, onClick2, title2}) => {
  
  return (
      <div className={styleBD.cont}>
        <button
          className={styleBD.button1}
          onClick={onClick1}
        >{title}
        </button>
        <button
          className={title2?styleBD.button3:styleBD.button2}
          onClick={onClick2}
         
        > {title2}</button>
      </div>
  );
};

export default DoubleButton;