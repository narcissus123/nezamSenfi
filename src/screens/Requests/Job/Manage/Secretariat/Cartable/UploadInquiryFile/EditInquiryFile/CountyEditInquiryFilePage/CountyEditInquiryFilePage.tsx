import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { CountyEditInquiryFiles } from "../../../../../../../../../components/Requests/Job/Manage/Secretariat/Cartable/UploadInquiryFiles/EditInquiryFiles/CountyEditInquiryFiles/CountyEditInquiryFiles";

const CountyEditInquiryFilePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اصلاح پاسخ استعلامات"
        breadCrumbParent="کارتابل دبیرخانه"
        parentLink="/ManageCartable/CountyJobRequestCartable"
        breadCrumbActive="اصلاح پاسخ استعلامات شهرستانی"
      />
      <CountyEditInquiryFiles />
    </>
  );
};
export { CountyEditInquiryFilePage };
