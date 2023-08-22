import React from "react";
import { Alert } from "reactstrap";

const NotFoundData: React.FC = () => {
  return (
    <Alert color="info" className="w-100 m-0 text-center my-1">
      موردی یافت نشد
    </Alert>
  );
};

export { NotFoundData };
