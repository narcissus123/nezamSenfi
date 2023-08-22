import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, CustomInput, Row } from "reactstrap";
import { OptionRowSel } from "../../../core/models";
import { useUserAuth } from "../../../core/utils/context/AuthenticationContext";
import { MachineryInfoValidate } from "../../../core/validations/machinery-info.validations";
import {
  FormDivider,
  ModernDatePicker,
  MultiSelectOption,
  SubmitButton,
  TextInput,
} from "../../common/Form";
import BasicSelectOption from "../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { TwoColumn } from "../../common/Wrapper/ColumnWrapper/TwoColumn";
import {
  useCreateUserMachine,
  useGetAllInsurances,
  useGetAllMachine,
  useGetAllUserMachines,
} from "./../../../core/services/api";
import { DocumentsTable } from "./DocumentsTable";
import { FileInput } from "./FileInput";
import Styled from "./MachineryInfo.module.scss";

const initialValue = {
  plateNumber: "",
  engineNumber: "",
  chassisNumber: "",
  serialNumberOrModel: "",

  locationOfServices: null,
  typeOfOwnership: { value: 0, label: "انتخاب کنید" },
  typeOfMachineUse: { value: 0, label: "انتخاب کنید" },
  userInfoId: 0,
  machineryId: { value: 0, label: "انتخاب کنید" },
  thirdPartyInsuranceId: { value: 0, label: "انتخاب کنید" },
  hallInsuranceId: { value: 0, label: "انتخاب کنید" },
  thirdPartyInsuranceValidityDate: "",
  hallInsuranceValidityDate: "",
  hallInsuranceStatus: false,
  thirdPartyInsuranceStatus: false,

  file: null,
};

const ownershipTypes = [
  {
    label: "نوع مالکیت را انتخاب کنید",
    options: [
      { value: 1, label: "سند مالکیت(کارت سبز) و سند قطعی" },
      { value: 2, label: "فروشنامه و وکالتنامه دفتر خانه رسمی" },
      { value: 3, label: "سند عادی فروش نامه" },
      { value: 4, label: "سند عادی استیجاری و امانی" },
      { value: 5, label: "فاقد هرگونه سند مالکیت" },
    ],
  },
];

const carUseTypes = [
  {
    label: "نوع استفاده از ماشین را انتخاب کنید",
    options: [
      { value: 1, label: "شخصی" },
      { value: 2, label: "عمومی" },
    ],
  },
];

const servicePlaceName = [
  {
    label: " نام محل ارائه خدمات را انتخاب کنید",
    options: [
      { value: 1, label: "اقامتگاه" },
      { value: 2, label: "خارج از اقامتگاه" },
    ],
  },
];

const MachineryInfo: React.FC = () => {
  const [loadingModal, setLoadingModal] = useState<any>(false);
  const createUserMachinMutation = useCreateUserMachine();

  const { userInfo } = useUserAuth();
  // const {
  //   data: getAllMachinTypes,
  //   isSuccess: isGetAllMachinTypsSuccess,
  //   isLoading: isGetAllMachinTypesLoading,
  // } = useGetAllMachineTypes();
  // const {
  //   data: getAllMachineManufacturer,
  //   isSuccess: isMachineManufacturerSuccess,
  //   isLoading: isMachineManufacturerLoading,
  // } = useGetAllMachineManufacturer();
  const {
    data: getAllInsurances,
    isSuccess: isInsurancesSuccess,
    isLoading: isInsurancesLoading,
  } = useGetAllInsurances();
  const {
    data: getAllMachin,
    isSuccess: isGetAllMachinSuccess,
    isLoading: isGetAllMachinLoading,
  } = useGetAllMachine();

  const {
    data: getAllUserMachines,
    isLoading: isAllUserMachinesFetching,
    isSuccess: isAllUserMachineSuccess,
  } = useGetAllUserMachines();

  const [initiaState, setInitiaState] = useState(initialValue);

  // const [allMachinTypes, setAllMachinTypes] = useState([
  //   {
  //     label: "نوع ماشین را انتخاب کنید",
  //     options: [],
  //   },
  // ]);
  const [AllMachineManufacturer, setAllMachineManufacturer] = useState([
    {
      label: "نام شرکت سازنده را انتخاب کنید",
      options: [],
    },
  ]);
  const [AllInsurances, setAllInsurances] = useState([
    {
      label: "نام شرکت سازنده را انتخاب کنید",
      options: [],
    },
  ]);
  const [AllMachin, setAllMachin] = useState([
    {
      label: "نام شرکت سازنده را انتخاب کنید",
      options: [],
    },
  ]);
  const [AllUserMachines, setAllUserMachines] = useState<any>([]);

  useEffect(() => {
    // save all-user-machine to state
    if (getAllUserMachines) {
      const result = getAllUserMachines;
      setAllUserMachines(result);
    }
  }, [isAllUserMachineSuccess]);

  // useEffect(() => {
  //   // save machin-types to state
  //   if (getAllMachinTypes?.data.result) {
  //     const result = getAllMachinTypes.data.result;
  //     let pro: any = [
  //       {
  //         label: "انتخاب کنید...",
  //         options: [],
  //       },
  //     ];
  //     result.forEach((county: any) => {
  //       pro[0].options.push({ value: county.id, label: county.title });
  //     });
  //     setAllMachinTypes(pro);
  //   }
  // }, [isGetAllMachinTypsSuccess]);

  // useEffect(() => {
  //   // save machin-Manufacturer to state
  //   if (getAllMachineManufacturer?.data.result) {
  //     const result = getAllMachineManufacturer.data.result;
  //     let pro: any = [
  //       {
  //         label: "انتخاب کنید...",
  //         options: [],
  //       },
  //     ];
  //     result.forEach((county: any) => {
  //       pro[0].options.push({ value: county.id, label: county.title });
  //     });
  //     setAllMachineManufacturer(pro);
  //   }
  // }, [isMachineManufacturerSuccess]);

  useEffect(() => {
    // save AllInsurances to state
    if (getAllInsurances?.data.result) {
      const result = getAllInsurances.data.result;
      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      setAllInsurances(pro);
    }
  }, [isInsurancesSuccess]);

  useEffect(() => {
    // save getAllMachin to state
    if (getAllMachin?.data.result) {
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
      setAllMachin(pro);
    }
  }, [isGetAllMachinSuccess]);

  const checkIfPlateDisabled = (values: any) => {
    if (
      (values.chassisNumber && values.chassisNumber.length > 0) ||
      (values.engineNumber && values.engineNumber.length > 0) ||
      (values.serialNumberOrModel && values.serialNumberOrModel.length > 0)
    ) {
      return true;
    }
    return false;
  };

  const checkIfChassisDisabled = (values: any) => {
    if (
      (values.thirdPlateNum && values.thirdPlateNum.length > 0) ||
      (values.secondPlateNum && values.secondPlateNum.length > 0) ||
      (values.firstPlateNum && values.firstPlateNum.length > 0)
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = (value: any) => {
    let hallInsuranceValidityDate: string = value.hallInsuranceValidityDate;
    const thirdPartyInsuranceValidityDate: string =
      value.thirdPartyInsuranceValidityDate;

    const formData = new FormData();

    if (value.file) {
      for (let i = 0; i < value.file.length; i++) {
        formData.append(`Files[${i}].File`, value.file[i].file[0]);
        formData.append(
          `Files[${i}].UserMachineFileTypeEnum`,
          value.file[i].userMachineFileTypeEnum.value.toString()
        );
      }
    } else {
      formData.append(`Files`, null as any);
    }

    const dataSubmit: any = {
      chassisNumber: value.chassisNumber ? value.chassisNumber : "",
      engineNumber: value.engineNumber ? value.engineNumber : "",
      plateNumber:
        (value.firstPlateNum ? value.firstPlateNum : "") +
        (value.secondPlateNum ? value.secondPlateNum : "") +
        (value.thirdPlateNum ? value.thirdPlateNum : ""),
      serialNumberOrModel: value.serialNumberOrModel
        ? value.serialNumberOrModel
        : "",
      hallInsuranceStatus: value.hallInsuranceStatus,
      thirdPartyInsuranceStatus: value.thirdPartyInsuranceStatus,
      hallInsuranceValidityDate: value.hallInsuranceStatus
        ? hallInsuranceValidityDate
        : "",
      thirdPartyInsuranceValidityDate: value.thirdPartyInsuranceStatus
        ? thirdPartyInsuranceValidityDate
        : "",
      hallInsuranceId: value.hallInsuranceStatus
        ? value.hallInsuranceId.value
        : 0,

      machineryId: value.machineryId.value,
      thirdPartyInsuranceId: value.thirdPartyInsuranceStatus
        ? value.thirdPartyInsuranceId.value
        : 0,
      typeOfMachineUse: value.typeOfMachineUse.value,
      typeOfOwnership: value.typeOfOwnership.value,
      userInfoId: userInfo.userInfoId ? userInfo.userInfoId : 0,
    };

    Object.keys(dataSubmit).map(function (key, index) {
      formData.append(key, dataSubmit[key]); //append the values with key, value pair
    });
    if( value.locationOfServices){
      value.locationOfServices.map((item: OptionRowSel) =>
        formData.append("LocationOfServices", item.value.toString())
      );
    }
    createUserMachinMutation.mutate(formData);
  };

  return (
    <Formik
      initialValues={initiaState}
      onSubmit={(value) => onSubmit(value)}
      enableReinitialize={true}
      validationSchema={MachineryInfoValidate}
    >
      {({ values, handleChange, setFieldValue }) => {
        return (
          <Form>
            <TwoColumn>
              <div>
                <BasicSelectOption
                  lableText="نام ماشین"
                  name="machineryId"
                  placeHolder="انتخاب نام ماشین "
                  data={AllMachin}
                  isLoading={isGetAllMachinLoading}
                  significant
                />

                <BasicSelectOption
                  lableText="نوع مالکیت"
                  name="typeOfOwnership"
                  placeHolder="انتخاب نوع مالکیت "
                  data={ownershipTypes}
                  significant
                />

                <TextInput
                  id="chassisNumber"
                  lableText="شماره شاسی"
                  name="chassisNumber"
                  placeholder="شماره شاسی"
                  disabled={checkIfChassisDisabled(values)}
                  significant
                />
                <TextInput
                  id="serialNumberOrModel"
                  lableText="شماره سریال/مدل"
                  name="serialNumberOrModel"
                  placeholder="شماره سریال/مدل"
                  disabled={checkIfChassisDisabled(values)}
                  significant
                />
                {/* <BasicSelectOption
                  lableText="نام شرکت سازنده"
                  name="machineManufacturerId"
                  placeHolder="انتخاب نام شرکت سازنده "
                  data={AllMachineManufacturer}
                  isLoading={isMachineManufacturerLoading}
                  significant
                /> */}
                <FileInput
                  files={values.file}
                  outLine
                  inputText="بارگذاری اصل اسناد"
                  setFieldValue={(val: any) => {
                    setFieldValue("file", val);
                  }}
                />
              </div>
              <div>
                {/* <BasicSelectOption
                  lableText="نوع ماشین"
                  name="typeMachineId"
                  placeHolder="انتخاب نوع ماشین "
                  data={allMachinTypes}
                  isLoading={isGetAllMachinTypesLoading}
                  significant
                /> */}
                {/* <TextInput
                  id="plateNumber"
                  lableText="شماره پلاک"
                  name="plateNumber"
                  placeholder="شماره پلاک"
                  significant
                /> */}
                {/* <Col sm="12" className="px-0">
                  
                </Col> */}
                <FormDivider textHeader="شماره پلاک">
                  <Row>
                    <Col sm="4">
                      <TextInput
                        name="thirdPlateNum"
                        placeholder="پنج رقم آخر پلاک..."
                        lableText="پنج رقم آخر"
                        disabled={checkIfPlateDisabled(values)}
                        significant
                      />
                    </Col>
                    <Col sm="4">
                      <TextInput
                        name="secondPlateNum"
                        placeholder="حرف وسط پلاک..."
                        // lableText=""
                        lableText="حرف وسط"
                        disabled={checkIfPlateDisabled(values)}
                        significant
                      />
                    </Col>
                    <Col sm="4">
                      <TextInput
                        name="firstPlateNum"
                        placeholder="دو رقم اول پلاک..."
                        lableText="دو رقم اول"
                        disabled={checkIfPlateDisabled(values)}
                        significant
                      />
                    </Col>
                  </Row>
                </FormDivider>
                <TextInput
                  id="engineNumber"
                  lableText="شماره موتور"
                  name="engineNumber"
                  placeholder="شماره موتور"
                  disabled={checkIfChassisDisabled(values)}
                  significant
                />
                <BasicSelectOption
                  lableText="نوع استفاده از ماشین"
                  name="typeOfMachineUse"
                  placeHolder="انتخاب نوع استفاده از ماشین "
                  data={carUseTypes}
                  significant
                />
                {values.typeOfMachineUse ? (
                  values.typeOfMachineUse.value === 2 ? (
                    <MultiSelectOption
                      labelText="محل ارائه خدمات"
                      name="locationOfServices"
                      hasLabel
                      placeHolder="انتخاب محل ارائه خدمات "
                      options={servicePlaceName}
                      significant
                    />
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
              </div>
            </TwoColumn>

            <TwoColumn>
              <div>
                <Col className={Styled["toggle-holder"]}>
                  <CustomInput
                    type="switch"
                    id="thirdPartyInsuranceStatus"
                    name="thirdPartyInsuranceStatus"
                    onChange={handleChange}
                    inline
                  >
                    <span className="switch-label">وضعیت بیمه شخص ثالث</span>
                  </CustomInput>
                </Col>

                {values.thirdPartyInsuranceStatus && (
                  <div className={Styled.animate}>
                    <ModernDatePicker
                      lableText="تاریخ اعتبار بیمه شخص ثالث"
                      name="thirdPartyInsuranceValidityDate"
                      placeholder="تاریخ اعتبار"
                      significant
                      hasMaximum={false}
                    />
                    <BasicSelectOption
                      lableText="نام شرکت بیمه ای"
                      name="thirdPartyInsuranceId"
                      placeHolder="انتخاب نام شرکت بیمه ای "
                      data={AllInsurances}
                      isLoading={isInsurancesLoading}
                      significant
                    />
                  </div>
                )}
              </div>

              <div>
                <Col className={Styled["toggle-holder"]}>
                  <CustomInput
                    type="switch"
                    id="hallInsuranceStatus"
                    name="hallInsuranceStatus"
                    onChange={handleChange}
                    inline
                  >
                    <span className="switch-label">وضعیت بیمه بدنه</span>
                  </CustomInput>
                </Col>

                {values.hallInsuranceStatus && (
                  <div className={Styled.animate}>
                    <ModernDatePicker
                      lableText="تاریخ بیمه بدنه"
                      name="hallInsuranceValidityDate"
                      placeholder="تاریخ بیمه بدنه"
                      significant
                      hasMaximum={false}
                    />
                    <BasicSelectOption
                      lableText="نام شرکت بیمه ای"
                      name="hallInsuranceId"
                      placeHolder="انتخاب نام شرکت بیمه ای "
                      data={AllInsurances}
                      isLoading={isInsurancesLoading}
                      significant
                    />
                  </div>
                )}
              </div>
            </TwoColumn>

            <SubmitButton
              isLoading={createUserMachinMutation.isLoading}
              nextTo="/PersonalInfo/ServicesInfo"
              backTo="/PersonalInfo/PersonalDocuments"
              values={values}
              initialValue={initiaState}
              schema={MachineryInfoValidate}
            />

            <div
              style={{
                marginTop: "35px",
                position: "relative",
                borderTop: "1px solid #ccc",
              }}
            >
              <DocumentsTable
                setAllUserMachines={setAllUserMachines}
                mutation={getAllUserMachines}
                tableData={AllUserMachines}
                isLoading={isAllUserMachinesFetching}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export { MachineryInfo };
