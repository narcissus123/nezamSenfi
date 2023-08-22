import React, { FC } from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { CountyConfirmPayment } from "../../../../../../components/Requests/Job/JobRequestFlow/County/CountyConfirmPayment/CountyConfirmPayment";

const CountyConfirmPaymentPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="کیف پول"
        breadCrumbParent="درخواست های شهرستانی"
        parentLink="/Requests/CountyJobRequest/List"
        breadCrumbActive="پرداخت هزینه"
      />

      <CountyConfirmPayment />
    </>
  );
};

export { CountyConfirmPaymentPage };
