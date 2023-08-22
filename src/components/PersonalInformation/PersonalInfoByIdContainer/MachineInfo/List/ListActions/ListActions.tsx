import React, {  useState } from "react";
import { Edit } from "react-feather";
import { Button } from "reactstrap";

import { DetailsModal } from "../DetailsModal/DetailsModal";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original: any;
    };
  };
}

const ListActions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original,
    },
  },
}) => {
  
  const [openModal, setOpenModal] = useState<boolean>(false);

  

  return (
    <div className="d-flex justify-content-center align-content-center">
      {openModal && (
        <DetailsModal
          backdrop={true}
          data={original}
          isOpen={openModal}
          toggleModal={() => setOpenModal((val: any) => !val)}
        />
      )}

      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() => setOpenModal(true)}
      >
        جزئیات
        <Edit
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { ListActions };
