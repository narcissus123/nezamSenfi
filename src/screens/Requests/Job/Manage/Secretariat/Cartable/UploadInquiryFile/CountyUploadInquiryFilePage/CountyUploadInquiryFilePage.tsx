import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { CountyUploadInquiryFiles } from "../../../../../../../../components/Requests/Job/Manage/Secretariat/Cartable/UploadInquiryFiles/CountyUploadInquiryFiles/CountyUploadInquiryFiles";

const CountyUploadInquiryFilePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="تطبیق و اصلاح نامه ها"
        breadCrumbParent="کارتابل دبیرخانه"
        parentLink="/ManageCartable/CountyJobRequestCartable"
        breadCrumbActive="تطبیق و اصلاح نامه ها شهرستانی"
      />
      <CountyUploadInquiryFiles />
    </>
  );
};
export { CountyUploadInquiryFilePage };
