import React from "react";
import style from "./Button_Short.module.scss";

const ShortButton = ({ title, onClick, color}) => {
    
    const buttonColor = {
        primary: style.PrimaryButton,
        secondary: style.SecondaryButton,
        green: style.GreenButton,
        red: style.RedButton,
        grey: style.GreyButton,
      };

  return (
      <div className={style.cont}>
        <div
          className={ !onClick ? `${style.button1} ${buttonColor["grey"]}` :`${style.button1} ${buttonColor[color]}`}
          onClick={onClick}
        >{title}
        </div>
      </div>
  );
};

export default ShortButton;