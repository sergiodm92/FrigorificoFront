import React from "react";
import styleBS from "./Button_Short.module.scss";

const ShortButton = ({ title, onClick, color}) => {
    
    const buttonColor = {
        primary: styleBS.PrimaryButton,
        secondary: styleBS.SecondaryButton,
        green: styleBS.GreenButton,
        red: styleBS.RedButton,
      };

  return (
      <div className={styleBS.cont}>
        <button
          className={`${styleBS.button1} ${buttonColor[color]}`}
          onClick={onClick}
        >{title}
        </button>
      </div>
  );
};

export default ShortButton;