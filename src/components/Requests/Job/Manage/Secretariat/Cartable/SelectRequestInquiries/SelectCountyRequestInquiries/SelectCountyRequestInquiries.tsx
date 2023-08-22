import React, { FC } from "react";
import { useSelectCountyGuildRoomPositionRequestInquriesBySecretriat } from "../../../../../../../../core/services/api";
import BreadCrumbs from "../../../../../../../common/@vuexy/breadCrumbs/BreadCrumb";
import { SelectRequestInquiries } from "../SelectRequestInquiries";



const SelectCountyRequestInquiries: FC = () => {
  const selectCountyInquiries = useSelectCountyGuildRoomPositionRequestInquriesBySecretriat();
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="نامه استعلامات"
        breadCrumbParent="کارتابل"
        parentLink="/ManageCartable/CountyJobRequestCartable"
        breadCrumbActive="نامه استعلامات"
      />
      <SelectRequestInquiries
        url="/ManageCartable/CountyJobRequestCartable"
        useMutate={selectCountyInquiries}
      />
    </>
  );
};

export { SelectCountyRequestInquiries };
