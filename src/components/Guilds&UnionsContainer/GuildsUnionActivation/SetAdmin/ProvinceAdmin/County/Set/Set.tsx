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
import {
  useGetAllCountyByProvinceId,
  useGetOwnedUserProvinceGuildRoomsForAdmin,
  useGetUserByNationalCode,
  usePostSetUserToCountyAdmin,
} from "../../../../../../../core/services/api";
import { showToast } from "../../../../../../../core/utils";
import { refetchContext } from "../../../../../../../core/utils/context/EventContext";
import { CountySetAdminValidate } from "../../../../../../../core/validations/county-setadmin.validations";
import { SubmitButton } from "../../../../../../common/Form";
import { InputGroupSearch } from "../../../../../../common/Form/InputComponents/InputGroupSearch/InputGroupSearch";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

interface IPropTypes {

}

const Set: FC<IPropTypes> = ({}) => {
  const [initialValues, setInitialValues] = useState<any>({
    province: null,
    userSearch: "",
    county: null,
  });
  const [userInfo, setUserInfo] = React.useState<any>(null);
  const [currentUserProvinces, setCurrentUserProvinces] = useState<any>([]);
  const [allCounty, setAllCounty] = useState<any>([]);

  const getUserByNationalIdMutation = useGetUserByNationalCode();
  const {
    data,
    isSuccess,
    isFetching,
  } = useGetOwnedUserProvinceGuildRoomsForAdmin();

  const getCounty = useGetAllCountyByProvinceId();

  const setAdminMutation = usePostSetUserToCountyAdmin();

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
        newOptions.push({ value: row.id, 
          label: `${row.proviceTitle ? row.proviceTitle : ""} (${
            row.title ? row.title : ""
          })`
        });
      });
      newProvinces[0].options = newOptions;
      setCurrentUserProvinces(newProvinces);
    }
  }, [isSuccess, data]);

  const onSearchUser = (userSearch: string) => {
    setUserInfo(null);
    if (userSearch)
      getUserByNationalIdMutation.mutate(userSearch, {
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
      });
    else showToast(["لطفا کد ملی کاربر را وارد کنید"], ToastTypes.error);
  };

  const onSubmit = (value: any) => {
    if (!userInfo && !value.userSearch) {
      showToast(["لطفا کاربر مورد نظر را وارد کنید"], ToastTypes.error);
      return;
    }

    if (userInfo) {
      const setAdminObj = {
        userId: userInfo.id,
        countyId: value.county.value,
      };
      if (userInfo && value.userSearch === userInfo.nationalCode) {
        return setAdminMutation.mutate(setAdminObj, {
          onSuccess: (val: any) => {
            showToast(["با موفقیت ثبت شد"], ToastTypes.success);
            const newEvent = {...refetchEvent}
            newEvent.countyAdminRemove = !newEvent.countyAdminRemove
            setRefetchEvent(newEvent)
          },
        });
      }

      setUserInfo(null);
    } else if (value.userSearch)
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
            setUserInfo(userObj);
            const setAdminObj = {
              userId: userObj.id,
              countyId: value.county.value,
            };
            setAdminMutation.mutate(setAdminObj, {
              onSuccess: (val: any) => {
                showToast(["با موفقیت ثبت شد"], ToastTypes.success);
                const newEvent = {...refetchEvent}
                 newEvent.countyAdminRemove = !newEvent.countyAdminRemove
                setRefetchEvent(newEvent)
              },
            });
          } else {
            showToast(["کاربر مورد نظر یافت نشد"], ToastTypes.error);
          }
        },
      });
    else showToast(["لطفا کاربر مورد نظر را وارد کنید"], ToastTypes.error);
  };

  const onProvinceChange = (opt: any, e: any, setFieldValue: any) => {
    setFieldValue("province", { value: opt.value, label: opt.label });
    getCounty.mutate(opt.value, {
      onSuccess: (val: any) => {
        console.log(val.data.result);
        const result = val.data.result;
        let newOptions: any = [];
        let newCounties = [
          {
            label: "سرلیست شهرستان",
            options: [],
          },
        ];

        result.forEach((row: any) => {
          newOptions.push({ value: row.id, label: row.title });
        });
        newCounties[0].options = newOptions;
        setAllCounty(newCounties);
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ثبت ادمین شهرستانی</CardTitle>
      </CardHeader>
      <CardBody>
        <>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={CountySetAdminValidate}
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
                      <Col md="4">
                        <FormGroup>
                          <InputGroupSearch
                            name="userSearch"
                            handleChange={handleChange}
                            lableText="نام کاربری"
                            placeholder="کد ملی کاربر را وارد کنید"
                            value={values.userSearch}
                            significant
                            loading={getUserByNationalIdMutation.isLoading}
                            onSearch={() => onSearchUser(values.userSearch)}
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
                      <Col md="4">
                        <BasicSelectOption
                          isLoading={isFetching}
                          significant={true}
                          name="province"
                          placeHolder="انتخاب استان ..."
                          data={currentUserProvinces}
                          onChange={(opt, e) =>
                            onProvinceChange(opt, e, setFieldValue)
                          }
                          lableText="انتخاب استان"
                        />
                      </Col>
                      <Col sm="4">
                        <BasicSelectOption
                          isLoading={getCounty.isLoading}
                          significant={true}
                          name="county"
                          placeHolder="انتخاب شهرستان ..."
                          data={allCounty}
                          lableText="انتخاب شهرستان"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <SubmitButton
                          isLoading={setAdminMutation.isLoading}
                          schema={CountySetAdminValidate}
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
