import React from "react";
import styleBL from "./Button_Large.module.scss";

const LargeButton = ({ title, onClick1}) => {
  
  return (
      <div className={styleBL.cont}>
        <button
          className={styleBL.button1}
          onClick={onClick1}
        >{title}
        </button>
      </div>
  );
};

export default LargeButton;