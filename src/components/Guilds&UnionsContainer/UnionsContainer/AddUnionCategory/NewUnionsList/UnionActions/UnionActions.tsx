import React, { useState } from "react";
import { Edit } from "react-feather";
import { Button } from "reactstrap";
import { UnionChange } from "../UnionChange";

interface IPropTypes {
  cell: {
    row: {
      values: any;
    };
  };
  reloadData: (obj: any) => void;
  dataReload: any;
}

const UnionActions: React.FC<IPropTypes> = ({
  cell: {
    row: { values },
  },
  reloadData,
  dataReload,
}) => {
  // delete and edit icon in row
  // const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const reload = () => {
    reloadData(dataReload);
  };

  return (
    <div
      className="d-flex justify-content-center align-content-center"
      style={{ flexWrap: "wrap" }}
    >
      <UnionChange
        reloadData={reload}
        isOpen={isOpen}
        values={values}
        toggleModal={() => setIsOpen(false)}
      />
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() => setIsOpen(true)}
      >
        ویرایش &nbsp;
        <Edit
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { UnionActions };
