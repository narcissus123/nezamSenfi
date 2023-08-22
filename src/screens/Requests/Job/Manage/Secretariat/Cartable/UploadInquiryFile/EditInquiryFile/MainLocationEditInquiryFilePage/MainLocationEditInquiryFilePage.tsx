import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { MainLocationEditInquiryFiles } from "../../../../../../../../../components/Requests/Job/Manage/Secretariat/Cartable/UploadInquiryFiles/EditInquiryFiles/MainLocationEditInquiryFiles/MainLocationEditInquiryFiles";

const MainLocationEditInquiryFilePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اصلاح پاسخ استعلامات"
        breadCrumbParent="کارتابل دبیرخانه"
        parentLink="/ManageCartable/MainLocationJobRequestCartable"
        breadCrumbActive="اصلاح پاسخ استعلامات کشوری"
      />
      <MainLocationEditInquiryFiles />
    </>
  );
};
export { MainLocationEditInquiryFilePage };
