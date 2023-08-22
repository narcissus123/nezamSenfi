import React from "react";
import { Printer } from "react-feather";
import { Link, useHistory } from "react-router-dom";
import { Button, ListGroup, ListGroupItem } from "reactstrap";

interface IPropTypes {
  cell: {
    row: {
      original: { sectionId: number  , id: number};
    };
  };
  reqId: any
  isSecretariat?: boolean
}

const SectionCell: React.FC<IPropTypes> = ({
  cell: {
    row: {
      original: { sectionId , id },
    },
  },
  reqId,
  isSecretariat
}) => {
  const history = useHistory();

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
          <Link
            to={`/license/utm/land/${
              isSecretariat ? "secretariat/" : ""
            }SectionPlan/${reqId}/${sectionId ? sectionId : id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              style={{ margin: "3px" }}
              size="sm"
              color="warning"
              onClick={() => {}}
            >
              چاپ &nbsp;
              <Printer size={12} color="white" />
            </Button>
          </Link>
        </ListGroupItem>
        <ListGroupItem
          className="d-flex justify-content-between align-items-center"
          style={{ width: "100%" }}
          tag="div"
        >
          <span>تاسیسات قطعه</span>
          <Link
            to={`/license/utm/land/${
              isSecretariat ? "secretariat/" : ""
            }FacilityPlan/${reqId}/${sectionId ? sectionId : id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              style={{ margin: "3px" }}
              size="sm"
              color="warning"
              onClick={() => {}}
            >
              چاپ &nbsp;
              <Printer size={12} color="white" />
            </Button>
          </Link>
        </ListGroupItem>
        <ListGroupItem
          className="d-flex justify-content-between align-items-center"
          style={{ width: "100%" }}
          tag="div"
        >
          <span>مختصات قطعه</span>
          <Link
            to={`/license/utm/land/${
              isSecretariat ? "secretariat/" : ""
            }SectionPoints/${reqId}/${sectionId ? sectionId : id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              style={{ margin: "3px" }}
              size="sm"
              color="warning"
              onClick={() => {}}
            >
              چاپ &nbsp;
              <Printer size={12} color="white" />
            </Button>
          </Link>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

export { SectionCell };
