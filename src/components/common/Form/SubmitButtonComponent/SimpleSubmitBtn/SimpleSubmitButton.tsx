import React from "react";
import { Button, Spinner } from "reactstrap";

interface IPropTypes {
  isLoading: boolean;
  color?: string;
  btnText?: string;
  onCLick?: () => void;
  className?: string;
  outLine?: boolean;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  style?: React.CSSProperties;
}

const SimpleSubmitButton: React.FC<IPropTypes> = ({
  isLoading,
  color,
  btnText,
  onCLick,
  className,
  outLine,
  disabled,
  type,
  style,
}) => {
  return (
    <Button
      color={color ? color : "primary"}
      className={`d-flex align-items-center justify-content-center ${className}`}
      type={type ? type : isLoading ? "button" : `submit`}
      outline={outLine}
      onClick={onCLick}
      style={style}
      disabled={isLoading || disabled}
    >
      {isLoading && <Spinner color={outLine ? color : "white"} size="sm" />}
      <span className="ml-50">{btnText ? btnText : "ذخیره اطلاعات"}</span>
    </Button>
  );
};

export { SimpleSubmitButton };
