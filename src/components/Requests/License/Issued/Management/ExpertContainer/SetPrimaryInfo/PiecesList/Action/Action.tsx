import React, { useState } from "react";
import { Edit, FileMinus } from "react-feather";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { ToastTypes } from "../../../../../../../../../core/enums";
import { LicenseRequestStatusEnum } from "../../../../../../../../../core/enums/license-request-status.enums";
import { useDeleteLicenseRequestSection } from "../../../../../../../../../core/services/api";
import { showToast } from "../../../../../../../../../core/utils";
import { SweetAlertCallback } from "../../../../../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
    };
  };
  status: number;
  rejectStatus: number;
  setSectionIds: any;
}

const Action: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
    },
  },
  status,
  rejectStatus,
  setSectionIds
}) => {
  const history = useHistory();

  const { id: req_id } = useParams<{ id: string }>();

  const DeleteServicesById = useDeleteLicenseRequestSection();

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const deleteClickHandler = () => {
    setShowConfirmation(true);
  };

  return (
    <div className="d-flex justify-content-center align-content-center">
      <SweetAlertCallback
        mutation={DeleteServicesById}
        title="آیا مطمئنید؟"
        onCancel={() => {
          setShowConfirmation(false);
        }}
        onClose={() => {
          setShowConfirmation(false);
        }}
        onConfirm={() => {
          setShowConfirmation(false);
          DeleteServicesById.mutate(id, {
            onSuccess: () => {
              setShowConfirmation(false);
              showToast(["با موفقیت انجام شد."], ToastTypes.success);
              setSectionIds((prev: any) =>
                prev.filter((row: any) => row.id !== id)
              );
            },
          });
        }}
        show={showConfirmation}
      >
        آیا از پاک کردن این قطعه مطمئنید؟
      </SweetAlertCallback>
      <Button
        style={{ margin: "3px" }}
        size="sm"
        // disabled={
        //   (status !== LicenseRequestStatusEnum.Expertise &&
        //     status !== LicenseRequestStatusEnum.Matching) ||
        //   (status === LicenseRequestStatusEnum.Matching && rejectStatus !== 1)
        // }
        color="warning"
        onClick={() =>
          history.push(`/Inspection/${status}/UpdateLand/${req_id}/${id}`)
        }
      >
        بررسی قطعه &nbsp;
        <Edit
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
          deleteClickHandler();
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

export { Action };
