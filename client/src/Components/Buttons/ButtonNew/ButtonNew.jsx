import React from "react";
import styleBP from "./ButtonNew.module.scss";

const ButtonNew = ({onClick, style, icon}) => {

  const buttonStyle = {
    new: styleBP.NewButton,
    right: styleBP.RightButton,
    edit: styleBP.EditButton,
    delete: styleBP.DeleteButton,
  };
  const icons = {
    new: "+",
    right: "✔",
    edit: "🖊",
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