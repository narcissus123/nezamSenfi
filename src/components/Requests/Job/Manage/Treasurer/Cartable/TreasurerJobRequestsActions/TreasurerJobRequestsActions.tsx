import React from "react";
import { Edit } from "react-feather";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { Button } from "reactstrap";
import { IsSameUrl } from "../../../../../../../core/utils";

interface IPropTypes {
  cell: {
    row: {
      values: { positionRequestId: number };
    };
  };
}

const TreasurerJobRequestsActions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { positionRequestId: id },
    },
  },
}) => {
  const history = useHistory();
  const location = useLocation();

  const checkRequest = () => {
    if (
      IsSameUrl(
        location.pathname,
        "/ManageCartable/CountyTreasurerJobRequestCartable"
      )
    ) {
      history.push(
        `/ManageRequests/TreasurerJobRequestslist/ConfirmCounty/${id}`
      );
    } else if (
      IsSameUrl(
        location.pathname,
        "/ManageCartable/ProvinceTreasurerJobRequestCartable"
      )
    ) {
      history.push(
        `/ManageRequests/TreasurerJobRequestslist/ConfirmProvince/${id}`
      );
    } else if (
      IsSameUrl(
        location.pathname,
        "/ManageCartable/UnionTreasurerJobRequestCartable"
      )
    ) {
      history.push(
        `/ManageRequests/TreasurerJobRequestslist/ConfirmUnion/${id}`
      );
    } else if (
      IsSameUrl(
        location.pathname,
        "/ManageCartable/MainLocationTreasurerJobRequestCartable"
      )
    ) {
      history.push(
        `/ManageRequests/TreasurerJobRequestslist/ConfirmMainLocation/${id}`
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-content-center">
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() => checkRequest()}
      >
        بررسی درخواست &nbsp;
        <Edit
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { TreasurerJobRequestsActions };
