import React, { useState } from "react";

import { Button, Col, Row } from "reactstrap";
import { SubmitButton } from "../../../../common/Form";
import { DocumentsTable } from "../DocumentsTable/DocumentsTable";
import { UploadDocuments } from "../UploadDocuments/UploadDocuments";

import Styled from './UserDocuments.module.scss'

export interface PersonalDocumentsProps {}

const UserDocuments: React.FC<PersonalDocumentsProps> = () => {
  const [modal, setModal] = useState(false);
  const [refetchFromUpload, setRefetchFromUpload] = useState(false);

  return (
    <>
      <UploadDocuments
        backdrop={true}
        isOpen={modal}
        toggleModal={() => setModal((val) => !val)}
        setRefetchFromUpload={() => setRefetchFromUpload((val) => !val)}
      />

      <div>
        <Button
          color="primary"
          onClick={() => {
            setModal(true);
          }}
        >
          آپلود اسناد{" "}
        </Button>
      </div>

      <DocumentsTable refetchFromUpload={refetchFromUpload} />

      <div className={Styled.navigationButtonContainer}>
        <SubmitButton
          noSubmit
          backTo="/PersonalInfo/JobInfo"
          nextTo="/PersonalInfo/Machinery"
          isLoading={false}
        />
      </div>
    </>
  );
};

export { UserDocuments };
