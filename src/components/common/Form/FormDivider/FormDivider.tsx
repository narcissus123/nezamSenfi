import React from "react";

import Styled from "./FormDivider.module.scss";

export interface IPropsTypes {
  children: React.ReactNode;
  textHeader: string;
  classNames?: string;
  style?: any;
}

const FormDivider: React.FC<IPropsTypes> = ({
  children,
  textHeader,
  classNames,
  style,
}) => {
  return (
    <div className={`${Styled["form-divider"]} ${classNames}`} style={style}>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: 0 }}
      >
        {textHeader && (
          <span className={`${Styled["text-divider"]}`}> {textHeader} </span>
        )}
      </div>
      {children}
    </div>
  );
};

export { FormDivider };
