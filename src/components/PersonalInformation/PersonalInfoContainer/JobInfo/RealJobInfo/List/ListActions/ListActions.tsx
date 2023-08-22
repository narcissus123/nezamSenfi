import React, { useContext, useState } from "react";
import { Edit, FileMinus } from "react-feather";
import { Button } from "reactstrap";
import { ToastTypes } from "../../../../../../../core/enums";
import {
  useDeleteUserRealJobInformation,
  useGetLocationInformation,
} from "../../../../../../../core/services/api";
import { showToast } from "../../../../../../../core/utils";
import { refetchContext } from "../../../../../../../core/utils/context/EventContext";
import { SweetAlertCallback } from "../../../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original: any;
    };
  };
  setTableData: any;
  setInitialValues: any;
  setIsInEditMode: any;
  setEditRowID: any;
  isExpert: boolean;
}

const ListActions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original,
    },
  },
  setTableData,
  setInitialValues,
  setIsInEditMode,
  setEditRowID,
  isExpert,
}) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const deleteClickHandler = () => {
    setShowConfirmation(true);
  };

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const getLocationInformationMutation = useGetLocationInformation();
  const DeleteServicesById = useDeleteUserRealJobInformation();

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
              const newEvent = { ...refetchEvent };
              newEvent.realUserJobInfoList = !newEvent.realUserJobInfoList;
              setRefetchEvent(newEvent);
            },
          });
        }}
        show={showConfirmation}
      >
        آیا از پاک کردن این داده مطمئنید؟
      </SweetAlertCallback>

      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() => {
          console.log("--original--", original);
          if (original.locationId && original.locationId > 0) {
            getLocationInformationMutation.mutate(original.locationId, {
              onSuccess: (val: any) => {
                const result = val.data.result;
                setInitialValues((values: any) => {
                  return {
                    ...values,
                    province: {
                      value: result.provinceId,
                      label: result.province,
                    },
                    county: { value: result.countyId, label: result.county },
                  };
                });

                if (result.locationType === 2) {
                  setInitialValues((old: any) => ({
                    ...old,
                    city: { value: result.cityOrVillageId, label: result.city },
                  }));
                } else {
                  setInitialValues((old: any) => ({
                    ...old,
                    village: {
                      value: result.cityOrVillageId,
                      label: result.village,
                    },
                  }));
                }
              },
            });
          }

          setInitialValues({
            jobStatus: original.employmentStatus
              ? {
                  value: original.employmentStatus.toString(),
                  label: original.employmentStatusTitle,
                }
              : null,
            workplace: original.workplaceOrganization
              ? {
                  value: original.workplaceOrganization.toString(),
                  label: original.workplaceOrganizationTitle,
                }
              : null,
            postInOrganization: original.workPosition
              ? {
                  value: original.workPosition.toString(),
                  label: original.workPositionTitle,
                }
              : null,
            skillCertification: original.skillCertificate
              ? {
                  value: original.skillCertificate.toString(),
                  label: original.skillCertificateTitle,
                }
              : null,
            commendation: original.appreciation
              ? { value: "1", label: "دارای تقدیرنامه" }
              : { value: "2", label: "فاقد تقدیرنامه" },
            skillCertificationFromWorkplace: original.skillCertificateFromORG
              ? { value: "1", label: "دارای گواهی" }
              : { value: "2", label: "دارای گواهی" },
            insuranceType: original.insuranceType
              ? {
                  value: original.insuranceType.toString(),
                  label: original.insuranceTypeTitle,
                }
              : null,
            supplementaryInsurance: original.perfectedInsurance
              ? {
                  value: "1",
                  label: "دارای بیمه تکمیلی",
                }
              : {
                  value: "2",
                  label: "فاقد بیمه تکمیلی",
                },
            supplementaryInsuranceType: original.perfectedInsuranceType,
            skillField: original.skillsField,
            insuranceHistory: original.insuranceDuration
              ? {
                  value: original.insuranceDuration.toString(),
                  label: original.insuranceDurationTitle,
                }
              : original.insuranceDuration === 0
              ? {
                  value: "31",
                  label: original.insuranceDurationTitle,
                }
              : null,
            workEmail: original.workEmail,
            workplaceName: original.organizationName,
            workExperience: original.workExperience
              ? {
                  value: original.workExperience.toString(),
                  label: original.workExperienceTitle,
                }
              : original.workExperience === 0
              ? {
                  value: "31",
                  label: original.workExperienceTitle,
                }
              : null,
            workplacePostalCode: original.workPostalCode,
            workplaceNumber: original.workPhone,
            economicActivity: original.economicActivity,
          });
          setIsInEditMode(true);
          setEditRowID(id);
        }}
      >
        ویرایش
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

export { ListActions };
