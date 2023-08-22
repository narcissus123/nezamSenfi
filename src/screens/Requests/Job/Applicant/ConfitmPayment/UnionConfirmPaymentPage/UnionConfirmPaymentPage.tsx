import React, { FC } from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { UnionConfirmPayment } from "../../../../../../components/Requests/Job/JobRequestFlow/Union/UnionConfirmPayment/UnionConfirmPayment";

const UnionConfirmPaymentPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="کیف پول"
        breadCrumbParent="درخواست های اتحادیه"
        parentLink="/Requests/UnionJobRequest/List"
        breadCrumbActive="پرداخت هزینه"
      />

      <UnionConfirmPayment />
    </>
  );
};

export { UnionConfirmPaymentPage };
