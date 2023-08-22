import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";

import {
  MultiSelectOption,
  SubmitButton,
  TextInput,
} from "../../../../../../../../common/Form";

import BasicSelectOption from "../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { Row, Col } from "reactstrap";
import { FullOptionSel } from "../../../../../../../../../core/models";
import { MotorAndGearBoxValidate } from "../../../../../../../../../core/validations/motor-gearbox.validations";
import { useGetAllConsumptionForDropDown2, useGetAllFacilityBuildings, useGetAllFacilityBuildings2, useGetConsumptionCostForDropDownById } from "../../../../../../../../../core/services/api";
import { useParams } from "react-router-dom";
import { ToastTypes } from "../../../../../../../../../core/enums";
import { checkConsumptionExistsInData, showToast } from "../../../../../../../../../core/utils";
import { InspectionBuildingsRepair } from "../../../../../../../../../core/validations/inspection-buildings-repair.validations";
import { createConsumptionValueLabel } from "../../../../../../../../../core/utils/create-consumption-value-label.utils";
import { getCost } from "../../../../../../../../../core/utils/get-cost.utils";

interface IPropTypes {
  setMutation: any;
  parentData: any;
  id: number | undefined;
  useGetMutation: any;
}

const BuildingRepairsConsumption: React.FC<IPropTypes> = ({
  setMutation,
  parentData,
  id = 0,
  useGetMutation,
}) => {

  // "buildingRepairsConsumption": {
  //   "buildingRepairsCostId": 0,
  //   "buildingRepairsNameIds": [
  //     0
  //   ],
  //   "numberOfBuildingUnits": 0,
  //   "facilityRepairsCostId": 0,
  //   "facilityRepairsNamesViewModel": [
  //     1
  //   ],
  //   "numberOfFacilityUnits": 0
  // }

  const [initialValues, setInitialValues] = useState<any>({
    buildingRepairsCostId: null,
    buildingRepairsNameIds: null,
    numberOfBuildingUnits: "",
    facilityRepairsCostId: null,
    facilityRepairsNamesViewModel: null,
    numberOfFacilityUnits: "",
  });

  const [costData, setCostData] = useState<FullOptionSel[]>([
    { label: "انتخاب کنید ...", options: [] },
  ]);

  const [buildingsData, setBuildingsData] = useState<FullOptionSel[]>([
    { label: "انتخاب کنید ...", options: [] },
  ]);

  const getDetailMutation = useGetMutation();

  const getCosts = useGetAllConsumptionForDropDown2();
  useEffect(()=>{
    getCosts.mutate(6);
  },[])
  
  const {
    data: buildingTypeData,
    isSuccess: buildingTypeIsSuccess,
    isFetching: buildingTypeIsFetching,
    refetch: refetchFacilityBuildings,
  } = useGetAllFacilityBuildings2();


  useEffect(() => {
    if (buildingTypeData && buildingTypeData.data) {
      const result = buildingTypeData.data.result;

      let pro: any = [
        {
          label: "مسقف",
          options: [],
        },
        {
          label: "غیر مسقف",
          options: [],
        },
      ];
      result.forEach((facility: any) => {
        if (facility.roofType === 1) {
          pro[0].options.push({
            value: facility.id,
            label: facility.name,
            form: facility.form,
          });
        } else {
          pro[1].options.push({
            value: facility.id,
            label: facility.name,
            form: facility.form,
          });
        }
      });
      setBuildingsData(pro);
    }
  }, [buildingTypeData]);

  const getBuildingRepairsCostIdMutation = useGetConsumptionCostForDropDownById();
  const getFacilityRepairsCostIdMutation = useGetConsumptionCostForDropDownById();

  useEffect(() => {
    if (id && id !== 0) {
      getDetailMutation.mutate(id, {
        onSuccess: (val: any) => {
          const result = val.data.result;

          if (costData && costData[0].options && costData[0].options.length > 0) {
            if (
              !checkConsumptionExistsInData(result.maintenanceCostId, costData)
            ) {
              getBuildingRepairsCostIdMutation.mutate(result.buildingRepairsCostId, {
                onSuccess: (val: any) => {
                  let data = val.data.result;
                  setInitialValues((old: any) => ({
                    ...old,
                    buildingRepairsCostId: createConsumptionValueLabel(data),
                  }));
                },
              });
            }

            if (
              !checkConsumptionExistsInData(result.destructionCostId, costData)
            ) {
              getFacilityRepairsCostIdMutation.mutate(
                result.facilityRepairsCostId,
                {
                  onSuccess: (val: any) => {
                    let data = val.data.result;
                    setInitialValues((old: any) => ({
                      ...old,
                      facilityRepairsCostId: createConsumptionValueLabel(data),
                    }));
                  },
                }
              );
            }
          }


          let buildingRepairsNameIds: {value: number, label: string}[] = [];

          if(result.buildingRepairsNameIds) {
            result.buildingRepairsNameIds.forEach((row: any) => {
              buildingRepairsNameIds.push({ value: row, label: "" });
            });
          }

          let facilityRepairsNamesViewModel: any = [];

          if(result.facilityRepairsNamesViewModel) {
            result.facilityRepairsNamesViewModel.forEach((row: any) => {
              facilityRepairsNamesViewModel.push({ value: row, label: "" });
            });
          }

          setInitialValues({
            buildingRepairsCostId: {
              value: result.buildingRepairsCostId,
              label: result.buildingRepairsCostTitle,
            },
            facilityRepairsCostId: {
              value: result.facilityRepairsCostId,
              label: result.facilityRepairsCostTitle,
            },
            numberOfBuildingUnits: result.numberOfBuildingUnits,
            numberOfFacilityUnits: result.numberOfFacilityUnits,
            buildingRepairsNameIds: buildingRepairsNameIds,
            facilityRepairsNamesViewModel: facilityRepairsNamesViewModel,
          });
      }
    })
  }}, [id, costData]);

  useEffect(() => {
    if (getCosts.isSuccess) {
      const result = getCosts.data?.data.result;
      console.log(result);
      let gasCost: FullOptionSel[] = [{ label: "انتخاب کنید...", options: [] }];

      result.forEach((item: any) => {
        gasCost[0].options.push({
          value: item.id,
          label: getCost(item),
        });
      });
      setCostData(gasCost);
    }
  }, [getCosts.isSuccess]);

  const setFormMutation = setMutation();

  const { section_id } = useParams<{ section_id: string }>();

  const onSubmit = (value: any) => {
   
    let buildingRepairsCostId : number[] = []
    let facilityRepairsNamesViewModel : number[] = []

    value.buildingRepairsNameIds.forEach((row:any) => {
      buildingRepairsCostId.push(row.value)
    })
    value.facilityRepairsNamesViewModel.forEach((row:any) => {
      facilityRepairsNamesViewModel.push(row.value)
    })

    const setRepairObj = {
      productionFactorId: parentData.productionFactor.value,
      sectionId: +section_id,
      year: parentData.productionYear.value,
      activityRate: parentData.activityTime,
      buildingRepairsConsumption: {
        buildingRepairsCostId: value.buildingRepairsCostId.value,
        buildingRepairsNameIds: buildingRepairsCostId,
        numberOfBuildingUnits: value.numberOfBuildingUnits,
        facilityRepairsCostId: value.facilityRepairsCostId.value,
        facilityRepairsNamesViewModel: facilityRepairsNamesViewModel,
        numberOfFacilityUnits: value.numberOfFacilityUnits,
      },
    };

    setFormMutation.mutate(setRepairObj, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
      },
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={InspectionBuildingsRepair}
        enableReinitialize
      >
        {({ values, setFieldValue }) => {
          return (
            <Row>
              <Col md="12">
                <Form>
                  <Row>
                    <Col md="6">
                      <Row>
                        <Col md="12">
                          <BasicSelectOption
                            lableText="هزینه تعمیرات ساختمان"
                            name="buildingRepairsCostId"
                            data={costData}
                            placeHolder="انتخاب کنید"
                            significant
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <MultiSelectOption
                            labelText="نام ساختمان"
                            name="buildingRepairsNameIds"
                            placeHolder="انتخاب کنید..."
                            significant={true}
                            isLoading={buildingTypeIsFetching}
                            options={buildingsData}
                            onChange={(e) =>
                              setFieldValue("buildingRepairsNameIds", e)
                            }
                            hasLabel={true}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <TextInput
                            id="numberOfBuildingUnits"
                            name="numberOfBuildingUnits"
                            lableText="تعداد واحد"
                            placeholder="عدد وارد کنید ..."
                          />
                        </Col>
                      </Row>
                    </Col>

                    <Col md="6">
                      <Row>
                        <Col md="12">
                          <BasicSelectOption
                            lableText="هزینه تعمیرات تاسیسات"
                            name="facilityRepairsCostId"
                            data={costData}
                            placeHolder="انتخاب کنید"
                            significant
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <MultiSelectOption
                            labelText="نام تاسیسات"
                            name="facilityRepairsNamesViewModel"
                            placeHolder="انتخاب کنید..."
                            significant={true}
                            isLoading={buildingTypeIsFetching}
                            options={buildingsData}
                            onChange={(e) =>
                              setFieldValue("facilityRepairsNamesViewModel", e)
                            }
                            hasLabel={true}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <TextInput
                            id="numberOfFacilityUnits"
                            name="numberOfFacilityUnits"
                            lableText="تعداد واحد"
                            placeholder="عدد وارد کنید ..."
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <SubmitButton
                        isLoading={setFormMutation.isLoading}
                        btnText="ثبت"
                        values={values}
                        schema={InspectionBuildingsRepair}
                      />
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          );
        }}
      </Formik>
    </>
  );
};

export { BuildingRepairsConsumption };
