import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { CountyNoticeForPresence } from "../../../../../../../../components/Requests/Job/Manage/Secretariat/Cartable/NoticeForPresence/CountyNoticeForPresence/CountyNoticeForPresence";

const CountyNoticeForPresencePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اعلان برای حضور"
        breadCrumbParent="کارتابل دبیرخانه شهرستانی"
        parentLink="/ManageCartable/CountyJobRequestCartable"
        breadCrumbActive="اعلان برای حضور شهرستانی"
      />
      <CountyNoticeForPresence />
    </>
  );
};

export { CountyNoticeForPresencePage };
