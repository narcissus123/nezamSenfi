import * as React from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { SelectCancellationReasonContainerNew } from "../../../../../../components/Requests/License/Cancellation/Applicant/SelectCancellationReasonContainerNew/SelectCancellationReasonContainerNew";

const SelectCancellationReasonNew = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="ابطال"
        breadCrumbParent="پروانه های من"
        parentLink="/MyLicense"
        breadCrumbActive="ابطال پروانه"
      />
      <SelectCancellationReasonContainerNew />
    </>
  );
};

export { SelectCancellationReasonNew };
