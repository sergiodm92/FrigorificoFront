import React from "react";
import styleBP from "./ButtonNew.module.scss";

const ButtonNew = ({onClick, style, icon}) => {

  const buttonStyle = {
    new: styleBP.NewButton,
    rigth: styleBP.RigthButton,
    edith: styleBP.EdithButton
  };
  const icons = {
    new: "+",
    rigth: "✔",
    edith: "🖊",
    delete: "x"
  };
  
  return (
      <div className={styleBP.cont}>
        <div
          className={`${styleBP.buttonPago} ${buttonStyle[style]}`}
          onClick={onClick}
        ><b>{icons[icon]}</b>
        </div>
      </div>
  );
};

export default ButtonNew;