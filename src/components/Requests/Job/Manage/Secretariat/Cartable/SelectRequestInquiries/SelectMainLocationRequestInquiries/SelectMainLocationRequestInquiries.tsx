import React, { FC } from "react";
import { useSelectMainLocationGuildRoomPositionReuestInquriesBySecretriat } from "../../../../../../../../core/services/api";
import BreadCrumbs from "../../../../../../../common/@vuexy/breadCrumbs/BreadCrumb";
import { SelectRequestInquiries } from "../SelectRequestInquiries";



const SelectMainLocationRequestInquiries: FC = () => {
  const selectMainLocationInquiries = useSelectMainLocationGuildRoomPositionReuestInquriesBySecretriat();
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="نامه استعلامات"
        breadCrumbParent="کارتابل"
        parentLink="/ManageCartable/MainLocationJobRequestCartable"
        breadCrumbActive="نامه استعلامات"
      />
      <SelectRequestInquiries
        url="/ManageCartable/MainLocationJobRequestCartable"
        useMutate={selectMainLocationInquiries}
      />
    </>
  );
};

export { SelectMainLocationRequestInquiries };
