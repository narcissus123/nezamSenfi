import React, { FC, useState } from "react";
import { Eye } from "react-feather";
import { Button } from "reactstrap";
import { FilesModal } from "./FilesModal/FilesModal";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number ; name:any ; };
      original: {  files: any ; userId : any };
    };
  };
}

const GuarantorAction: FC<IPropTypes> = ({
  cell: {
    row: {
      values,
      original: { files ,  userId},
    },
  },
}) => {

  const [showSelectModal, setShowSelectModal] = useState<any>(false);
  console.log("--------fiiiiiiiiiiieless,", files);

  return (
    <div className="d-flex justify-content-center align-content-center">
      {showSelectModal && (
        <FilesModal
          backdrop={true}
          data={files}
          isOpen={showSelectModal}
          userId={userId}
          toggleModal={() => setShowSelectModal((val: any) => !val)}
        />
      )}
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="primary"
        onClick={() => {
          setShowSelectModal(true);
        }}
      >
        پیوست ها &nbsp;
        <Eye
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { GuarantorAction };
