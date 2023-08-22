import React, { useState } from "react";
import { DownloadCloud, FileMinus } from "react-feather";
import { Button } from "reactstrap";
import { useDeleteUserDocumentByUserDocId, useDeleteUserLicenseDocument } from "../../../../../../../core/services/api";
import { showToast } from "../../../../../../../core/utils";
import { SweetAlertCallback } from "../../../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";
import { LinksModal } from "./LinksModal/LinksModal";


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
  const [showConfirmation, setShowConfirmation] = useState<any>(false);
  const [currentSelected, setCurrentSelected] = useState<any>(null);
  const [modal, setModal] = useState(false);
  const [currentDataId, setCurrentDataId] = useState<any>(null);

  const deleteDocMutation = useDeleteUserDocumentByUserDocId();

  const deleteLicenseDoc = useDeleteUserLicenseDocument();

  const deleteClickHandler = (id: any) => {
    setCurrentSelected(id);
    setShowConfirmation(true);
  };

  const downloadClickHandler = (id: any) => {
    setCurrentDataId(id);
    setModal(true);
  };

  return (
    <div className="d-flex justify-content-center align-content-center">
      <LinksModal
        backdrop={true}
        isOpen={modal}
        toggleModal={() => setModal((val) => !val)}
        currentId={currentDataId}
        licenseRequestId={original.licnseRequestId}
        filesPaths={original.filesPaths}
      />

      <SweetAlertCallback
        mutation={deleteDocMutation}
        title="آیا مطمئنید؟"
        onCancel={() => {
          setShowConfirmation(false);
        }}
        onClose={() => {
          setShowConfirmation(false);
        }}
        onConfirm={() => {
          setShowConfirmation(false);
          original.userDocumentId
            ? deleteDocMutation.mutate(currentSelected, {
                onSuccess: (val: any) => {
                  setShowConfirmation(false);
                  refetch();
                  showToast(["با موفقیت حذف شد"], "success");
                },
                onError: (err: any) => {
                  showToast(["مشکلی پیش آمد!"], "error");
                },
              })
            : deleteLicenseDoc.mutate(currentSelected, {
                onSuccess: (val: any) => {
                  setShowConfirmation(false);
                  refetch();
                  showToast(["با موفقیت حذف شد"], "success");
                },
                onError: (err: any) => {
                  showToast(["مشکلی پیش آمد!"], "error");
                },
              });
        }}
        show={showConfirmation}
      >
        آیا از پاک کردن این داده مطمئنید؟
      </SweetAlertCallback>
      {/* <Button
        style={{ margin: "3px" }}
        size="sm"
        color="danger"
        onClick={() => {
          deleteClickHandler(
            original.userDocumentId
              ? original.userDocumentId
              : original.userLicenseDocumentId
          );
        }}
      >
        حذف &nbsp;
        <FileMinus
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button> */}

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
