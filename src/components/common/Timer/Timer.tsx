import React from 'react';

import Styled from "./Timer.module.scss"

export interface IPropsType {
  seconds:number
  minutes:number
}

const Timer: React.FC<IPropsType> = ({seconds,minutes}) => {
  return (  
    <div className={Styled["holder"]}>
     زمان باقی مانده : <span className={Styled["timer-span"]}>{seconds} </span> : <span className={Styled["timer-span"]}> {minutes} </span>
    </div>
  );
}
 
export { Timer }