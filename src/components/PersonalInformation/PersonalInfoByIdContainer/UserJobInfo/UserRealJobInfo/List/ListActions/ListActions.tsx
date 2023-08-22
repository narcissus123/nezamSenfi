import React, { useContext, useState } from "react";
import { Edit, FileMinus } from "react-feather";
import { Button } from "reactstrap";
import { ToastTypes } from "../../../../../../../core/enums";
import { useDeleteUserRealJobInformation, useGetLocationInformation } from "../../../../../../../core/services/api";
import { showToast } from "../../../../../../../core/utils";
import { refetchContext } from "../../../../../../../core/utils/context/EventContext";
import { SweetAlertCallback } from "../../../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";
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
