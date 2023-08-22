import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

import { UnionContract } from "../../../../../../../../components/Requests/Job/Manage/Secretariat/Cartable/ContractDraftContainer/UnionContract/UnionContract";

const UnionContractScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbParent2="لیست درخواست ها"
        parentLink2="/ManageCartable/UnionJobRequestCartable"
        breadCrumbActive="ثبت ضامن ها"
      />
      <UnionContract />
    </>
  );
};

export { UnionContractScreen };
