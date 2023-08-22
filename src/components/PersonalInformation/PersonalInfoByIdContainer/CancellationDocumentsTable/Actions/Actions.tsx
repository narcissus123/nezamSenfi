import React, { useState } from "react";
import { DownloadCloud, FileMinus } from "react-feather";
import { Button } from "reactstrap";
import {
  useDeleteUserDocumentByUserDocId,
  useDeleteUserLicenseDocument,
} from "../../../../../core/services/api";
import { showToast } from "../../../../../core/utils";
import { SweetAlertCallback } from "../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";
import { LinksModal } from "../LinksModal";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original: any;
    };
  };
  refetch: any;
}

const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original,
    },
  },
  refetch,
}) => {
  const [modal, setModal] = useState(false);
  const [currentDataId, setCurrentDataId] = useState<any>(null);

  const downloadClickHandler = (id: any) => {
    setCurrentDataId(id);
    setModal(true);
  };

  return (
    <div className="d-flex justify-content-center align-content-center">
      {modal && (
        <LinksModal
          backdrop={true}
          isOpen={modal}
          toggleModal={() => setModal((val) => !val)}
          currentId={currentDataId}
          licenseRequestId={original.licnseRequestId}
          filesPaths={original.filesPaths}
        />
      )}

      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="success"
        onClick={() => {
          downloadClickHandler(
            original.userDocumentId
              ? original.userDocumentId
              : original.userLicenseDocumentId
          );
        }}
      >
        دانلود &nbsp;
        <DownloadCloud
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { Actions };
