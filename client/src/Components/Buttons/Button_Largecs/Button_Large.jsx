import React from "react";
import styleBL from "./Button_Large.module.scss";

const LargeButtoncs = ({ title, onClick}) => {
  
  return (
      <div className={styleBL.cont}>
        <button
          className={styleBL.button1}
          onClick={onClick}
        >{title}
        </button>
      </div>
  );
};

export default LargeButtoncs;