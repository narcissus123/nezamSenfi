import React, { FC  } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { useGetLicenseRequestDetailByIssuingResponsible } from "../../../../../core/services/api";
import { useGetAllCancellationReasonByLicenecnseRequestIdByIsuingRespondible } from "../../../../../core/services/api/cancelation.api";
import { LicenseDetails } from "../LicenseDetails/LicenseDetails";
import { DraftDetails } from "./DraftDetails/DraftDetails";


interface IPropTypes {

}

const IssuingResponsibleContainer: FC<IPropTypes> = ({ }) => {


  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardBody>
          <LicenseDetails
            isApplicant={false}
            getQuery={useGetLicenseRequestDetailByIssuingResponsible}
            getCancellationDetailsQuery={
              useGetAllCancellationReasonByLicenecnseRequestIdByIsuingRespondible
            }
          />
          <DraftDetails />
        </CardBody>
      </Card>
    </>
  );
};

export { IssuingResponsibleContainer };
