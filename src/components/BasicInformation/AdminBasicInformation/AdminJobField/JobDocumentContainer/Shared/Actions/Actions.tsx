import React, { useState } from "react";
import { FileMinus } from "react-feather";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
import { useDeleteJob } from "../../../../../../../core/services/api";
import { SweetAlertCallback } from "../../../../../../common/SweetAlert/SweetALertCallback";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original: any;
    };
  };
  setUnUsedDoc: (val: any) => void;
  setTableData: (val: any) => void;
}

const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original,
    },
  },
  setUnUsedDoc,
  setTableData,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const DeleteServicesById = useDeleteJob();
  //const {setFetchRefresh} = useServicesTypesContext()

  const history = useHistory();

  const deleteClickHandler = () => {
    setShowConfirmation(true);
  };

  return (
    <div className="d-flex justify-content-center align-content-center flex-wrap">
      <SweetAlertCallback
        mutation={() => {}}
        title="آیا مطمئنید؟"
        onCancel={() => {
          setShowConfirmation(false);
        }}
        onClose={() => {
          setShowConfirmation(false);
        }}
        onConfirm={() => {
          setUnUsedDoc((old: any) => [
            ...old,
            {
              value: original.documentId,
              label: original.documentTitle,
              //jobTitle: original.jobTitle,
            },
          ]);
          setTableData((old: any) =>
            old.filter((item: any) => item.documentId !== original.documentId)
          );
          setShowConfirmation(false);
        }}
        show={showConfirmation}
      >
        آیا از پاک کردن این داده مطمئنید؟
      </SweetAlertCallback>

      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="danger"
        onClick={() => {
          deleteClickHandler();
        }}
      >
        حذف &nbsp;
        <FileMinus
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { Actions };
