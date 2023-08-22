import * as React from "react";
import { FC, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { UserRoles } from "../../../../../core/enums";
import { useGetUserLegalIdentityChangeInformationById, useGetUserRealIdentityChangeInformationById } from "../../../../../core/services/api/change-user-identity-request.api";
import { Can } from "../../../../common/Wrapper/Can/Can";
import { Details } from "./Details/Details";


const RequestDetails: FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>جزئیات درخواست</CardTitle>
      </CardHeader>
      <CardBody>
        <Can roles={[UserRoles.UserReal]}>
          <Details userType="real" getQuery={useGetUserRealIdentityChangeInformationById} />
        </Can>
        <Can roles={[UserRoles.UserLegal]}>
          <Details userType="legal" getQuery={useGetUserLegalIdentityChangeInformationById} />
        </Can>
      </CardBody>
    </Card>
  );
};

export { RequestDetails };
