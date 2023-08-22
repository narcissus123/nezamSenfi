import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { ProvinceEditInquiryFiles } from "../../../../../../../../../components/Requests/Job/Manage/Secretariat/Cartable/UploadInquiryFiles/EditInquiryFiles/ProvinceEditInquiryFiles/ProvinceEditInquiryFiles";

const ProvinceEditInquiryFilePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اصلاح پاسخ استعلامات"
        breadCrumbParent="کارتابل دبیرخانه"
        parentLink="/ManageCartable/ProvinceJobRequestCartable"
        breadCrumbActive="اصلاح پاسخ استعلامات استانی"
      />
      <ProvinceEditInquiryFiles />
    </>
  );
};
export { ProvinceEditInquiryFilePage };
