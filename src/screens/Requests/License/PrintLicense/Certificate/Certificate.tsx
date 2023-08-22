import React, { FC } from "react";
import { CertificateContainer } from "../../../../../components/Requests/License/LicensePrint/CertificateContainer/CertificateContainer";
import { useDownloadOtherInfoCertificateByUserApplicant } from "../../../../../core/services/api";

const Certificate: FC = () => {
  return (
    <>
      <CertificateContainer
        getMutation={useDownloadOtherInfoCertificateByUserApplicant}
      />
    </>
  );
};

export { Certificate };

