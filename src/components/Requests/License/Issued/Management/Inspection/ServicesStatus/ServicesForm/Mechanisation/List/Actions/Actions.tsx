import React, { useState } from "react";
import { Edit, FileMinus } from "react-feather";
import { Button } from "reactstrap";
import { ToastTypes } from "../../../../../../../../../../../core/enums";
import {
  useGetLocationInformation,
  useGetUserSection,
} from "../../../../../../../../../../../core/services/api";
import { showToast } from "../../../../../../../../../../../core/utils";

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
  setClientNamesList: any;
  setNoClientNamesList: any;
}

const Actions: React.FC<IPropTypes> = ({
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
  setClientNamesList,
  setNoClientNamesList,
}) => {
  const getUserSectionMutation = useGetUserSection();
  const getLocationInformationMutation = useGetLocationInformation();

  const deleteClickHandler = () => {
    setTableData((prev: any) => {
      return prev.filter((val: any) => val.id !== id);
    });
  };

  const onNoClientAddClick = () => {
    const submitedNationalId = original.nonCleintFarmersVm;

    const userObj = {
      nationalCode: original.noClientName,
    };

    setNoClientNamesList((prev: any) => {
      return submitedNationalId;
    });
  };

  const onClientAddClick = async (values: any) => {
    const val = await getUserSectionMutation.mutateAsync(values.userId);

    const user = values;
    const sections = val.data.result;

    let newCheckBox: any = [];
    console.log("---stage1---");
    sections.forEach((row: any) => {
      let sectionIds: any = [];

      row.sections.forEach((insideRow: any) => {
        console.log("---row.some---", row);
        sectionIds.push({
          label: `قطعه شماره ${insideRow.sectionId}`,
          value: insideRow.sectionId,
          coordinates: insideRow.coordinates,
          id: insideRow.sectionId,
          checked: user.sectionIds.includes(insideRow.sectionId),
        });
      });
      console.log("---stage2---");
      let rand = Math.random();
      sectionIds.push({
        label: "",
        value: rand * 0.2542,
        id: rand * 0.2542,
        checked: false,
        isAll: true,
      });

      newCheckBox.push({
        groupId: row.licenseReqiestId,
        isActive: true,
        label: `درخواست شماره ${row.licenseReqiestId}`,
        options: sectionIds,
      });
    });
    console.log("---stage3---");
    const userObj = {
      sections: newCheckBox,
      id: user.id,
      nationalCode: user.nationalCode,
      email: user.email,
    };
    console.log("---stage4---");

    setClientNamesList((prev: any) => {
      return [...prev, userObj];
    });
  };

  return (
    <div className="d-flex justify-content-center align-content-center">
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() => {
          original.cleintFarmersVm.forEach(async (row: any) => {
            await onClientAddClick(row);
          });

          onNoClientAddClick();

          getLocationInformationMutation.mutate(original.cityOrVillageId, {
            onSuccess: (val: any) => {
              const result = val.data.result;
              setInitialValues((values: any) => {
                return {
                  ...values,
                  province: {
                    value: result.provinceId,
                    label: result.province,
                  },
                  township: { value: result.countyId, label: result.county },
                };
              });
            },
          });

          console.log({
            value: original.agriculturalToolsAndServicesId,
            label: original.agriculturalToolsAndServicesTitle,
          });

          setInitialValues((values: any) => {
            return {
              ...values,
              machinName: {
                value: original.machineryId,
                label: original.machineryTitle,
              },
              toolsName: {
                value: original.agriculturalToolsAndServicesId,
                label: original.agriculturalToolsAndServicesTitle,
              },
              toolsType: {
                value: original.agriculturalToolsAndServicesTypeId,
                label: original.agriculturalToolsAndServicesTypeTitle,
              },
              village: {
                value: original.cityOrVillageId,
                label: original.cityOrVillageIdTitle,
              },
              daysInImmigration: original.daysOfTarriance,
              agriculturalToolsAndServicesNumber:
                original.agriculturalToolsAndServicesNumber,
            };
          });
          setIsInEditMode(true);
          setEditRowID(id);
        }}
      >
        ویرایش &nbsp;
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

export { Actions };
