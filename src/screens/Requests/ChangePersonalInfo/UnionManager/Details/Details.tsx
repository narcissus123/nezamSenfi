import * as React from "react";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { RequestDetails } from "../../../../../components/Requests/ChangePersonalInfoContainer/UnionManagerContainer/RequestDetails/RequestDetails";
import { useGetUserLegalIdentityChangeInformationById, useGetUserRealIdentityChangeInformationById,  } from "../../../../../core/services/api/identity-change-request";

const Details = () => {
  const { userType } = useParams<any>(); 
  
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="تغییر اطلاعات هویتی"
        breadCrumbParent="لیست درخواست ها"
        parentLink="/ChangeUserInfoManagement/UnionManager/list"
        breadCrumbActive="جزئیات درخواست تغییر اطلاعات هویتی"
      />
      <RequestDetails
        getQuery={
          userType === "1"
            ? useGetUserRealIdentityChangeInformationById
            : useGetUserLegalIdentityChangeInformationById
        }
      />
    </>
  );
};

export { Details };
