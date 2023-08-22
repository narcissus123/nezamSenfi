import React, { ReactNode, useEffect, useState } from "react";
import { Button, Col, Modal, Row, ModalBody, ModalHeader } from "reactstrap";
import {
  useGetAllDocumentFileByUserDocumentId,
  useGetAllUserLicenseDocumentFileByUserDocumentId,
  useServe,
} from "../../../../../core/services/api";
import { showToast } from "../../../../../core/utils";
import { useAllUnUsedDocument } from "../../../../../core/services/api";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { SimpleSubmitButton } from "../../../../common/Form";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  currentId: number;
  isLicense: boolean;
}

const LinksModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  currentId,
  isLicense,
}) => {
  const [filePaths, setFilePaths] = useState<any>([]);

  const getLinksMutation = useGetAllDocumentFileByUserDocumentId();
  const getLicenseLinks = useGetAllUserLicenseDocumentFileByUserDocumentId();

  const download = useServe();

  useEffect(() => {
    if (isOpen && currentId) {
      try {
        !isLicense
          ? getLinksMutation.mutate(currentId, {
              onSuccess: (val: any) => {
                const filePaths = val.data.result.filesPaths;
                setFilePaths(filePaths);
              },
              onError: (err: any) => {
                showToast(["مشکلی در دریافت اطلاعات پیش آمد!"], "error");
              },
            })
          : getLicenseLinks.mutate(currentId, {
              onSuccess: (val: any) => {
                const filePaths = val.data.result.filesPaths;
                setFilePaths(filePaths);
              },
              onError: (err: any) => {
                showToast(["مشکلی در دریافت اطلاعات پیش آمد!"], "error");
              },
            });
      } catch {}
    }
  }, [isOpen, currentId]);

  const showFiles = filePaths.map((row: any, key: any): ReactNode => {
    return (
      <Row style={{ marginBottom: "15px" }}>
        <Col md="8">
          <p style={{ display: "flex", alignItems: "center" }}>{`${
            key + 1
          } - ${row}`}</p>
        </Col>
        <Col md="4">
          <SimpleSubmitButton
            color="success"
            onCLick={() => download.mutate(row)}
            isLoading={download.isLoading}
            btnText="دانلود"
          />
        </Col>
      </Row>
    );
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className="modal-dialog-centered"
        backdrop={backdrop}
      >
        <ModalHeader toggle={toggleModal}>دانلود اسناد</ModalHeader>
        <ModalBody>
          {getLinksMutation.isLoading ? (
            <>
              <FallBackSpinner setHeight={170} />
            </>
          ) : (
            <>{showFiles}</>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export { LinksModal };
