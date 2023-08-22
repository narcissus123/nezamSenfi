import React, { FC } from "react";
import { useParams } from "react-router";
import {
  useGetCountyGuildRooomPostionRequestRate,
  usePayCountyGuildRooomPostionRequestRate,
} from "../../../../../../core/services/api";
import { ConfirmPayment } from "../../../../../WalletContainer/ConfirmPayment/ConfirmPayment";

const CountyConfirmPayment: FC = () => {
  const { req_id }: any = useParams();

  const getRate = useGetCountyGuildRooomPostionRequestRate(+req_id);
  const payMutation = usePayCountyGuildRooomPostionRequestRate();

  return (
    <ConfirmPayment
      getRequestRate={getRate}
      payMutation={payMutation}
      redirectLink="/Requests/CountyJobRequest/List"
    />
  );
};

export { CountyConfirmPayment };
