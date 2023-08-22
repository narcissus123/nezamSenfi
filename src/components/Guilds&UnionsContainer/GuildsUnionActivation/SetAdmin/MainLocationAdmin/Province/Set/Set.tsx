import { Form, Formik } from "formik";
import React, { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Row,
} from "reactstrap";
import { ToastTypes } from "../../../../../../../core/enums";
import { useGetAllprovinces, useGetUserByNationalCode, usePostSetUserToProvinceAdmin } from "../../../../../../../core/services/api";
import { showToast } from "../../../../../../../core/utils";
import { refetchContext } from "../../../../../../../core/utils/context/EventContext";
import { ProvinceSetAdminValidate } from "../../../../../../../core/validations/porvince-guild-setadmin.validations";
import { SubmitButton } from "../../../../../../common/Form";
import { InputGroupSearch } from "../../../../../../common/Form/InputComponents/InputGroupSearch/InputGroupSearch";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";


interface IPropTypes {}

const Set: FC<IPropTypes> = ({}) => {
  const [initialValues, setInitialValues] = useState<any>({
    province: null,
    userSearch: "",
  });
  const [servicesId, setServicesId] = React.useState<any>(null);
  const [userInfo, setUserInfo] = React.useState<any>(null);
  const [currentUserProvinces, setCurrentUserProvinces] = useState<any>([]);

  const getUserByNationalIdMutation = useGetUserByNationalCode();
  const { data, isSuccess, isFetching } = useGetAllprovinces();

  const setAdminMutation = usePostSetUserToProvinceAdmin();

  const {refetchEvent,setRefetchEvent} = useContext(refetchContext)

  useEffect(() => {
    if (data) {
      let queryData: any = data;
      let newOptions: any = [];
      let newProvinces = [
        {
          label: "سرلیست استان",
          options: [],
        },
      ];

      queryData.data.result.forEach((row: any) => {
        newOptions.push({ value: row.id, label: row.title });
      });
      newProvinces[0].options = newOptions;
      setCurrentUserProvinces(newProvinces);
    }
  }, [isSuccess, data]);

  const onSubmit = (value: any) => {
    if (userInfo && value.userSearch === userInfo.nationalCode) {
      let setAdminObj = {
        userId: userInfo.id,
        provinceId: value.province.value,
      };

      return setAdminMutation.mutate(setAdminObj, {
        onSuccess: (val: any) => {
          showToast(["با موفقیت ثبت شد"], ToastTypes.success);
          const newEvent = {...refetchEvent}
          newEvent.provinceAdminRemove = !newEvent.provinceAdminRemove
          setRefetchEvent(newEvent)
        },
      });
    }

    setUserInfo(null);

    getUserByNationalIdMutation.mutate(value.userSearch, {
      onSuccess: (val: any) => {
        if (val.data && val.data.result) {
          const user = val.data.result;
          const userObj = {
            nationalCode: user.nationalCode,
            id: user.id,
            fullName: `${user.name} ${user.lastName}`,
            email: user.email,
          };

          let setAdminObj = {
            userId: user.id,
            provinceId: value.province.value,
          };

          setUserInfo(userObj);
          setAdminMutation.mutate(setAdminObj, {
            onSuccess: (val: any) => {
              showToast(["با موفقیت ثبت شد"], ToastTypes.success);
              const newEvent = {...refetchEvent}
              newEvent.provinceAdminRemove = !newEvent.provinceAdminRemove
              setRefetchEvent(newEvent);
            },
          });
        } else {
          showToast(["کاربر مورد نظر یافت نشد"], ToastTypes.error);
        }
      },
      onError: (err: any) => {
        //showToast(['مشکلی پیش آمد!'],'error')
      },
    });
    //showToast(["کاربر مورد نظر یافت نشد"], ToastTypes.error);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ثبت ادمین استانی</CardTitle>
      </CardHeader>
      <CardBody>
        <>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={ProvinceSetAdminValidate}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              handleChange,
              touched,
              getFieldProps,
              setFieldValue,
            }) => {
              return (
                <Form>
                  <>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <InputGroupSearch
                            handleChange={(e: any) => {
                              handleChange(e);
                            }}
                            lableText="نام کاربری"
                            significant
                            name="userSearch"
                            placeholder="کد ملی کاربر را وارد کنید"
                            value={values.userSearch}
                            loading={getUserByNationalIdMutation.isLoading}
                            onSearch={() => {
                              setUserInfo(null);
                              setServicesId(null);
                              getUserByNationalIdMutation.mutate(
                                values.userSearch,
                                {
                                  onSuccess: (val: any) => {
                                    if (val.data && val.data.result) {
                                      const user = val.data.result;
                                      const userObj = {
                                        nationalCode: user.nationalCode,
                                        id: user.id,
                                        fullName: `${user.name} ${user.lastName}`,
                                        email: user.email,
                                      };
                                      setUserInfo(userObj);
                                    }
                                  },
                                  onError: (err: any) => {
                                    //showToast(['مشکلی پیش آمد!'],'error')
                                  },
                                }
                              );
                            }}
                          />
                        </FormGroup>

                        <FormGroup>
                          {userInfo && (
                            <Alert color="success">
                              <p>اطلاعات کاربر:</p>
                              <p>نام و نام خانوادگی : {userInfo.fullName} </p>
                              <p>ایمیل : {userInfo.email} </p>
                              <p>
                                <Link
                                  target="_blank"
                                  to={`/UserList/RealUsersList/${userInfo.id}`}
                                >
                                  <Button
                                    size="md"
                                    color="warning"
                                    onClick={() => {}}
                                  >
                                    نمایش جزئیات کاربر &nbsp;
                                  </Button>
                                </Link>
                              </p>
                            </Alert>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <BasicSelectOption
                          isLoading={isFetching}
                          significant={true}
                          name="province"
                          placeHolder="انتخاب استان ..."
                          data={currentUserProvinces}
                          lableText="انتخاب استان"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <SubmitButton
                          isLoading={setAdminMutation.isLoading}
                          schema={ProvinceSetAdminValidate}
                          values={values}
                          initialValue={initialValues}
                        />
                      </Col>
                    </Row>
                  </>
                </Form>
              );
            }}
          </Formik>
        </>
      </CardBody>
    </Card>
  );
};

export { Set };
