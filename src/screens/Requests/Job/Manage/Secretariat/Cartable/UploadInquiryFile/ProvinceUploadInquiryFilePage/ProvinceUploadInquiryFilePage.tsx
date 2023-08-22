import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { ProvinceUploadInquiryFiles } from "../../../../../../../../components/Requests/Job/Manage/Secretariat/Cartable/UploadInquiryFiles/ProvinceUploadInquiryFiles/ProvinceUploadInquiryFiles";

const ProvinceUploadInquiryFilePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="تطبیق و اصلاح نامه ها"
        breadCrumbParent="کارتابل دبیرخانه"
        parentLink="/ManageCartable/ProvinceJobRequestCartable"
        breadCrumbActive="تطبیق و اصلاح نامه ها استانی"
      />
      <ProvinceUploadInquiryFiles />
    </>
  );
};
export { ProvinceUploadInquiryFilePage };
