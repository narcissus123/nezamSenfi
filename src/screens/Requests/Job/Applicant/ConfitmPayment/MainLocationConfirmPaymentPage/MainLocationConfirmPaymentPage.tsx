import React, { FC } from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { MainLocationConfirmPayment } from "../../../../../../components/Requests/Job/JobRequestFlow/MainLocation/MainLocationConfirmPayment/MainLocationConfirmPayment";

const MainLocationConfirmPaymentPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="کیف پول"
        breadCrumbParent="درخواست های کشوری"
        parentLink="/Requests/MainLocationJobRequest/List"
        breadCrumbActive="پرداخت هزینه"
      />

      <MainLocationConfirmPayment />
    </>
  );
};

export { MainLocationConfirmPaymentPage };
