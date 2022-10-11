import React from "react";
import styleBS from "./Button_Short.module.scss";

const ShortButton = ({ title, onClick, color}) => {
    
    const buttonColor = {
        primary: styleBS.PrimaryButton,
        secondary: styleBS.SecondaryButton,
        green: styleBS.GreenButton,
        red: styleBS.RedButton,
        grey: styleBS.GreyButton,
      };

  return (
      <div className={styleBS.cont}>
        <div
          className={ !onClick ? `${styleBS.button1} ${buttonColor["grey"]}` :`${styleBS.button1} ${buttonColor[color]}`}
          onClick={onClick}
        >{title}
        </div>
      </div>
  );
};

export default ShortButton;