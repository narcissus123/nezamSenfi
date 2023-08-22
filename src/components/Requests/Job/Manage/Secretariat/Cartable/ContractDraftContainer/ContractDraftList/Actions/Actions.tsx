import React, { useState } from "react";
import { FileMinus , File} from "react-feather";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { ContractModal } from "../ContractModal/ContractModal";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original: { statusId: number };
    };
  };
  setFormData : any,
  formData:any
}

const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original,
    },
  },
  setFormData,
  formData
}) => {
  const history = useHistory();

  const [showSelectModal, setShowSelectModal] = useState<any>(false);

  return (
    <div className="d-flex justify-content-center align-content-center">
      {showSelectModal && (
        <ContractModal
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
        onClick={() => {setShowSelectModal(true)}}
      >
        جزئیات &nbsp;
        <File
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="danger"
        onClick={() => {
          setFormData((prev:any) => {
            return prev.filter((val: any) => val.id !== id);
          })
        }}
      >
        حذف &nbsp;
        <FileMinus
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { Actions };
