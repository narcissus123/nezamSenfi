import * as React from "react";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { PayContainer } from "../../../../../components/Requests/ChangePersonalInfoContainer/Applicant/PayContainer/PayContainer";
import { useGetIdentityChangeRequestRate, usePayIdentityChange } from "../../../../../core/services/api/identity-change-request";

const Pay = () => {

  const { id } = useParams<any>();
  const getRate = useGetIdentityChangeRequestRate(+id);
  const payMutation = usePayIdentityChange();

  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="تغییر اطلاعات هویتی"
        breadCrumbParent="لیست درخواست های من"
        parentLink="/ChangePersonalInfo/List"
        breadCrumbActive="پرداخت"
      />
      <PayContainer
        getRequestRate={getRate}
        payMutation={payMutation}
        redirectLink="/ChangePersonalInfo/List"
      />
    </>
  );
};

export { Pay };
