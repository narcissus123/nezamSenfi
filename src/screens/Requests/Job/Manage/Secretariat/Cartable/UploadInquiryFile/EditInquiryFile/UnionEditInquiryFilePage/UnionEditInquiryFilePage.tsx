import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { UnionEditInquiryFiles } from "../../../../../../../../../components/Requests/Job/Manage/Secretariat/Cartable/UploadInquiryFiles/EditInquiryFiles/UnionUploadInquiryFiles/UnionEditInquiryFiles";

const UnionEditInquiryFilePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اصلاح پاسخ استعلامات"
        breadCrumbParent="کارتابل دبیرخانه"
        parentLink="/ManageCartable/UnionJobRequestCartable"
        breadCrumbActive="اصلاح پاسخ استعلامات اتحادیه"
      />
      <UnionEditInquiryFiles />
    </>
  );
};
export { UnionEditInquiryFilePage };
