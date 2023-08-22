import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { UnionNoticeForPresence } from "../../../../../../../../components/Requests/Job/Manage/Secretariat/Cartable/NoticeForPresence/UnionNoticeForPresence/UnionNoticeForPresence";

const UnionNoticeForPresencePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اعلان برای حضور"
        breadCrumbParent="کارتابل دبیرخانه اتحادیه"
        parentLink="/ManageCartable/UnionJobRequestCartable"
        breadCrumbActive="اعلان برای حضور اتحادیه"
      />
      <UnionNoticeForPresence />
    </>
  );
};

export { UnionNoticeForPresencePage };
