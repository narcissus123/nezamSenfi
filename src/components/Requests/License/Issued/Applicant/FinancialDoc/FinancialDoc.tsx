import React, { FC, useEffect } from "react";
import { useParams } from "react-router";
import { Alert, Col, Row } from "reactstrap";
import { LicenseRequestStatusEnum } from "../../../../../../core/enums/license-request-status.enums";
import {
  usePayLicenseRequest,
  usePostGetLicenseRequestRateById,
} from "../../../../../../core/services/api";
import { ConfirmPayment } from "../../../../../WalletContainer/ConfirmPayment/ConfirmPayment";
import { UserTransactionListContainer } from "./UserTransactionListContainer/UserTransactionListContainer";

const FinancialDoc: FC = () => {
  const { req_id, status }: any = useParams();

  const getRate = usePostGetLicenseRequestRateById();
  const payMutation = usePayLicenseRequest();

  useEffect(() => {
    if (+status <= 1 || +status === 18) getRate.mutate(+req_id);
  }, []);

  return (
    <>
      {+status > 1 && +status !== 18 && (
        <Alert color="info">با موفقیت پرداخت شده است</Alert>
      )}
      {(+status <=
        LicenseRequestStatusEnum.LicenseRequestAndWaitingForPayment ||
        +status ===
          LicenseRequestStatusEnum.WaitingForPaymentAfterMatching) && (
        <ConfirmPayment
          getRequestRate={getRate}
          payMutation={payMutation}
          redirectLink={
            +status === 18
              ? `/License/List`
              : `/License/Issued/2/SetExpert/${req_id}`
          }
          title="پرداخت هزینه درخواست"
          isLicense
          isDone={+status > 1 && +status !== 18}
        />
      )}

      <Row>
        <Col>
         <UserTransactionListContainer />
        </Col>
      </Row>
    </>
  );
};

export { FinancialDoc };
