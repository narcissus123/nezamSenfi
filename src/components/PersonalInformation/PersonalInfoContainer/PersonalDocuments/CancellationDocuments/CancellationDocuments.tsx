import React, { useState } from "react";

import { Button } from "reactstrap";
import { SubmitButton } from "../../../../common/Form";
import { DocumentsTable } from "./DocumentsTable/DocumentsTable";
import { UploadDocuments } from "./UploadDocuments/UploadDocuments";
import Styled from './CancellationDocuments.module.scss'

export interface PersonalDocumentsProps {}

const CancellationDocuments: React.FC<PersonalDocumentsProps> = () => {

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

export { CancellationDocuments };
