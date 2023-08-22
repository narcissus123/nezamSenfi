import React, { FC } from "react";
import { useParams } from "react-router";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { ExpertReportList } from "../../../../../../components/Guilds&UnionsContainer/UnionsContainer/Unions/UnionUsersList/ExpertReportList/ExpertReportList";

const ExpertReportListPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="کاربران اتحادیه "
        breadCrumbParent="لیست اتحادیه ها"
        parentLink={`/Unions/UnionEdit/admin/${id}`}
        breadCrumbActive={`گزارشات کارشناس`}
      />
      <ExpertReportList />
    </>
  );
};

export { ExpertReportListPage };
