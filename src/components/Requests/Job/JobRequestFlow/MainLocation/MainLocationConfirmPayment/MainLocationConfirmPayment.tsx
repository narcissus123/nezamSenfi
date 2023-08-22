import React, { FC } from "react";
import { useParams } from "react-router";
import {
  useGetMainLocationGuildRoomPostionRequestRate,
  usePayMainLocationGuildRoomPostionRequestRate,
} from "../../../../../../core/services/api";
import { ConfirmPayment } from "../../../../../WalletContainer/ConfirmPayment/ConfirmPayment";

const MainLocationConfirmPayment: FC = () => {
  const { req_id }: any = useParams();

  const getRate = useGetMainLocationGuildRoomPostionRequestRate(+req_id);
  const payMutation = usePayMainLocationGuildRoomPostionRequestRate();

  return (
    <ConfirmPayment
      getRequestRate={getRate}
      payMutation={payMutation}
      redirectLink="/Requests/MainLocationJobRequest/List"
    />
  );
};

export { MainLocationConfirmPayment };
