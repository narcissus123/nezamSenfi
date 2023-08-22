import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import "react-toggle/style.css";
import {
  CardHeader,
  CardTitle,
  Col,
  CustomInput,
  FormGroup,
  Row,
} from "reactstrap";
import { useUserRealIdentityById } from "../../../../../core/services/api";
import {
  fullOption,
  genderStatus,
  getCustomDate,
  gradeStatus,
  maritalStatus,
  militaryStatus,
} from "../../../../../core/utils";
import { IdentityValidate } from "../../../../../core/validations/identitiy.validations";
import { ModernDatePicker, TextInput } from "../../../../common/Form";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import TreeColumn from "../../../../common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn";
import Styles from "./UserRealIdentity.module.scss";

interface IPropTypes {
  id: number | string;
}

const UserRealIdentity: FC<IPropTypes> = ({ id }) => {
  const [connectivity, setConnectivity] = useState(false);

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
    name: "",
    lastName: "",
    meli: "",
    idNumber: "",
    fathersName: "",
    birthDate: null,
    idIssuePlace: "",
    accademyId: null,
  });

  const userInfo = useUserRealIdentityById(+id);

  useEffect(() => {
    if (userInfo.isSuccess) {
      const result = userInfo.data.data.result;
      setInitialState({
        birthDate: result.birthDate,
        name: result.name,
        lastName: result.lastName,
        relationToAgriculture: result.relationToAgriculture,
        countOfBoyChilds: result.countOfBoyChilds,
        countOfGirlChilds: result.countOfGirlChilds,
        dutyEndCartNumber: result.dutyEndCartNumber,
        idIssuePlace: result.idIssuePlace,
        meli: result.nationalCode,
        idNumber: result.idNumber,
        dutyEndCartDate: result.dutyEndCartDate,
        fathersName: result.fathersName,
        gender: result.gender
          ? fullOption(result.gender, genderStatus)
          : { value: 0, label: "انتخاب کنید" },
        maritalStatus: result.maritalStatus
          ? fullOption(result.maritalStatus, maritalStatus)
          : { value: 0, label: "انتخاب کنید" },
        dutySystemState: result.dutySystemState
          ? fullOption(result.dutySystemState, militaryStatus)
          : { value: 0, label: "انتخاب کنید" },
        educationLevel: result.educationLevel
          ? fullOption(result.educationLevel, gradeStatus)
          : { value: 0, label: "انتخاب کنید" },
        accademyId: result.accademyId
          ? { value: result.accademyId, label: result.accademyTitle }
          : {
              value: 0,
              label: "انتخاب کنید",
            },
        educationFiled: result.educationFiledEnum
          ? {
              value: result.educationFiledEnum,
              label: result.educationFiledEnumTitle,
            }
          : { value: 0, label: "نامشخص" },
      });
    }
  }, [userInfo.isSuccess]);

  return userInfo.isLoading ? (
    <FallBackSpinner />
  ) : (
    <>
      <CardTitle>اطلاعات هویتی</CardTitle>
      <Formik
        initialValues={initialState}
        //validationSchema={IdentityValidate}
        enableReinitialize={true}
        onSubmit={(value) => {}}
      >
        {({ values, handleChange, setFieldError }) => {
          return (
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
                      disabled
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

                      disabled
                    />
                    {/* will edit afer get api */}
                  </FormGroup>

                  <BasicSelectOption
                    lableText="جنسیت"
                    selectedDefault={{ value: 2, label: "مرد" }}
                    name="gender"
                    data={genderStatus}
                    isDisabled
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
                    />
                    {/* will edit afer get api */}
                  </FormGroup>

                  <FormGroup>
                    <TextInput
                      lableText="شماره شناسنامه"
                      name="idNumber"
                      placeholder="شماره شناسنامه"
                      //value="شماره شناسنامه"

                      disabled
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
                      //value="نام پدر "
                      disabled
                    />
                  </FormGroup>

                  <FormGroup>
                    <TextInput
                      lableText="محل صدور"
                      name="idIssuePlace"
                      type="text"
                      placeholder="محل صدور"
                      disabled
                      //value="محل صدور"
                    />
                  </FormGroup>

                  <FormGroup>
                    <ModernDatePicker
                      lableText="تاریخ تولد"
                      name="birthDate"
                      placeholder="...تاریخ تولد را وارد کنید"
                      initialValue={initialState.birthDate}
                      disabled
                    />
                  </FormGroup>

                  <BasicSelectOption
                    lableText="وضعیت تاهل"
                    selectedDefault={{ value: 1, label: "مجرد" }}
                    name="maritalStatus"
                    data={maritalStatus}
                    isDisabled
                  />

                  {values.maritalStatus.value > 1 && (
                    <Row className={Styles.animate}>
                      <Col md="6" sm="12">
                        <TextInput
                          lableText="تعداد پسر"
                          name="countOfBoyChilds"
                          type="number"
                          placeholder="تعداد پسر"
                          disabled
                        />
                      </Col>
                      <Col md="6" sm="12">
                        <TextInput
                          lableText="تعداد دختر"
                          name="countOfGirlChilds"
                          type="number"
                          disabled
                          placeholder="تعداد دختر"
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
                          //selectedDefault={{ value: 1, label: "فاقد کارت" }}
                          name="dutySystemState"
                          isDisabled
                          data={militaryStatus}
                        />
                      </FormGroup>

                      {values.dutySystemState.value >= 2 && (
                        <div className={Styles.animate}>
                          <TextInput
                            lableText="شماره کارت پایان خدمت"
                            name="dutyEndCartNumber"
                            type="text"
                            disabled
                            placeholder="شماره کارت پایان خدمت/معافيت"
                          />

                          <ModernDatePicker
                            lableText="تاریخ اخذ کارت پایان خدمت"
                            name="dutyEndCartDate"
                            disabled
                            placeholder="تاریخ اخذ کارت پایان خدمت را وارد کنید"
                            initialValue={initialState.time}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <FormGroup id="grade">
                    <BasicSelectOption
                      lableText="تحصیلات"
                      selectedDefault={{ value: 0, label: "انتخاب تحصیلات" }}
                      name="educationLevel"
                      isDisabled
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
                          isDisabled
                          data={[]}
                        />

                        <BasicSelectOption
                          data={[]}
                          name="accademyId"
                          hasLabel
                          lableText="دانشگاه"
                          isDisabled
                          placeHolder="دانشگاه خود را انتخاب کنید..."
                        />

                        <Col
                          className={`${Styles["toggle-holder"]} ${Styles.under}`}
                        >
                          <CustomInput
                            type="switch"
                            id="exampleCustomSwitch"
                            name="relationToAgriculture"
                            defaultValue={connectivity ? 1 : 0}
                            checked={connectivity}
                            disabled
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
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { UserRealIdentity };
