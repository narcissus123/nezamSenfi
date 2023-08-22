import React, { FC } from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { ProvinceConfirmPayment } from "../../../../../../components/Requests/Job/JobRequestFlow/Province/ProvinceConfirmPayment/ProvinceConfirmPayment";

const ProvinceConfirmPaymentPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="کیف پول"
        breadCrumbParent="درخواست های استانی"
        parentLink="/Requests/ProvinceJobRequest/List"
        breadCrumbActive="پرداخت هزینه"
      />

      <ProvinceConfirmPayment />
    </>
  );
};

export { ProvinceConfirmPaymentPage };
