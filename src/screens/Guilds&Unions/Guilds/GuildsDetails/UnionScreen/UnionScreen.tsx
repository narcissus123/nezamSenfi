import React, { FC } from "react";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { GuildDetails } from "../../../../../components/Guilds&UnionsContainer/UnionsContainer/Unions/GuildDetails/GuildDetails";


const UnionScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اتحادیه"
        breadCrumbParent="پیشخوان"
        parentLink={`/`}
        breadCrumbActive={"جزئیات اتحادیه"}
      />
      <GuildDetails />
    </>
  );
};

export { UnionScreen };
