import React from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { ProvinceContract } from "../../../../../../../../components/Requests/Job/Manage/Secretariat/Cartable/ContractDraftContainer/ProvinceContract/ProvinceContract";

const ProvinceContractScreen = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbParent2="لیست درخواست ها"
        parentLink2="/ManageCartable/ProvinceJobRequestCartable"
        breadCrumbActive="ثبت ضامن ها"
      />
      <ProvinceContract />
    </>
  );
};

export { ProvinceContractScreen };
