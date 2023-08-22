import * as React from "react";
import { UserRoles } from "../../../../../../core/enums";
import { Can } from "../../../../../common/Wrapper/Can/Can";
import { LegalIdentityInfo } from "./LegalIdentityInfo/LegalIdentityInfo";
import { RealIdentityInfo } from "./RealIdentityInfo/RealIdentityInfo";

const NewContainer = () => {
  return (
    <>
    <Can roles={[UserRoles.UserReal]}>
      <RealIdentityInfo />
    </Can>
    <Can roles={[UserRoles.UserLegal]}>
      <LegalIdentityInfo />
    </Can>
    </>
  );
};

export { NewContainer };
