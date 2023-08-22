import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { UnionUploadInquiryFiles } from "../../../../../../../../components/Requests/Job/Manage/Secretariat/Cartable/UploadInquiryFiles/UnionUploadInquiryFiles/UnionUploadInquiryFiles";

const UnionUploadInquiryFilePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="تطبیق و اصلاح نامه ها"
        breadCrumbParent="کارتابل دبیرخانه"
        parentLink="/ManageCartable/UnionJobRequestCartable"
        breadCrumbActive="تطبیق و اصلاح نامه ها اتحادیه"
      />
      <UnionUploadInquiryFiles />
    </>
  );
};
export { UnionUploadInquiryFilePage };
