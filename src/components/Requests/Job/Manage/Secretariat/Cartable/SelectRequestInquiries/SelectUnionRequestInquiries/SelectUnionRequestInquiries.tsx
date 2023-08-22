import React, { FC } from "react";
import { useSelectUnionGuildRoomPositionRequestInquriesBySecretriat } from "../../../../../../../../core/services/api";
import BreadCrumbs from "../../../../../../../common/@vuexy/breadCrumbs/BreadCrumb";
import { SelectRequestInquiries } from "../SelectRequestInquiries";



const SelectUnionRequestInquiries: FC = () => {
  const selectUnionInquiries = useSelectUnionGuildRoomPositionRequestInquriesBySecretriat();
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="نامه استعلامات"
        breadCrumbParent="کارتابل"
        parentLink="/ManageCartable/UnionJobRequestCartable"
        breadCrumbActive="نامه استعلامات"
      />
      <SelectRequestInquiries
        url="/ManageCartable/UnionJobRequestCartable"
        useMutate={selectUnionInquiries}
      />
    </>
  );
};

export { SelectUnionRequestInquiries };
