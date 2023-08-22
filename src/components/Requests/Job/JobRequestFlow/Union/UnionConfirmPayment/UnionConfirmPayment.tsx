import React, { FC } from "react";
import { useParams } from "react-router";
import {
  useGetCountyUnionPostionRequestRate,
  usePayCountyUnionPostionRequestRate,
} from "../../../../../../core/services/api";
import { ConfirmPayment } from "../../../../../WalletContainer/ConfirmPayment/ConfirmPayment";

const UnionConfirmPayment: FC = () => {
  const { req_id }: any = useParams();

  const getRate = useGetCountyUnionPostionRequestRate(+req_id);
  const payMutation = usePayCountyUnionPostionRequestRate();

  return (
    <ConfirmPayment
      getRequestRate={getRate}
      payMutation={payMutation}
      redirectLink="/Requests/UnionJobRequest/List"
    />
  );
};

export { UnionConfirmPayment };
