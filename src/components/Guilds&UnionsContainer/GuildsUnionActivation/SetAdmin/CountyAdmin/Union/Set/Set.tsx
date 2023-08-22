import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
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
import { useGetCountyUnionByCountyId, useGetOwnedUserCountyGuildRoomsForAdmin, useGetUserByNationalCode, useSetUserToUnionAdmin } from "../../../../../../../core/services/api";
import { showToast } from "../../../../../../../core/utils";
import { UnionSetAdminValidate } from "../../../../../../../core/validations/union-setadmin.validations";
import { SubmitButton } from "../../../../../../common/Form";
import { InputGroupSearch } from "../../../../../../common/Form/InputComponents/InputGroupSearch/InputGroupSearch";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";


interface IPropTypes {}

const  Set: FC<IPropTypes> = ({}) => {
  const [initialValues, setInitialValues] = useState<any>({
    county: null,
    userSearch: "",
    union: null,
  });
  const [userInfo, setUserInfo] = useState<any>(null);
  const [currentUserCounty, setCurrentUserCounty] = useState<any>([]);
  const [allUnion, setAllUnion] = useState<any>([]);

  const getUserByNationalIdMutation = useGetUserByNationalCode();
  const {
    data,
    isSuccess,
    isFetching,
  } = useGetOwnedUserCountyGuildRoomsForAdmin();

  const getUnion = useGetCountyUnionByCountyId();

  const setAdminMutation = useSetUserToUnionAdmin();

  useEffect(() => {
    if (data) {
      let queryData: any = data;
      let newOptions: any = [];
      let newCounties = [
        {
          label: "سرلیست شهرستان",
          options: [],
        },
      ];

      queryData.data.result.forEach((row: any) => {
        newOptions.push({
          value: row.id,
          label: `${row.countyTitle ? row.countyTitle : ""} (${row.title ? row.title : ""})`
          
        });
      });
      newCounties[0].options = newOptions;
      setCurrentUserCounty(newCounties);
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
        countyUnionId: value.union.value,
      };
      if (userInfo && value.userSearch === userInfo.nationalCode) {
        return setAdminMutation.mutate(setAdminObj, {
          onSuccess: (val: any) => {
            showToast(["با موفقیت ثبت شد"], ToastTypes.success);
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
              },
            });
          } else {
            showToast(["کاربر مورد نظر یافت نشد"], ToastTypes.error);
          }
        },
      });
    else showToast(["لطفا کاربر مورد نظر را وارد کنید"], ToastTypes.error);
  };

  const onCountyChange = (opt: any, e: any, setFieldValue: any) => {
    setFieldValue("county", { value: opt.value, label: opt.label });
    getUnion.mutate(
      { page: 1, pageSize: 100, countyId: opt.value },
      {
        onSuccess: (val: any) => {
          // console.log(val.data.result);
          const result = val.data.result.unions;
          let newOptions: any = [];
          let newCounties = [
            {
              label: "سرلیست اتحادیه",
              options: [],
            },
          ];

          result.forEach((row: any) => {
            newOptions.push({
              value: row.unionId,
              label: `${row.unionTitle ? row.unionTitle : ""} (${
                row.title ? row.title : ""
              })`,
            });
          });
          newCounties[0].options = newOptions;
          setAllUnion(newCounties);
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ثبت ادمین اتحادیه</CardTitle>
      </CardHeader>
      <CardBody>
        <>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={UnionSetAdminValidate}
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
                          name="county"
                          placeHolder="انتخاب شهرستان ..."
                          data={currentUserCounty}
                          onChange={(opt, e) =>
                            onCountyChange(opt, e, setFieldValue)
                          }
                          lableText="انتخاب شهرستان"
                        />
                      </Col>
                      <Col sm="4">
                        <BasicSelectOption
                          isLoading={getUnion.isLoading}
                          significant={true}
                          name="union"
                          placeHolder="انتخاب اتحادیه ..."
                          data={allUnion}
                          lableText="انتخاب اتحادیه"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <SubmitButton
                          isLoading={setAdminMutation.isLoading}
                          schema={UnionSetAdminValidate}
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
