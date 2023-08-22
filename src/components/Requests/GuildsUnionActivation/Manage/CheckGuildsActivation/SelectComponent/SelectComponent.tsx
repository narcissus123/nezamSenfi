import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { isSameString } from "../../../../../../core/utils/same-string.utils";

import { SweetAlertCallback } from "../../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";

interface IPropsType {
  selectMutation: any;
  type?: string;
}
const SelectComponent: React.FC<IPropsType> = ({
  selectMutation,
  type = "",
}) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  let { id } = useParams<any>();
  const history = useHistory();
  // const { refetchEvent, setRefetchEvent } = useContext(refetchContext);
  return (
    <>
      <SweetAlertCallback
        mutation={selectMutation}
        title="تایید نهایی"
        onCancel={() => {
          setShowConfirmation(false);
        }}
        onClose={() => {
          setShowConfirmation(false);
        }}
        onConfirm={() => {
          setShowConfirmation(false);
          selectMutation.mutate(id, {
            onSuccess: () => {
              setShowConfirmation(false);
              history.push(
                `/${
                  isSameString(type, "union") ? "Union" : "Guild"
                }sActivation/${type}Secretariat/Confirm/${id}`
              );
              //setRefetchEvent(newEvent);
            },
          });
        }}
        show={showConfirmation}
      >
        آیا این درخواست به کارتابل شما اضافه شود؟
      </SweetAlertCallback>
      <div className="d-flex justify-content-start my-1">
        <Button
          style={{ margin: "3px" }}
          size="md"
          color="primary"
          onClick={() => {
            setShowConfirmation(true);
          }}
        >
          اضافه کردن به کارتابل من
        </Button>
      </div>
    </>
  );
};
export { SelectComponent };
