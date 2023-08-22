import { Formik, Form } from "formik";
import * as React from "react";
import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  CustomInput,
  FormGroup,
  Row,
} from "reactstrap";
import { EducationFiledType } from "../../../../../../../core/data/personal-info.data";
import { ToastTypes } from "../../../../../../../core/enums";
import { ISetRealIdentityInfo } from "../../../../../../../core/models";
import {
  useGetAllAccademies,
  useUserRealIdentity,
} from "../../../../../../../core/services/api";
import { useChangeUserRealIdentityInformationRequest } from "../../../../../../../core/services/api/identity-change-request";
import {
  fullOption,
  genderStatus,
  gradeStatus,
  maritalStatus,
  militaryStatus,
  ObjectPersianToEnglish,
  showToast,
} from "../../../../../../../core/utils";
import { useUserAuth } from "../../../../../../../core/utils/context/AuthenticationContext";
import { useStatusPermission } from "../../../../../../../core/utils/context/StatusProvider";
import { IdentityValidate } from "../../../../../../../core/validations/identitiy.validations";
import {
  FieldWrapper,
  ModernDatePicker,
  SubmitButton,
  TextInput,
} from "../../../../../../common/Form";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { FallBackSpinner } from "../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import TreeColumn from "../../../../../../common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn";
import Styles from "./RealIdentityInfo.module.scss";

const RealIdentityInfo: FC = () => {
  const updateFields = (val: any) => {
    if (val.gender.value === 1) {
      val.dutySystemState = { value: 0, label: "انتخاب کنید" };
      val.dutyEndCartNumber = "";
      val.dutyEndCartDate = "";
    }
    if (val.dutySystemState.value === 1) {
      val.dutyEndCartNumber = "";
      val.dutyEndCartDate = "";
    }
    if (val.educationLevel.value >= 7) {
      val.educationFiled = "";
    }
    if (val.maritalStatus.value === 1) {
      val.countOfBoyChilds = 0;
      val.countOfGirlChilds = 0;
    }
    return val;
  };

  const [connectivity, setConnectivity] = useState(false);
  const [academy, setAcademy] = useState([]);
  
  const history = useHistory<any>()

  const { data, isFetching, isLoading, isSuccess } = useUserRealIdentity();
  const getAllAcademi = useGetAllAccademies();
  //const { result: userData } = data.data;

  const [initialState, setInitialState] = useState<any>({
    dutySystemState: { value: 0, label: "انتخاب کنید" },
    gender: { value: 0, label: "انتخاب کنید" },
    educationLevel: { value: 0, label: "انتخاب کنید" },
    educationFiled: "",
    maritalStatus: { value: 0, label: "انتخاب کنید" },
    relationToAgriculture: false,
    countOfBoyChilds: "",
    countOfGirlChilds: "",
    dutyEndCartNumber: "",
    dutyEndCartDate: "",
    name: data && data.data ? data.data.result : "",
    lastName: "",
    meli: "",
    idNumber: "",
    fathersName: "",
    birthDate: null,
    idIssuePlace: "",
    accademyId: null,
    isUserHaveLicense: false,
  });

  useEffect(() => {
    if (data && data.data) {
      const values = data.data.result;

      setConnectivity(values.relationToAgriculture);

      setInitialState({
        birthDate: values.birthDate,
        name: values.name,
        lastName: values.lastName,
        relationToAgriculture: values.relationToAgriculture,
        educationFiled: values.educationFiledEnum
          ? { value: values.educationFiledEnum, label: "" }
          : null,
        countOfBoyChilds: values.countOfBoyChilds,
        countOfGirlChilds: values.countOfGirlChilds,
        dutyEndCartNumber: values.dutyEndCartNumber,
        idIssuePlace: values.idIssuePlace,
        meli: values.nationalCode,
        idNumber: values.idNumber,
        dutyEndCartDate: values.dutyEndCartDate,
        fathersName: values.fathersName,
        gender: values.gender
          ? fullOption(values.gender, genderStatus)
          : { value: 0, label: "انتخاب کنید" },
        maritalStatus: values.maritalStatus
          ? fullOption(values.maritalStatus, maritalStatus)
          : { value: 0, label: "انتخاب کنید" },
        dutySystemState: values.dutySystemState
          ? fullOption(values.dutySystemState, militaryStatus)
          : { value: 0, label: "انتخاب کنید" },
        educationLevel: values.educationLevel
          ? fullOption(values.educationLevel, gradeStatus)
          : { value: 0, label: "انتخاب کنید" },
        accademyId: values.accademyId
          ? { value: values.accademyId, label: values.accademyTitle }
          : {
              value: 0,
              label: "انتخاب کنید",
            },
        isUserHaveLicense: values.isUserHaveLicense,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (getAllAcademi.isSuccess) {
      const result = getAllAcademi.data.data.result;
      const academies: any = [
        {
          label: "یک گزینه را انتخاب کنید...",
          options: [],
        },
      ];

      result.forEach((item: any) => {
        academies[0].options.push({
          value: item.id,
          label: item.title,
          level: item.level,
          levelTitle: item.levelTitle,
          address: item.address,
        });
      });

      setAcademy(academies);
    }
  }, [getAllAcademi.isSuccess]);

  const UpdateUser = useChangeUserRealIdentityInformationRequest();

  const { setStatus } = useStatusPermission();

  const { setUserInfoState } = useUserAuth();

  const onSubmit = async (values: any) => {
    values = updateFields(values);

    values = ObjectPersianToEnglish(values);

    const obj: ISetRealIdentityInfo = {
      birthDate: values.birthDate ? values.birthDate : "",
      countOfBoyChilds: values.countOfBoyChilds ? values.countOfBoyChilds : 0,
      countOfGirlChilds: values.countOfGirlChilds
        ? values.countOfGirlChilds
        : 0,
      dutyEndCartDate: values.dutyEndCartDate ? values.dutyEndCartDate : null,
      dutyEndCartNumber: values.dutyEndCartNumber
        ? values.dutyEndCartNumber
        : null,
      maritalStatus: values.maritalStatus.value,
      educationLevel: values.educationLevel.value,
      educationFiledEnum: values.educationFiled
        ? values.educationFiled.value
        : 0,
      fathersName: values.fathersName,
      gender: values.gender.value,
      name: values.name,
      lastName: values.lastName,
      idNumber: values.idNumber,
      relationToAgriculture: values.relationToAgriculture,
      idIssuePlace: values.idIssuePlace,
      dutySystemState: values.dutySystemState.value,
      accademyId: values.accademyId.value,
    };

    UpdateUser.mutate(obj, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
        history.push("/ChangePersonalInfo/List")
      },
    });
    setStatus((state) => state + 1);
    setInitialState(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تغییر اطلاعات هویتی</CardTitle>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={initialState}
          validationSchema={IdentityValidate}
          enableReinitialize={true}
          onSubmit={(value) => onSubmit(value)}
        >
          {({ values, handleChange, setFieldError }) => {
            return (
              <FieldWrapper
                useMutate={UpdateUser}
                setFieldError={setFieldError}
              >
                {isFetching ? (
                  <>
                    <FallBackSpinner />
                  </>
                ) : (
                  <>
                    <Form>
                      <TreeColumn>
                        <div>
                          <FormGroup>
                            <TextInput
                              lableText="نام"
                              name="name"
                              type="text"
                              placeholder="نام"
                              //value="نام"
                              // disabled={values.isUserHaveLicense}
                              significant
                            />
                            {/* will edit afer get api */}
                          </FormGroup>

                          <FormGroup>
                            <TextInput
                              lableText="نام خانوادگی"
                              name="lastName"
                              type="text"
                              placeholder="نام خانوادگی"
                              //value="نام خانوادگی"
                              // disabled={values.isUserHaveLicense}
                              significant
                            />
                            {/* will edit afer get api */}
                          </FormGroup>

                          <BasicSelectOption
                            lableText="جنسیت"
                            significant={true}
                            selectedDefault={{ value: 2, label: "مرد" }}
                            name="gender"
                            data={genderStatus}
                            // isDisabled={values.isUserHaveLicense}
                          />

                          <FormGroup>
                            <TextInput
                              lableText="کد ملی"
                              name="meli"
                              type="text"
                              placeholder="کد ملی"
                              //value="کد ملی"
                              disabled
                              className={Styles.disabled}
                              significant
                            />
                            {/* will edit afer get api */}
                          </FormGroup>

                          <FormGroup>
                            <TextInput
                              lableText="شماره شناسنامه"
                              name="idNumber"
                              placeholder="شماره شناسنامه"
                              //value="شماره شناسنامه"
                              // disabled={values.isUserHaveLicense}
                              significant
                            />
                            {/* will edit afer get api */}
                          </FormGroup>
                        </div>

                        <div>
                          <FormGroup>
                            <TextInput
                              lableText="نام پدر "
                              name="fathersName"
                              type="text"
                              placeholder="نام پدر "
                              // disabled={values.isUserHaveLicense}
                              //value="نام پدر "
                              significant
                            />
                          </FormGroup>

                          <FormGroup>
                            <TextInput
                              lableText="محل صدور"
                              name="idIssuePlace"
                              type="text"
                              placeholder="محل صدور"
                              // disabled={values.isUserHaveLicense}
                              //value="محل صدور"
                            />
                          </FormGroup>

                          <FormGroup>
                            <ModernDatePicker
                              lableText="تاریخ تولد"
                              name="birthDate"
                              placeholder="...تاریخ تولد را وارد کنید"
                              // disabled={values.isUserHaveLicense}
                              initialValue={initialState.birthDate}
                              significant
                            />
                          </FormGroup>

                          <BasicSelectOption
                            lableText="وضعیت تاهل"
                            significant={true}
                            selectedDefault={{ value: 1, label: "مجرد" }}
                            name="maritalStatus"
                            data={maritalStatus}
                          />

                          {values.maritalStatus.value > 1 && (
                            <Row className={Styles.animate}>
                              <Col md="6" sm="12">
                                <TextInput
                                  lableText="تعداد پسر"
                                  name="countOfBoyChilds"
                                  type="number"
                                  placeholder="تعداد پسر"
                                  significant
                                />
                              </Col>
                              <Col md="6" sm="12">
                                <TextInput
                                  lableText="تعداد دختر"
                                  name="countOfGirlChilds"
                                  type="number"
                                  placeholder="تعداد دختر"
                                  significant
                                />
                              </Col>
                            </Row>
                          )}
                        </div>

                        <div>
                          {values.gender.value > 1 && (
                            <div>
                              <FormGroup id="military">
                                <BasicSelectOption
                                  lableText="نظام وظیفه"
                                  significant={true}
                                  //selectedDefault={{ value: 1, label: "فاقد کارت" }}
                                  name="dutySystemState"
                                  data={militaryStatus}
                                />
                              </FormGroup>

                              {values.dutySystemState.value >= 2 && (
                                <div className={Styles.animate}>
                                  <TextInput
                                    lableText="شماره کارت پایان خدمت"
                                    name="dutyEndCartNumber"
                                    type="text"
                                    placeholder="شماره کارت پایان خدمت/معافيت"
                                    significant
                                  />

                                  <ModernDatePicker
                                    lableText="تاریخ اخذ کارت پایان خدمت"
                                    name="dutyEndCartDate"
                                    placeholder="تاریخ اخذ کارت پایان خدمت را وارد کنید"
                                    initialValue={initialState.dutyEndCartDate}
                                  />
                                </div>
                              )}
                            </div>
                          )}

                          <FormGroup id="grade">
                            <BasicSelectOption
                              lableText="تحصیلات"
                              significant={true}
                              selectedDefault={{
                                value: 0,
                                label: "انتخاب تحصیلات",
                              }}
                              name="educationLevel"
                              data={gradeStatus}
                            />
                          </FormGroup>

                          {values.educationLevel.value < 7 &&
                            values.educationLevel.value !== 0 && (
                              <div className={Styles.animate}>
                                <BasicSelectOption
                                  lableText="رشته"
                                  name="educationFiled"
                                  placeHolder="رشته"
                                  significant
                                  data={EducationFiledType}
                                />
                                {values.educationLevel.value !== 6 && (
                                  <BasicSelectOption
                                    data={academy}
                                    name="accademyId"
                                    hasLabel
                                    lableText="دانشگاه"
                                    significant
                                    placeHolder="دانشگاه خود را انتخاب کنید..."
                                  />
                                )}

                                <Col
                                  className={`${Styles["toggle-holder"]} ${Styles.under}`}
                                >
                                  <CustomInput
                                    type="switch"
                                    id="exampleCustomSwitch"
                                    name="relationToAgriculture"
                                    defaultValue={connectivity ? 1 : 0}
                                    checked={connectivity}
                                    onChange={(e) => {
                                      handleChange(e);
                                      setConnectivity((s) => !s);
                                    }}
                                    inline
                                  >
                                    <span className="switch-label">
                                      ارتباط رشته تحصیلی با کشاورزی
                                    </span>
                                  </CustomInput>
                                </Col>
                              </div>
                            )}
                        </div>
                      </TreeColumn>

                      <SubmitButton
                        isLoading={UpdateUser.isLoading}
                        nextTo="/PersonalInfo/ContactInfo"
                        schema={IdentityValidate}
                        values={values}
                        initialValue={initialState}
                      />
                    </Form>
                  </>
                )}
              </FieldWrapper>
            );
          }}
        </Formik>
      </CardBody>
    </Card>
  );
};

export { RealIdentityInfo };
