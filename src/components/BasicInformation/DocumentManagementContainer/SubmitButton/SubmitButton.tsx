import React from "react";
import { Button, Spinner } from "reactstrap";


interface IPropTypes {
  isLoading: boolean;
}

const SubmitButton: React.FC<IPropTypes> = ({ isLoading }) => {
  return (
    <Button color="primary" className="d-flex align-items-center justify-content-center">
    {isLoading && <Spinner color="white" size="sm" />}
    <span className="ml-50">ذخیره اطلاعات</span>
  </Button>
    );
};

export { SubmitButton };
