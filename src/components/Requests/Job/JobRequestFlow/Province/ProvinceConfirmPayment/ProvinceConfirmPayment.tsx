import React, { FC } from "react";
import { useParams } from "react-router";
import {
  useGetProvinceGuildRoomPostionRequestRate,
  usePayProvinceGuildRoomPostionRequestRate,
} from "../../../../../../core/services/api";
import { ConfirmPayment } from "../../../../../WalletContainer/ConfirmPayment/ConfirmPayment";

const ProvinceConfirmPayment: FC = () => {
  const { req_id }: any = useParams();

  const getRate = useGetProvinceGuildRoomPostionRequestRate(+req_id);
  const payMutation = usePayProvinceGuildRoomPostionRequestRate();

  return (
    <ConfirmPayment
      getRequestRate={getRate}
      payMutation={payMutation}
      redirectLink="/Requests/ProvinceJobRequest/List"
    />
  );
};

export { ProvinceConfirmPayment };
