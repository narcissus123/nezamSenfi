import React from "react";
import { Check, Edit } from "react-feather";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import CheckBoxesVuexy from "../../../../../../../common/@vuexy/checkbox/CheckboxesVuexy";

interface IPropTypes {
  cell: {
    row: {
      values: {};
      original: { name: string; lastName: string };
    };
  };
  setDocumentIds: (val: any) => void;
}

const User: React.FC<IPropTypes> = ({
  cell: {
    row: {
      original: { name, lastName },
    },
  },
  setDocumentIds,
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      {name} {lastName}
    </div>
  );
};

export { User };
