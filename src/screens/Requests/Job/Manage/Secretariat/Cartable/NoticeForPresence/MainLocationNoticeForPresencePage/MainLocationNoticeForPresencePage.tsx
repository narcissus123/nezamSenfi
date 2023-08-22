import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { MainLocationNoticeForPresence } from "../../../../../../../../components/Requests/Job/Manage/Secretariat/Cartable/NoticeForPresence/MainLocationNoticeForPresence/MainLocationNoticeForPresence";

const MainLocationNoticeForPresencePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اعلان برای حضور"
        breadCrumbParent="کارتابل دبیرخانه کشوری"
        parentLink="/ManageCartable/MainLocationJobRequestCartable"
        breadCrumbActive="اعلان برای حضور کشوری"
      />
      <MainLocationNoticeForPresence />
    </>
  );
};

export { MainLocationNoticeForPresencePage };
