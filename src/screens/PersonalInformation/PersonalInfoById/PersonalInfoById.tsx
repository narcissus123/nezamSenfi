import React from "react";
import { useParams } from "react-router-dom";

import { PersonalInfoByIdContainer } from "../../../components/PersonalInformation/PersonalInfoByIdContainer/PersonalInfoByIdContainer";
import { UserLegalIdentity } from "../../../components/PersonalInformation/PersonalInfoByIdContainer/UserIdentity/UserLegalIdentity/UserLegalIdentity";
import { UserRealContactInfo } from "../../../components/PersonalInformation/PersonalInfoByIdContainer/UserContactInfo/UserRealContactInfo/UserRealContactInfo";
import { UserRealIdentity } from "../../../components/PersonalInformation/PersonalInfoByIdContainer/UserIdentity/UserRealIdentity/UserRealIdentity";
import { UserRealJobInfo } from "../../../components/PersonalInformation/PersonalInfoByIdContainer/UserJobInfo/UserRealJobInfo/UserRealJobInfo";
import { UserLegalContactInfo } from "../../../components/PersonalInformation/PersonalInfoByIdContainer/UserContactInfo/UserLegalContactInfo/UserLegalContactInfo";
import { UserLegalJobInfo } from "../../../components/PersonalInformation/PersonalInfoByIdContainer/UserJobInfo/UserLegalJobInfo/UserLegalJobInfo";
import { MachineInfo } from "../../../components/PersonalInformation/PersonalInfoByIdContainer/MachineInfo/MachineInfo";
import { ServicesInfo } from "../../../components/PersonalInformation/PersonalInfoByIdContainer/ServicesInfo/ServicesInfo";
import { DocumentsTable } from "../../../components/PersonalInformation/PersonalInfoByIdContainer/DocumentsTable/DocumentsTable";
import { CancellationDocumentsTable } from "../../../components/PersonalInformation/PersonalInfoByIdContainer/CancellationDocumentsTable/CancellationDocumentsTable";

interface IUserParam {
  id: string;
}

const PersonalInfoById: React.FC = () => {
  let { id } = useParams<IUserParam>();

  return (
    <PersonalInfoByIdContainer>
      {window.location.pathname.includes("LegalUsersList")
        ? {
            identitiy: <UserLegalIdentity id={id} />,
            contactInfo: <UserLegalContactInfo id={id} />,
            jobInfo: <UserLegalJobInfo id={id} />,
            machineInfo: <MachineInfo id={id} />,
            servicesInfo: <ServicesInfo id={id} />,
            docInfo: <DocumentsTable id={+id} />,
            cancellationDocumentsTable: <CancellationDocumentsTable id={+id} />,
          }
        : {
            identitiy: <UserRealIdentity id={id} />,
            contactInfo: <UserRealContactInfo id={id} />,
            jobInfo: <UserRealJobInfo id={id} />,
            machineInfo: <MachineInfo id={id} />,
            servicesInfo: <ServicesInfo id={id} />,
            docInfo: <DocumentsTable id={+id} />,
            cancellationDocumentsTable: <CancellationDocumentsTable id={+id} />,
          }}
    </PersonalInfoByIdContainer>
  );
};

export { PersonalInfoById };
