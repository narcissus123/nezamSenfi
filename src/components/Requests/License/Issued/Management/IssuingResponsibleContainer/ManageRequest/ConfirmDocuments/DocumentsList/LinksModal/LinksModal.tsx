import React, { ReactNode, useState } from "react";
import { useParams } from "react-router";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { useServeFileByAdmins } from "../../../../../../../../../../core/services/api";
import { SimpleSubmitButton } from "../../../../../../../../../common/Form";
import { FallBackSpinner } from "../../../../../../../../../common/Spinner/FallBackSpinner";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  filesPaths: string[];
  userInfoId: number;
}

const LinksModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  filesPaths,
  userInfoId,
}) => {
  const [filePaths, setFilePaths] = useState<any>(filesPaths);

  // const { id } = useParams<{ id: string }>();

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
            onCLick={() =>
              download.mutate({ fileName: row, folderName: userInfoId })
            }
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
