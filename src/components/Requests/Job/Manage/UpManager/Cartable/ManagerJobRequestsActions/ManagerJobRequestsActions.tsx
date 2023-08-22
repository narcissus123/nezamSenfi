import React from "react";
import { Edit } from "react-feather";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { Button } from "reactstrap";
import { IsSameUrl } from "../../../../../../../core/utils";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number; status: any };
    };
  };
}

const ManagerJobRequestsActions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id, status },
    },
  },
}) => {
  const history = useHistory();
  const location = useLocation();

  const onActionClick = () => {
    if (
      IsSameUrl(location.pathname, "/ManageCartable/CountyUpManagerJobRequestCartable")
    ) {
      history.push(`/ManageRequests/UpManagerJobRequests/County/${id}`)
    } else if (
      IsSameUrl(location.pathname, "/ManageCartable/ProvinceUpManagerJobRequestCartable")
    ) {
      history.push(`/ManageRequests/UpManagerJobRequests/Province/${id}`)
    } else if (
      IsSameUrl(location.pathname, "/ManageCartable/UnionUpManagerJobRequestCartable")
    ) {
      history.push(`/ManageRequests/UpManagerJobRequests/Union/${id}`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-content-center">
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={onActionClick}
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

export { ManagerJobRequestsActions };
