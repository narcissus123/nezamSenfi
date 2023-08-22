import * as React from "react";
import { IssuingManagerContainer } from "../../../../../components/Requests/License/Cancellation/IssuingManagerContainer/IssuingManagerContainer";

const IssuingManager = () => {
  return (
    <>
      {/* <BreadCrumbs
        breadCrumbTitle="ابطال"
        breadCrumbParent="پروانه های من"
        parentLink="/MyLicense"
        breadCrumbActive="ابطال پروانه"
      />
      <SelectCancellationReasonContainer /> */}
       <IssuingManagerContainer />
    </>
  );
};

export { IssuingManager };
