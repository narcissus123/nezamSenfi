import React from "react";
import { Check, Edit } from "react-feather";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import CheckBoxesVuexy from "../../../../../../../common/@vuexy/checkbox/CheckboxesVuexy";

interface IPropTypes {
  cell: {
    row: {
      values: {};
      original: { licenseRequestId: number };
    };
  };
  setIntersectId: (val: any) => void;
}

const DocumentsList: React.FC<IPropTypes> = ({
  cell: {
    row: {
      original: { licenseRequestId },
    },
  },
  setIntersectId,
}) => {
  return (
    <ListGroup
      tag="div"
      style={{ width: "100%" }}
      className="text-left d-flex justify-content-center"
    >
      <ListGroupItem
        tag="a"
        style={{ color: "#626262" }}
        className="d-flex justify-content-between align-items-center"
      >
        ابطال شود
        <CheckBoxesVuexy
          defaultChecked={false}
          onChange={(e: any) => {
            const checked = e.currentTarget.checked;
            setIntersectId(
              (
                old: {
                  intersectionLicenseRequestId: number;
                  districtCourtResultEnum: number;
                }[]
              ) => {
                const newResult = old.filter(
                  (item) =>
                    item.intersectionLicenseRequestId !== licenseRequestId
                );

                return [
                  ...newResult,
                  {
                    intersectionLicenseRequestId: licenseRequestId,
                    districtCourtResultEnum: checked ? 2 : 1,
                  },
                ];
              }
            );
          }}
          // color="primary"
          icon={<Check className="vx-icon" size={16} />}
        />
      </ListGroupItem>
    </ListGroup>
  );
};

export { DocumentsList };
