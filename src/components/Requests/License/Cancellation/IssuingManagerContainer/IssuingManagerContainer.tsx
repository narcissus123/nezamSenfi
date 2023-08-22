import React, { FC  } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { useGetLicenseRequestDetailByIssuingResponsible } from "../../../../../core/services/api";
import { useConfirmCancellationByIsuuingManger, useGetAllCancellationReasonByLicenecnseRequestIdByIsuingManager, useRejectCancellationByIsuuingManager } from "../../../../../core/services/api/cancelation.api";
import { LicenseDetails } from "../LicenseDetails/LicenseDetails";
import { CheckComponent } from "./CheckComponent/CheckComponent";


interface IPropTypes {

}

const IssuingManagerContainer: FC<IPropTypes> = ({  }) => {


  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle> درخواست ابطال </CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <LicenseDetails
                getQuery={useGetLicenseRequestDetailByIssuingResponsible}
                getCancellationDetailsQuery={useGetAllCancellationReasonByLicenecnseRequestIdByIsuingManager}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <CheckComponent
                acceptMutation={useConfirmCancellationByIsuuingManger}
                rejectMutation={useRejectCancellationByIsuuingManager}
                refetch={() => {}}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export { IssuingManagerContainer };
