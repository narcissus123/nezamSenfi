import React,{useEffect, useState} from 'react';

import Styled from "./Dependent.module.scss"

export interface IPropsType {
  mainField:string | number | boolean
  dependentValue:string | number | boolean
}
 
const DependentInput: React.FC<IPropsType> = ({mainField,dependentValue,children}) => {
  const [show,setShow] = useState("hide-first")

  useEffect(
    () => {
      if(mainField === dependentValue && show !== "hide-first") {
        setShow("show")
      }
      else if(mainField === dependentValue && show === "hide-first"){
        setShow("show-first")
      }
      else{
        setShow("hide")
      }
    },
    [mainField]
  )

  return (  
    <>
      <div className={`${Styled["holder"]} ${Styled[show]}`}>
        {
          children
        }
      </div>
    </>
  );
}
 
export {DependentInput}