import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardBody } from "reactstrap";
import { ToastTypes } from "../../../../../../../../../../core/enums";
import { FullOptionSel } from "../../../../../../../../../../core/models";
import {  useGetAllMachine, useGetAllServicesName, useGetUserAgriculturalToolsAndServicesByExpert, useGetUserMachineByExpert } from "../../../../../../../../../../core/services/api";
import { showToast } from "../../../../../../../../../../core/utils";
import { SetMachineryInfoExpert } from "../../../../../../../../../../core/validations/set-machineryinfo-expert.validations";
import {
  FormDivider,
  MultiSelectOption,
  SubmitButton,
} from "../../../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { TwoColumn } from "../../../../../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";

interface IPropTypes {
  setMutation: any;
  textHeader: string;
  parentData: any;
  isExpert: any;
  isIssueingResponsible: any;
  isJahadManager: any;
  id:number | undefined;
  useGetMutation:any;
}

const SetMachineryConsumption: FC<IPropTypes> = ({
  textHeader,
  setMutation,
  parentData,
  isExpert,
  isIssueingResponsible,
  isJahadManager,
  id,
  useGetMutation,
}) => {
  const [initialValues, setInitialValues] = useState<any>({
    machineryConsumptionOperationStatusEnum: null,
    ownedMachineryNamesIds: null,
    ownedToolsNamesIds: null,
    rentalMachineryNamesIds: null,
    rentalToolsNamesIds: null,
  });

  const machineryConsumptionOperationStatusEnumOption: FullOptionSel[] = [
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "اجاره ای" },
        { value: 2, label: "مالکیتی" },
        { value: 3, label: "اجاره ای - مالکیتی" },
      ],
    },
  ];

  const [MachineryNamesData, setMachineryNamesData] = useState<FullOptionSel[]>(
    [
      {
        label: "انتخاب کنید...",
        options: [],
      },
    ]
  );
  const [rentalMachineryNamesData, setRentalMachineryNamesData] = useState<
    FullOptionSel[]
  >([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [ToolsNamesData, setToolsNamesData] = useState<FullOptionSel[]>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [rentalToolsNamesData, setRentalToolsNamesData] = useState<
    FullOptionSel[]
  >([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const { req_id } = useParams<any>();

  const {
    data: userMachineData,
    isFetching: userMachineIsFetching,
    refetch: userMachineRefetch,
    isSuccess: userMachineIsSuccess,
  } = useGetUserMachineByExpert(+req_id);
  const {
    data: userServicesData,
    isFetching: userServicesIsFetching,
    refetch: userServicesRefetch,
    isSuccess: userServicesIsSuccess,
  } = useGetUserAgriculturalToolsAndServicesByExpert(+req_id);

  const getMutation = useGetMutation();

  const {
    data: getAllMachin,
    isSuccess: isGetAllMachinSuccess,
    isLoading: isGetAllMachinLoading,
    isFetching: isGetAllMachineIsFetching,
  } = useGetAllMachine();

  const {
    data: getAllServices,
    isSuccess: isGetAllServicesSuccess,
    isLoading: isGetAllServicesLoading,
    isFetching: isGetAllServicesIsFetching,
  } = useGetAllServicesName();

  useEffect(() => {
    if (getAllServices) {
      
      const result : any = getAllServices
      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      
      setRentalToolsNamesData(pro);
    }
  }, [isGetAllServicesSuccess]);

  useEffect(() => {
    if (getAllMachin && getAllMachin.data) {
      const result = getAllMachin.data.result;
      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      setRentalMachineryNamesData(pro);
    }
  }, [isGetAllMachinSuccess]);

  useEffect(() => {
    if (id && id !== 0) {
      getMutation.mutate(id, {
        onSuccess: (val: any) => {
          const result: any = val.data.result;

          let ownedMachineryNamesIds: any = [];
          result.ownedMachineryNamesIds.forEach((row: any) => {
            ownedMachineryNamesIds.push({ value: row.id, label: row.name });
          });
          let ownedToolsNamesIds: any = [];
          result.ownedToolsNamesIds.forEach((row: any) => {
            ownedToolsNamesIds.push({ value: row.id, label: row.name });
          });
          let rentalMachineryNamesIds: any = [];
          result.rentalMachineryNamesIds.forEach((row: any) => {
            rentalMachineryNamesIds.push({ value: row.id, label: row.name });
          });
          let rentalToolsNamesIds: any = [];
          result.rentalToolsNamesIds.forEach((row: any) => {
            rentalToolsNamesIds.push({ value: row.id, label: row.name });
          });

          setInitialValues({
            machineryConsumptionOperationStatusEnum: {
              value: result.machineryConsumptionOperationStatusEnum,
              label: "",
            },
            ownedMachineryNamesIds: ownedMachineryNamesIds,
            ownedToolsNamesIds: ownedToolsNamesIds,
            rentalMachineryNamesIds: rentalMachineryNamesIds,
            rentalToolsNamesIds: rentalToolsNamesIds,
          });
        },
      });
    }
  }, [id]);

  useEffect(() => {
    if (isExpert) {
      userMachineRefetch();
      userServicesRefetch();
    }
  }, []);

  useEffect(() => {
    if (userMachineData && userMachineIsSuccess) {
      const result = userMachineData.data.result;

      let newData: any = [
        {
          label: "انتخاب کنید ...",
          options: [],
        },
      ];

      let newOptions: any = [];
      result.forEach((row: any) => {
        newOptions.push({ value: row.id, label: row.name });
      });

      newData[0].options = newOptions;
      setMachineryNamesData(newData);
    }
  }, [userMachineIsSuccess]);

  useEffect(() => {
    if (userServicesData && userServicesIsSuccess) {
      const result = userServicesData.data.result;

      let newData: any = [
        {
          label: "انتخاب کنید ...",
          options: [],
        },
      ];

      let newOptions: any = [];
      result.forEach((row: any) => {
        newOptions.push({ value: row.id, label: row.name });
      });

      newData[0].options = newOptions;
      setToolsNamesData(newData);
    }
  }, [userServicesIsSuccess]);

  const { section_id } = useParams<{ section_id: string }>();

  const setInformation = setMutation();

  const onSubmit = (value: any) => {
    const ownedMachineryNamesIds: number[] = [];
    const ownedToolsNamesIds: number[] = [];
    const rentalMachineryNamesIds: number[] = [];
    const rentalToolsNamesIds: number[] = [];

    if (value.ownedMachineryNamesIds) {
      value.ownedMachineryNamesIds.forEach((row: any) => {
        ownedMachineryNamesIds.push(row.value);
      });
    }

    if (value.ownedToolsNamesIds) {
      value.ownedToolsNamesIds.forEach((row: any) => {
        ownedToolsNamesIds.push(row.value);
      });
    }

    if (value.rentalMachineryNamesIds) {
      value.rentalMachineryNamesIds.forEach((row: any) => {
        rentalMachineryNamesIds.push(row.value);
      });
    }

    if (value.rentalToolsNamesIds) {
      value.rentalToolsNamesIds.forEach((row: any) => {
        rentalToolsNamesIds.push(row.value);
      });
    }

    const obj = {
      productionFactorId: parentData.productionFactor.value,
      sectionId: +section_id,
      year: parentData.productionYear.value,
      activityRate: parentData.activityTime,
      setMachineryConsumption: {
        machineryConsumptionOperationStatusEnum:
          value.machineryConsumptionOperationStatusEnum.value,
        ownedMachineryNamesIds: ownedMachineryNamesIds,
        ownedToolsNamesIds: ownedToolsNamesIds,
        rentalMachineryNamesIds: rentalMachineryNamesIds,
        rentalToolsNamesIds: rentalToolsNamesIds,
      },
    };

    setInformation.mutate(obj, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد."], ToastTypes.success);
      },
    });
  };

  return (
    <FormDivider textHeader={textHeader}>
      <CardBody>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={SetMachineryInfoExpert}
        >
          {({ values }) => (
            <Form>
              <TwoColumn>
                <>
                  <BasicSelectOption
                    name="machineryConsumptionOperationStatusEnum"
                    data={machineryConsumptionOperationStatusEnumOption}
                    lableText="وضعیت اجرای عملیات"
                    significant
                    placeHolder="وضعیت اجرای عملیات..."
                  />

                  {values.machineryConsumptionOperationStatusEnum &&
                    (values.machineryConsumptionOperationStatusEnum.value ===
                      2 ||
                      values.machineryConsumptionOperationStatusEnum.value ===
                        3) && (
                      <>
                        <MultiSelectOption
                          name="ownedMachineryNamesIds"
                          options={MachineryNamesData}
                          labelText="نام ماشین مالکیتی"
                          isLoading={userMachineIsFetching}
                          significant
                          placeHolder="نام ماشین مالکیتی..."
                          hasLabel
                        />

                        <MultiSelectOption
                          name="ownedToolsNamesIds"
                          options={ToolsNamesData}
                          isLoading={userServicesIsFetching}
                          labelText="نام ادوات مالکیتی"
                          significant
                          placeHolder="نام ادوات مالکیتی..."
                          hasLabel
                        />
                      </>
                    )}

                  {values.machineryConsumptionOperationStatusEnum &&
                    (values.machineryConsumptionOperationStatusEnum.value ===
                      1 ||
                      values.machineryConsumptionOperationStatusEnum.value ===
                        3) && (
                      <>
                        {" "}
                        <MultiSelectOption
                          name="rentalMachineryNamesIds"
                          options={rentalMachineryNamesData}
                          isLoading={isGetAllMachineIsFetching}
                          labelText="نام ماشین کرایه ای"
                          significant
                          placeHolder="نام ماشین کرایه ای..."
                          hasLabel
                        />
                        <MultiSelectOption
                          name="rentalToolsNamesIds"
                          options={rentalToolsNamesData}
                          isLoading={isGetAllServicesIsFetching}
                          labelText="نام ادوات کرایه ای"
                          significant
                          hasLabel
                          placeHolder="نام ادوات کرایه ای..."
                        />
                      </>
                    )}
                </>
              </TwoColumn>

              <SubmitButton
                isLoading={setInformation.isLoading}
                btnText="ثبت"
                schema={SetMachineryInfoExpert}
              />
            </Form>
          )}
        </Formik>
      </CardBody>
    </FormDivider>
  );
};

export { SetMachineryConsumption };
