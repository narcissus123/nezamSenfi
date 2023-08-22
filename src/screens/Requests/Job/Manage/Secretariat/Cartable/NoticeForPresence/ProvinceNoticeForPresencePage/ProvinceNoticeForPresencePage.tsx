import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { ProvinceNoticeForPresence } from "../../../../../../../../components/Requests/Job/Manage/Secretariat/Cartable/NoticeForPresence/ProvinceNoticeForPresence/ProvinceNoticeForPresence";

const ProvinceNoticeForPresencePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اعلان برای حضور"
        breadCrumbParent="کارتابل دبیرخانه استانی"
        parentLink="/ManageCartable/ProvinceJobRequestCartable"
        breadCrumbActive="اعلان برای حضور استانی"
      />
      <ProvinceNoticeForPresence />
    </>
  );
};

export { ProvinceNoticeForPresencePage };
