import React, { FC, useState } from "react";
import { Edit } from "react-feather";
import { Button } from "reactstrap";
import { ResumeDetailsModal } from "../ResumeDetailsModal/ResumeDetailsModal";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number , name:any };
      original: { resumeHistory: number };
    };
  };
}

const ResumeAction: FC<IPropTypes> = ({
  cell: {
    row: {
      values,
      original,
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
        <ResumeDetailsModal
          backdrop={true}
          data={original}//resumeHistory}
          isOpen={showSelectModal}
          toggleModal={() => setShowSelectModal((val: any) => !val)}
        />
      )}
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={onActionClick}
      >
        جزئیات &nbsp;
        <Edit
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { ResumeAction };
