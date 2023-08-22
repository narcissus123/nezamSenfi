import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { SendJahadIdea } from "../../../../../../../components/Requests/License/Issued/Management/JahadContainer/SendJahadIdea";

const SendJahadIdeaPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="صدور پروانه"
        breadCrumbParent="کارتابل من"
        parentLink="/ManageLicense/JahadCenterManager/MyCartable"
        breadCrumbActive="ثبت نظر جهاد"
      />
      <SendJahadIdea />
    </>
  );
};

export { SendJahadIdeaPage };
