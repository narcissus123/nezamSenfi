import React from "react";

import Styled from "./LoadingSpinner.module.scss"
import "../../../assets/scss/components/app-loader.scss";

const ComponentSpinner: React.FC<{isRelative?:boolean}> = ({isRelative=false}) => {

  const relativeClass:string = isRelative ? "relative-loading" : ""

  return (
    <div className={`${Styled[relativeClass]} fallback-spinner`} >
      <div className="loading component-loader">
        <div className="effect-1 effects"></div>
        <div className="effect-2 effects"></div>
        <div className="effect-3 effects"></div>
      </div>
    </div>
  );
};

export { ComponentSpinner };
