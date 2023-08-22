import React, { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import {
  useGetAllDocumentFileByUserDocumentId,
  useGetAllUserLicenseDocumentFileByUserDocumentId,
  useServe,
  useServeFileByAdmins,
} from "../../../../../core/services/api";
import { showToast } from "../../../../../core/utils";
import { SimpleSubmitButton } from "../../../../common/Form";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  currentId: number;
  filesPaths: string[];
}

const LinksModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  currentId,
  filesPaths,
}) => {
  const [filePaths, setFilePaths] = useState<any>(filesPaths);

  const { id } = useParams<{ id: string }>();

  const download = useServeFileByAdmins();

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
            onCLick={() => download.mutate({ fileName: row, folderName: id })}
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
          {false ? (
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
