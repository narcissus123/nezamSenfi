import React, { FC, useState  } from "react";
import { Alert, Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { useGetLicenseRequestDetailByIssuingResponsible } from "../../../../../core/services/api";
import { useSetNumberAndDateOfCancellation } from "../../../../../core/services/api/cancelation.api";
import { SubmitButton } from "../../../../common/Form";
import { LicenseDetails } from "../LicenseDetails/LicenseDetails";
import { ConfirmModal } from "./ConfirmModal/ConfirmModal";


interface IPropTypes {

}

const SecretariatContainer: FC<IPropTypes> = ({ }) => {

  const [showCheckModal, setShowCheckModal] = useState<any>(false);

  return (
    <>
      <ConfirmModal
        acceptMutation={useSetNumberAndDateOfCancellation}
        isOpen={showCheckModal}
        title="تایید درخواست"
        toggleModal={() => setShowCheckModal((val: any) => !val)}
      />
      <Card>
        <CardHeader>
          <CardTitle>تایید ابطال</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <LicenseDetails
                isApplicant={false}
                isSecretariat={true}
                getQuery={useGetLicenseRequestDetailByIssuingResponsible}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "25px" }}>
            <Col>
              <Alert color="info" className="w-100 m-0 text-center">
                در صورت تایید، این درخواست به کارتابل شما اضافه می شود.
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col sm="4">
              <SubmitButton
                isLoading={false}
                btnText="تایید "
                onClick={() => setShowCheckModal(true)}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export { SecretariatContainer };
