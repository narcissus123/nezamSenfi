import { Formik, Form } from "formik";
import * as React from "react";
import { useContext, useState } from "react";
import { Search } from "react-feather";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import {
  Alert,
  Button,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Spinner,
} from "reactstrap";
import { InpuLable, SubmitButton } from "../../../../../components/common/Form";
import { TwoColumn } from "../../../../../components/common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { UserRolesPersian } from "../../../../../core/enums";
import { UserRoleOfJahadCenter } from "../../../../../core/enums/user-role-of-jahad.enums";
import { useGetUserByNationalCode } from "../../../../../core/services/api";
import {
  useGetUserRolsInJahadCenter,
  useSetUserJahadCenter,
} from "../../../../../core/services/api/jahad-center.api";
import { showToast } from "../../../../../core/utils";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import { AddUserToJahadCenterValidate } from "../../../../../core/validations/add-user-to-jahad.validation";

const AddJahadUser = () => {
  const { id } = useParams<{ id: string }>();

  const noChangeAllServiceState = [
    {
      label: " نقش را انتخاب کنید",
      options: [
        {
          value: UserRoleOfJahadCenter.JahadCenterExpert,
          label: UserRolesPersian.JahadCenterExpert,
        },
        {
          value: UserRoleOfJahadCenter.JahadCenterManager,
          label: UserRolesPersian.JahadCenterManager,
        },
      ],
    },
  ];

  const [AllServiceState, setAllServiceState] = React.useState([
    {
      label: " نقش را انتخاب کنید",
      options: [
        {
          value: UserRoleOfJahadCenter.JahadCenterExpert,
          label: UserRolesPersian.JahadCenterExpert,
        },
        {
          value: UserRoleOfJahadCenter.JahadCenterManager,
          label: UserRolesPersian.JahadCenterManager,
        },
      ],
    },
  ]);

  const [servicesId, setServicesId] = React.useState<any>(null);
  const [userInfo, setUserInfo] = React.useState<any>(null);

  const getUserByNationalIdMutation = useGetUserByNationalCode();
  const getUserRolesMutation = useGetUserRolsInJahadCenter();
  const setMutation = useSetUserJahadCenter();
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const [initialValues, setInitialValues] = useState<any>({
    users: null,
    roles: null,
    userSearch: "",
  });

  const handleOnchange = (e: any, setFieldValue: any) => {
    setFieldValue("roles", e);
    setServicesId(e);
  };

  const onSubmit = (value: any, { resetForm, setFieldValue }: any) => {
    if (!userInfo) {
      return showToast(["ابتدا از وجود کاربر مطمئن شوید!"], "error");
    }

    let ids: any = [];

    value.roles.forEach((el: any) => {
      ids.push(el.value);
    });

    const obj: any = {
      userId: userInfo.id,
      allowedRoles: ids,
      jahadCenterId: parseInt(id),
    };

    setMutation.mutate(obj, {
      onSuccess: (val: any) => {
        setFieldValue("roles", null);
        setServicesId(null);
        const newEvent = { ...refetchEvent };
        newEvent.jahadCenterUsers = !newEvent.jahadCenterUsers;
        setRefetchEvent(newEvent);
        showToast(["با موفقیت انجام شد!"], "success");
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={AddUserToJahadCenterValidate}
      enableReinitialize
    >
      {({
        setFieldValue,
        errors,
        setFieldTouched,
        touched,
        values,
        handleChange,
      }) => {
        return (
          <Form>
            <TwoColumn>
              <FormGroup>
                <FormGroup>
                  <InpuLable lableText="نام کاربری" significant={true} />
                  <InputGroup>
                    <Input
                      value={values.userSearch}
                      placeholder="کد ملی کاربر را وارد کنید"
                      type="text"
                      name="userSearch"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                    <InputGroupAddon dir="ltr" addonType="append">
                      <Button
                        onClick={() => {
                          setUserInfo("");
                          setFieldValue("roles", null);
                          setServicesId(null);
                          getUserByNationalIdMutation.mutate(
                            values.userSearch,
                            {
                              onSuccess: (val: any) => {
                                if (val.data && val.data.result) {
                                  const user = val.data.result;
                                  const userObj = {
                                    id: user.id,
                                    fullName: `${user.name} ${user.lastName}`,
                                    email: user.email,
                                  };
                                  setUserInfo(userObj);
                                }
                              },
                            }
                          );
                        }}
                        color="primary"
                      >
                        {getUserByNationalIdMutation.isLoading ? (
                          <Spinner
                            style={{
                              padding: "0 !important",
                              margin: "0 !important",
                            }}
                            color="white"
                            size="sm"
                          />
                        ) : (
                          <Search size={15} />
                        )}
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>

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
                        <Button size="md" color="warning" onClick={() => {}}>
                          نمایش جزئیات کاربر &nbsp;
                        </Button>
                      </Link>
                    </p>
                  </Alert>
                )}
              </FormGroup>

              <div>
                <InpuLable lableText="نقش ها" significant={true} />
                <Select
                  placeholder="نقش های مورد نظر را انتخاب کنید"
                  isMulti
                  name="roles"
                  options={AllServiceState}
                  className="React"
                  value={servicesId}
                  classNamePrefix="select"
                  isLoading={getUserRolesMutation.isLoading}
                  onChange={(e: any) => {
                    handleOnchange(e, setFieldValue);
                  }}
                  onBlur={() => setFieldTouched("roles", true)}
                  //isDisabled={!isAllServiceByTypeIDSuccess}
                />
              </div>
            </TwoColumn>

            <SubmitButton
              isLoading={setMutation.isLoading}
              schema={AddUserToJahadCenterValidate}
              values={values}
              //initialValue={initialValues}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export { AddJahadUser };
