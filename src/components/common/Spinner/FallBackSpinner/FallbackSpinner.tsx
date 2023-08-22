import React from "react"

import "../../../../assets/scss/components/app-loader.scss"
import Styles from './FallBackSpinner.module.scss'
 
interface IFallBackSpinnerProps{
  setHeight? : number
  text? :string
}

const FallBackSpinner: React.FC<IFallBackSpinnerProps> = ({setHeight, text}) => {
  return (
    <div
      style={setHeight ? { height: setHeight } : {}}
      className={`d-flex align-items-center justify-content-center fallback-spinner ${
        setHeight ? `` : "vh-100"
      }`}
    >
      {/* <img className="fallback-logo" src={logo} alt="logo" /> */}
      <div className="loading">
        <div className="effect-1 effects"></div>
        <div className="effect-2 effects"></div>
        <div className="effect-3 effects"></div>
        <p className={Styles["loading-text"]}>
          {text ? text : `در حال بارگذاری...`}
        </p>
      </div>
    </div>
  );
}
 
export {FallBackSpinner};
 
