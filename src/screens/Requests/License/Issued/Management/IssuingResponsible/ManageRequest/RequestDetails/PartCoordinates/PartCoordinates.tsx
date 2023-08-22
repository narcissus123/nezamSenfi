import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { PartCoordinatesList } from "../../../../../../../../../components/Requests/License/Issued/Management/IssuingResponsibleContainer/ManageRequest/RequestDetails/PrintRequestList/PartCoordinatesList/PartCoordinatesList";

const PartCoordinates: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="جزئیات درخواست"
        breadCrumbParent="کارتابل من"
        parentLink="/ManageLicense/IssuingResponsible/MyCartable"
        breadCrumbActive="مختصات قطعه"
      />

      <PartCoordinatesList />
    </>
  );
};

export { PartCoordinates };
