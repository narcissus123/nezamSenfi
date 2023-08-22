import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import {
  CustomInput,
  Col,
  CardHeader,
  Card,
  CardBody,
  CardTitle,
  Row,
} from "reactstrap";

import { TwoColumn } from "../../common/Wrapper/ColumnWrapper/TwoColumn";
import { FormDivider, MultiSelectOption, TextInput } from "../../common/Form";

import Styled from "./MachineryEdit.module.scss";
import BasicSelectOption from "../../common/Form/SelectOptionComponent/BasicSelectOption";
import {
  useGetAllMachineTypes,
  useGetAllMachineManufacturer,
  useGetAllMachine,
  useGetAllInsurances,
  useEditUserMachineByMachineId,
  useGerUserMachineByMachineId,
} from "./../../../core/services/api";
import { MachineryInfoValidate } from "../../../core/validations/machinery-info.validations";
import { SubmitButton } from "../../common/Form";
import { ModernDatePicker } from "../../common/Form";
import { useUserAuth } from "../../../core/utils/context/AuthenticationContext";
import { useHistory, useParams } from "react-router-dom";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner";
import { OptionRowSel } from "../../../core/models";
import BreadCrumbs from "../../common/@vuexy/breadCrumbs/BreadCrumb";

//this function searchs in data-list and find item which equal to value
const findValue = (data: Array<any>, value: any) => {
  let result = null;
  for (let i = 0; i < data.length; i++) {
    if (data[i].value === value) {
      result = data[i];
    }
  }
  return result ? result : { value: 0, label: "انتخاب کنید" };
};

const initialValue = {
  plateNumber: "",
  engineNumber: "",
  chassisNumber: "",
  serialNumberOrModel: "",
  locationOfServices: { value: 0, label: "انتخاب کنید" },
  typeOfOwnership: { value: 0, label: "انتخاب کنید" },
  typeOfMachineUse: { value: 0, label: "انتخاب کنید" },
  userInfoId: 0,
  machineryId: { value: 0, label: "انتخاب کنید" },
  // typeMachineId: { value: 0, label: "انتخاب کنید" },
  thirdPartyInsuranceId: { value: 0, label: "انتخاب کنید" },
  hallInsuranceId: { value: 0, label: "انتخاب کنید" },
  thirdPartyInsuranceValidityDate: "",
  hallInsuranceValidityDate: "",
  hallInsuranceStatus: false,
  thirdPartyInsuranceStatus: false,
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

const MachineryEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [connectivity, setConnectivity] = useState(false);
  const [connectivity2, setConnectivity2] = useState(false);
  const { userInfo } = useUserAuth();

  const EditUserMachineByMachineId = useEditUserMachineByMachineId();

  const {
    data: usrMachineDetails,
    isLoading: isUsrMachineDetailsLoading,
    isSuccess: isUsrMachineDetailsSuccess,
  } = useGerUserMachineByMachineId(id);

  // const {
  //   data: getAllMachinTypes,
  //   isSuccess: isGetAllMachinTypsSuccess,
  //   isLoading: isGetAllMachinTypesLoading,
  // } = useGetAllMachineTypes();
  const {
    data: getAllMachineManufacturer,
    isSuccess: isMachineManufacturerSuccess,
    isLoading: isMachineManufacturerLoading,
  } = useGetAllMachineManufacturer();
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

  const [initiaState, setInitiaState] = useState<any>(initialValue);
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

  useEffect(() => {
    // save user-machine-details to state
    if (usrMachineDetails?.data) {
      const result = usrMachineDetails.data.result;

      let hallInsuranceValidityDate: any = result.hallInsuranceValidityDate;

      let thirdPartyInsuranceValidityDate: any =
        result.thirdPartyInsuranceValidityDate;

      setConnectivity(result.thirdPartyInsuranceStatus);
      setConnectivity2(result.hallInsuranceStatus);

      let typeOfOwnership = findValue(
        ownershipTypes[0].options,
        result.typeOfOwnership
      );

      let thirdPartyInsuranceName = result.thirdPartyInsuranceName
        ? result.thirdPartyInsuranceName
        : "انتخاب کنید";
      let hallInsuranceName = result.hallInsuranceName
        ? result.hallInsuranceName
        : "انتخاب کنید";

      let halfOfPlate = "";
      let secondPlateNum = "";
      let thirdPlateNum = "";

      if (
        !checkIfPlateDisabled({
          chassisNumber: result.chassisNumber,
          engineNumber: result.engineNumber,
          serialNumberOrModel: result.serialNumberOrModel,
        })
      ) {
        halfOfPlate = result.plateNumber.substring(
          0,
          result.plateNumber.length - 5
        );
        secondPlateNum = halfOfPlate.slice(2);
        thirdPlateNum = result.plateNumber.replace(halfOfPlate, "");
      }
      setInitiaState({
        chassisNumber: result.plateNumber ? "" : result.chassisNumber,
        engineNumber: result.plateNumber ? "" : result.engineNumber,
        hallInsuranceId: {
          value: result.hallInsuranceId,
          label: hallInsuranceName,
        },
        hallInsuranceStatus: result.hallInsuranceStatus,
        hallInsuranceValidityDate: hallInsuranceValidityDate, //result.hallInsuranceValidityDate
        plateNumber: result.plateNumber,
        serialNumberOrModel: result.plateNumber
          ? ""
          : result.serialNumberOrModel,
        thirdPartyInsuranceValidityDate: thirdPartyInsuranceValidityDate, //result.thirdPartyInsuranceValidityDate
        userInfoId: userInfo.userInfoId,
        thirdPartyInsuranceStatus: result.thirdPartyInsuranceStatus,
        locationOfServices: result.locationOfServices
          ? result.locationOfServices.map((item: number) => ({
              value: item,
              label: "",
            }))
          : [],
        machineryId: { value: result.machineryId, label: result.machineName },
        thirdPartyInsuranceId: {
          value: result.thirdPartyInsuranceId,
          label: thirdPartyInsuranceName,
        },
        // typeMachineId: {
        //   value: result.typeMachineId,
        //   label: result.typeMachineName,
        // },
        typeOfMachineUse: {
          value: result.typeOfMachineUse,
          label: result.typeOfMachineUseTitle,
        },
        typeOfOwnership: typeOfOwnership,
        firstPlateNum:
          result.plateNumber && result.plateNumber.length > 0
            ? result.plateNumber.slice(0, 2)
            : "",
        secondPlateNum: secondPlateNum,
        thirdPlateNum: thirdPlateNum,
      });
    }
  }, [isUsrMachineDetailsSuccess]);

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

  useEffect(() => {
    // save machin-Manufacturer to state
    if (getAllMachineManufacturer?.data.result) {
      const result = getAllMachineManufacturer.data.result;
      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      setAllMachineManufacturer(pro);
    }
  }, [isMachineManufacturerSuccess]);

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

  const history = useHistory();

  const checkIfPlateDisabled = (values: any) => {
    console.log(values);

    if (
      (values.chassisNumber && values.chassisNumber.length > 0) ||
      (values.engineNumber && values.engineNumber.length > 0) ||
      (values.serialNumberOrModel && values.serialNumberOrModel.length > 0)
    ) {
      console.log("inside");
      return true;
    }
    console.log("outside");
    return false;
  };

  const onSubmit = (value: any) => {
    let hallInsuranceValidityDate: string = value.hallInsuranceValidityDate;
    const thirdPartyInsuranceValidityDate: string =
      value.thirdPartyInsuranceValidityDate;

    const dataSubmit = {
      userMachineId: id,
      plateNumber:
        value.firstPlateNum + value.secondPlateNum + value.thirdPlateNum,
      engineNumber: value.engineNumber,
      chassisNumber: value.chassisNumber,
      serialNumberOrModel: value.serialNumberOrModel,
      locationOfServices: value.locationOfServices
        ? value.locationOfServices.map((item: OptionRowSel) => item.value)
        : [],
      typeOfOwnership: value.typeOfOwnership.value,
      typeOfMachineUse: value.typeOfMachineUse.value,
      // typeMachineId: value.typeMachineId.value,
      thirdPartyInsuranceId: value.thirdPartyInsuranceStatus
        ? value.thirdPartyInsuranceId.value
        : 0,
      hallInsuranceId: value.hallInsuranceStatus
        ? value.hallInsuranceId.value
        : 0,
      thirdPartyInsuranceValidityDate: value.thirdPartyInsuranceStatus
        ? thirdPartyInsuranceValidityDate
        : "",
      hallInsuranceValidityDate: value.hallInsuranceStatus
        ? hallInsuranceValidityDate
        : "",
      hallInsuranceStatus: value.hallInsuranceStatus,
      thirdPartyInsuranceStatus: value.thirdPartyInsuranceStatus,
    };

    EditUserMachineByMachineId.mutate(
      { value: dataSubmit, id: id },
      {
        onSuccess: () => {
          history.push("/Beneficiari/Machinery");
        },
      }
    );
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

  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اطلاعات فردی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbParent2="اطلاعات ماشین"
        parentLink2="/Beneficiari/Machinery"
        breadCrumbActive="ویرایش اطلاعات ماشین"
      />
      <Card>
        <CardHeader>
          <CardTitle> بروزرسانی اطلاعات ماشین </CardTitle>
        </CardHeader>
        <CardBody>
          {isUsrMachineDetailsLoading ? (
            <FallBackSpinner />
          ) : (
            <Formik
              initialValues={initiaState}
              onSubmit={(value) => onSubmit(value)}
              enableReinitialize={true}
              validationSchema={MachineryInfoValidate}
            >
              {({ values, handleChange }) => {
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
                          isDisabled={true}
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
                        isDisabled={true}
                      /> */}
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
                            onChange={(e) => {
                              handleChange(e);
                              setConnectivity((s) => !s);
                            }}
                            defaultValue={connectivity ? 1 : 0}
                            checked={connectivity}
                            inline
                          >
                            <span className="switch-label">
                              وضعیت بیمه شخص ثالث
                            </span>
                          </CustomInput>
                        </Col>

                        {values.thirdPartyInsuranceStatus && (
                          <div className={Styled.animate}>
                            <ModernDatePicker
                              lableText="تاریخ اعتبار بیمه شخص ثالث"
                              name="thirdPartyInsuranceValidityDate"
                              placeholder="تاریخ اعتبار"
                              hasMaximum={false}
                              initialValue={
                                initiaState.thirdPartyInsuranceValidityDate
                              }
                              significant
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
                            onChange={(e) => {
                              handleChange(e);
                              setConnectivity2((s) => !s);
                            }}
                            defaultValue={connectivity2 ? 1 : 0}
                            checked={connectivity2}
                            inline
                          >
                            <span className="switch-label">
                              وضعیت بیمه بدنه
                            </span>
                          </CustomInput>
                        </Col>

                        {values.hallInsuranceStatus && (
                          <div className={Styled.animate}>
                            <ModernDatePicker
                              lableText="تاریخ بیمه بدنه"
                              name="hallInsuranceValidityDate"
                              placeholder="تاریخ بیمه بدنه"
                              initialValue={
                                initiaState.hallInsuranceValidityDate
                              }
                              hasMaximum={false}
                              significant
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
                      isLoading={EditUserMachineByMachineId.isLoading}
                      backTo="/Beneficiari/Machinery"
                      initialValue={initiaState}
                      values={values}
                    />
                  </Form>
                );
              }}
            </Formik>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export { MachineryEdit };
