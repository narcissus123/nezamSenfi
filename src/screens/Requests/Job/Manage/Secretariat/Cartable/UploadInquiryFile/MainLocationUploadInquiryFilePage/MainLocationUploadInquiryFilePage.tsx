import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { MainLocationUploadInquiryFiles } from "../../../../../../../../components/Requests/Job/Manage/Secretariat/Cartable/UploadInquiryFiles/MainLocationUploadInquiryFiles/MainLocationUploadInquiryFiles";

const MainLocationUploadInquiryFilePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="تطبیق و اصلاح نامه ها"
        breadCrumbParent="کارتابل دبیرخانه"
        parentLink="/ManageCartable/MainLocationJobRequestCartable"
        breadCrumbActive="تطبیق و اصلاح نامه ها کشوری"
      />
      <MainLocationUploadInquiryFiles />
    </>
  );
};
export { MainLocationUploadInquiryFilePage };
