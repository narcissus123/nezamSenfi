import React from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { CountyContract } from "../../../../../../../../components/Requests/Job/Manage/Secretariat/Cartable/ContractDraftContainer/CountyContract/CountyContract";

const CountyContractScreen = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbParent2="لیست درخواست ها"
        parentLink2="/ManageCartable/CountyJobRequestCartable"
        breadCrumbActive="ثبت ضامن ها"
      />
      <CountyContract />
    </>
  );
};

export { CountyContractScreen };
