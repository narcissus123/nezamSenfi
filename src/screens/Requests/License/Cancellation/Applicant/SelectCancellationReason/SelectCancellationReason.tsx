import * as React from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { SelectCancellationReasonContainer } from "../../../../../../components/Requests/License/Cancellation/Applicant/SelectCancellationReasonContainer/SelectCancellationReasonContainer";

const SelectCancellationReason = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="ابطال"
        breadCrumbParent="پروانه های من"
        parentLink="/MyLicense"
        breadCrumbActive="ابطال پروانه"
      />
      <SelectCancellationReasonContainer />
    </>
  );
};

export { SelectCancellationReason };
