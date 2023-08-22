import * as React from "react";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { useConfirmIdentityChangeRequestByIssuingResponsible, useRejectIdentityChangeRequestByIssuingResponsible } from "../../../../../core/services/api/identity-change-request";
import { RequestDetail } from "../../Applicant/RequestDetails/Details/RequestDetail/RequestDetail";
import { CheckComponent } from "./CheckComponent/CheckComponent";


interface IPropTypes {
  getQuery: any
}
const RequestDetails: FC<IPropTypes> = ({ getQuery }) => {

  const { id } = useParams<any>();
  const [requestInfo, setRequestInfo] = useState<any>(null);

  
  const { isSuccess, data, isFetching } = getQuery(id);

  useEffect(() => {
    if (data && data.data.result)
      try {
        const result = data.data.result;
        setRequestInfo(result);
      } catch (err) {
      }
  }, [isSuccess]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>جزئیات درخواست</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col>
            <RequestDetail requestInfo={requestInfo} />
          </Col>
        </Row>
        <Row>
          <Col>
            <CheckComponent
              acceptMutation={
                useConfirmIdentityChangeRequestByIssuingResponsible
              }
              rejectMutation={
                useRejectIdentityChangeRequestByIssuingResponsible
              }
              refetch={() => {}}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export { RequestDetails };
