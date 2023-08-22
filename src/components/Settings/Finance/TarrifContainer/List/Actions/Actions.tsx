import React, { useContext, useState } from "react";
import { Edit, FileMinus, Eye, Download } from "react-feather";
import { Button, Spinner } from "reactstrap";
import { UseMutationResult } from "react-query";
import { useHistory } from "react-router";
import { useServePayableValueDocument, useServeTariffDocument } from "../../../../../../core/services/api";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number, title: string };
      original : any;
    };
  };
  mutation: UseMutationResult;
  setShowEditModal: (id: any) => void;
  setSelectedUser: (id: any) => void;
}

const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id , title },
      original
    },
  },
  setSelectedUser,
  setShowEditModal,
}) => {
  const history = useHistory();

  const serveFiles = useServeTariffDocument()

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className="d-flex justify-content-center align-content-center">
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="primary"
        onClick={() => {
          serveFiles.mutate(
            {
              fileName: original.attachmentFilePath,
              folderName: original.attachmentFolder
            },
            {
              onSuccess: (val: any) => {},
            }
          );
        }}
      >
        {serveFiles.isLoading && <Spinner color="white" size="sm" />}
        دریافت اسناد &nbsp;
        <Download
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { Actions };
