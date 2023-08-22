import React from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

import { MainLocationContract } from "../../../../../../../../components/Requests/Job/Manage/Secretariat/Cartable/ContractDraftContainer/MainLocationContract/MainLocationContract";

const MainLocationContractScreen = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbParent2="لیست درخواست ها"
        parentLink2="/ManageCartable/MainLocationJobRequestCartable"
        breadCrumbActive="ثبت ضامن ها"
      />
      <MainLocationContract />
    </>
  );
};

export { MainLocationContractScreen };
