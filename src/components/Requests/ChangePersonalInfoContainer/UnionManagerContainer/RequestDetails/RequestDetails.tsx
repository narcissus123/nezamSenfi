import * as React from "react";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { useChangeIssuingResponsibleOfIdentitychangeRequest, useGetIssuingResponsibleOfIdentitychangeRequest } from "../../../../../core/services/api/identity-change-request";
import { ChangeSecretariat } from "../../../../common/ChangeSecretariat/ChangeSecretariat";
import { SimpleSubmitButton } from "../../../../common/Form";
import { RequestDetail } from "../../Applicant/RequestDetails/Details/RequestDetail/RequestDetail";


interface IPropTypes { 
  getQuery: any
}

const RequestDetails: FC<IPropTypes> = ({ getQuery }) => {
  const [isChangeIssuingResponsibleOpen, setIsChangeIssuingResponsibleOpen] =
    useState<boolean>(false);
  const { id } = useParams<any>();
  const [requestInfo, setRequestInfo] = useState<any>(null);

  const { isSuccess, data, isFetching } = getQuery(id);

  useEffect(() => {
    if (data && data.data.result)
      try {
        const result = data.data.result;
        setRequestInfo(result);
      } catch (err) {}
  }, [isSuccess]);

  return (
    <Card>
      {isChangeIssuingResponsibleOpen && (
        <ChangeSecretariat
          hasSecretariat={true}
          isOpen={isChangeIssuingResponsibleOpen}
          toggleModal={() => setIsChangeIssuingResponsibleOpen(false)}
          getUserQuery={useGetIssuingResponsibleOfIdentitychangeRequest}
          useMutate={useChangeIssuingResponsibleOfIdentitychangeRequest}
        />
      )}
      <CardHeader>
        <CardTitle>جزئیات درخواست</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col>
            <RequestDetail requestInfo={requestInfo} />
          </Col>
        </Row>
        <Row style={{marginTop: "20px"}}>
          <Col>
            <SimpleSubmitButton
              isLoading={false}
              btnText="تغییر مسئول صدور"
              onCLick={() => setIsChangeIssuingResponsibleOpen(true)}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export { RequestDetails };
