import React, { FC, useState } from "react";
import { Edit } from "react-feather";
import { Button } from "reactstrap";
import { HistoryDetailsModal } from "../HistoryDetailsModal/HistoryDetailsModal";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number; name: any };
      original: { resumeHistory: any };
    };
  };
}

const HistoryAction: FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original: { resumeHistory },
    },
  },
}) => {
  const onActionClick = () => {
    setShowSelectModal(true);
  };

  const [showSelectModal, setShowSelectModal] = useState<any>(false);

  return (
    <div className="d-flex justify-content-center align-content-center">
      {showSelectModal && (
        <HistoryDetailsModal
          backdrop={true}
          data={resumeHistory}
          isOpen={showSelectModal}
          toggleModal={() => setShowSelectModal((val: any) => !val)}
        />
      )}
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        disabled={resumeHistory && resumeHistory.length > 0 ? false : true}
        onClick={onActionClick}
      >
        رزومه &nbsp;
        <Edit
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { HistoryAction };
