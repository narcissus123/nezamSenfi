import React from "react";

import { CardHeader, CardBody, CardTitle } from "reactstrap";

import { DocumentsTable } from "./DocumentsTable";

interface IPropTypes {
  refetch: boolean;
}

const DocumentList: React.FC<IPropTypes> = ({ refetch }) => {
  return (
    <>
      <CardHeader>
        <CardTitle>لیست اسناد ضمیمه</CardTitle>
      </CardHeader>
      <CardBody>
        <DocumentsTable refetch={refetch} />
      </CardBody>
    </>
  );
};

export { DocumentList };
