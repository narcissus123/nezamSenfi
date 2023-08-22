import React, { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import {
  useGetAllDocumentFileByUserDocumentId,
  useGetAllUserLicenseDocumentFileByUserDocumentId,
  useServe,
  useServeFileByAdmins,
  useServeLicenseRequestFile,
} from "../../../../../core/services/api";
import { showToast } from "../../../../../core/utils";
import { SimpleSubmitButton } from "../../../../common/Form";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { DownloadRow } from "./DownloadRow/DownloadRow";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  currentId: number;
  filesPaths: string[];
  licenseRequestId: any
}

const LinksModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  currentId,
  filesPaths,
  licenseRequestId
}) => {
  const [filePaths, setFilePaths] = useState<any>(filesPaths);

  const { id } = useParams<{ id: string }>();



  let showFiles: any = []; 
  if(Array.isArray(filePaths)){
    showFiles =  filePaths.map((row: any, key: any): ReactNode => {
      return <DownloadRow fileName={row} folderName={licenseRequestId} key={key} />;
    });
  }
 

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
