import React from "react";
import { Printer } from "react-feather";
import { useHistory, useParams } from "react-router-dom";
import { Button, ListGroup, ListGroupItem } from "reactstrap";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
    };
  };
}

const SectionCell: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
    },
  },
}) => {
  const history = useHistory();

  const goToPartCoordinates = () => {
    history.push("/ManageLicense/IssuingResponsible/PartCoordinates/" + id);
  };

  const { status, req_id } = useParams<any>();
  
  return (
    <div
      className="d-flex justify-content-center align-content-center"
      style={{ width: "100%" }}
    >
      <ListGroup className="list-group" style={{ width: "100%" }}>
        <ListGroupItem
          style={{ width: "100%" }}
          className="d-flex justify-content-between align-items-center"
          tag="div"
        >
          <span>پلان موقعیت قطعه</span>
          <Button
            style={{ margin: "3px" }}
            size="sm"
            color="warning"
            onClick={() => {
              history.push(
                `/ManageLicense/IssuingResponsible/LocationPlanning/${status}/${req_id}/${id}`
              );
            }}
          >
            ثبت &nbsp;
            <Printer size={12} color="white" />
          </Button>
        </ListGroupItem>
        {/* <ListGroupItem
          className="d-flex justify-content-between align-items-center"
          style={{ width: "100%" }}
          tag="div"
        >
          <span>تاسیسات قطعه</span>
          <Button
            style={{ margin: "3px" }}
            size="sm"
            color="warning"
            onClick={() => {
              history.push(
                `/ManageLicense/IssuingResponsible/FacilityPlanning/${status}/${req_id}/${id}`
              );
            }}
          >
            ثبت &nbsp;
            <Printer size={12} color="white" />
          </Button>
        </ListGroupItem> */}
      </ListGroup>
    </div>
  );
};

export { SectionCell };
