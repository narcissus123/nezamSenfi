import React, { FC } from "react";
import { useSelectProvinceGuildRoomPositionRequestInquriesBySecretriat } from "../../../../../../../../core/services/api";
import BreadCrumbs from "../../../../../../../common/@vuexy/breadCrumbs/BreadCrumb";
import { SelectRequestInquiries } from "../SelectRequestInquiries";



const SelectProvinceRequestInquiries: FC = () => {
  const selectProvinceInquiries = useSelectProvinceGuildRoomPositionRequestInquriesBySecretriat();
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="نامه استعلامات"
        breadCrumbParent="کارتابل"
        parentLink="/ManageCartable/ProvinceJobRequestCartable"
        breadCrumbActive="نامه استعلامات"
      />
      <SelectRequestInquiries
        url="/ManageCartable/ProvinceJobRequestCartable"
        useMutate={selectProvinceInquiries}
      />
    </>
  );
};

export { SelectProvinceRequestInquiries };
