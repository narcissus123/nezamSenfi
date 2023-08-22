import * as React from "react";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { CancellationPayContainer } from "../../../../../../components/Requests/License/Cancellation/Applicant/CancellationPayContainer/CancellationPayContainer";
import { usePayLicenseRequest } from "../../../../../../core/services/api";
import { useGetLicenseRequestCansellationRate } from "../../../../../../core/services/api/cancelation.api";

const CancellationPay = () => {

  const { id }: any = useParams();
  
  const getRequestRate = useGetLicenseRequestCansellationRate(+id)
  const payMutation = usePayLicenseRequest();
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="ابطال"
        breadCrumbParent="لیست پروانه های من"
        parentLink="/MyLicense"
        breadCrumbActive="پرداخت هزینه ابطال"
      />
      <CancellationPayContainer getRequestRate={getRequestRate} payMutation={payMutation} redirectLink="/MyLicense" isDone={false} isLicense={false} />
    </>
  );
};

export { CancellationPay };
