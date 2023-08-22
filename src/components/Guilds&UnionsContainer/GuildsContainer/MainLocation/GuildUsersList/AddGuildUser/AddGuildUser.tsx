import { Formik, Form } from "formik";
import * as React from "react";
import { useContext, useState } from "react";
import { Search } from "react-feather";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import {
  Alert,
  Button,
  CardTitle,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Spinner,
} from "reactstrap";
import {
  MainLocationGuildRoomExecutiveManagerClaimEnum,
  MainLocationGuildRoomViceManagerClaimEnum,
  UserRolesPersian,
} from "../../../../../../core/enums";
import { UserRoleOfMainLocationGuildRoom } from "../../../../../../core/enums/user-role-of-mainlocation-gulid-room.enums";
import { useGetUserByNationalCode } from "../../../../../../core/services/api/account.api";
import {
  useGetUserRolsInMainLocation,
  usePostSetUserInMainLocationGuildRoom,
} from "../../../../../../core/services/api/guilds.api";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { removeFullOption } from "../../../../../../core/utils/select-option-remover.utils";
import { showToast } from "../../../../../../core/utils/show-toast";
import { AddUserToGuild } from "../../../../../../core/validations/add-user-to-guild.validation";
import { CheckBoxList } from "../../../../../common/Form";
import { InpuLable } from "../../../../../common/Form/InputComponents/InputLable/InputLable";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { TwoColumn } from "../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";

interface IPropTypes {
  mainLocationId: any;
}

const AddGuildUser: React.FC<IPropTypes> = ({ mainLocationId }) => {
  const { id } = useParams<{ id: string }>();

  const noChangeAllServiceState = [
    {
      label: " نقش را انتخاب کنید",
      options: [
        {
          value: UserRoleOfMainLocationGuildRoom.MainLocationGuildRoomManager,
          label: UserRolesPersian.MainLocationGuildRoomManager,
        },
        {
          value:
            UserRoleOfMainLocationGuildRoom.MainLocationGuildRoomExecutiveManager,
          label: UserRolesPersian.MainLocationGUildRoomExecutiveManager,
        },
        {
          value:
            UserRoleOfMainLocationGuildRoom.MainLocationGuildRoomViceManager,
          label: UserRolesPersian.MainLocationGuildRoomViceManager,
        },
        {
          value: UserRoleOfMainLocationGuildRoom.MainLocationSecretariat,
          label: UserRolesPersian.MainLocationSecretariat,
        },
        {
          value: UserRoleOfMainLocationGuildRoom.MainLocationTreasurer,
          label: UserRolesPersian.MainLocationTreasurer,
        },
      ],
    },
  ];

  const [AllServiceState, setAllServiceState] = React.useState([
    {
      label: " نقش را انتخاب کنید",
      options: [
        {
          value: UserRoleOfMainLocationGuildRoom.MainLocationGuildRoomManager,
          label: UserRolesPersian.MainLocationGuildRoomManager,
        },
        {
          value:
            UserRoleOfMainLocationGuildRoom.MainLocationGuildRoomExecutiveManager,
          label: UserRolesPersian.MainLocationGUildRoomExecutiveManager,
        },
        {
          value:
            UserRoleOfMainLocationGuildRoom.MainLocationGuildRoomViceManager,
          label: UserRolesPersian.MainLocationGuildRoomViceManager,
        },
        {
          value: UserRoleOfMainLocationGuildRoom.MainLocationSecretariat,
          label: UserRolesPersian.MainLocationSecretariat,
        },
        {
          value: UserRoleOfMainLocationGuildRoom.MainLocationTreasurer,
          label: UserRolesPersian.MainLocationTreasurer,
        },
      ],
    },
  ]);

  const [checkBoxData, setCheckBoxData] = useState<any>([
    {
      groupId: 1,
      isActive: false,
      label: "دسترسی های مدیر اجرایی",
      options: [
        {
          label: "بررسی در خواست شغل",
          value:
            MainLocationGuildRoomExecutiveManagerClaimEnum.MainLocationGuildRoomExecutiveManagerPositionRequestInvestigation,
          id: 1,
          checked: false,
        },
        {
          label: "تایید و امضا نامه استعلامات درخواست شغل",
          value:
            MainLocationGuildRoomExecutiveManagerClaimEnum.MainLocationGuildRoomExecutiveManagerPositionRequestSignInquiries,
          id: 2,
          checked: false,
        },
        {
          label: "تایید پس از پرداخت در درخواست شغل",
          value:
            MainLocationGuildRoomExecutiveManagerClaimEnum.MainLocationGuildRoomExecutiveManagerPositionRequestConfirmPayment,
          id: 3,
          checked: false,
        },
        {
          label: "اعلام نظر در درخواست نظام صنفی استانی",
          value:
            MainLocationGuildRoomExecutiveManagerClaimEnum.MainLocationGuildRoomExecutiveManagerProvinceGuilRoomRequestInvestigation,
          id: 4,
          checked: false,
        },
        { label: "", value: 6, id: 8, checked: false, isAll: true },
      ],
    },
    {
      groupId: 2,
      isActive: false,
      label: "دسترسی های نایب رئیس",
      options: [
        {
          label: "بررسی در خواست شغل",
          value:
            MainLocationGuildRoomViceManagerClaimEnum.MainLocationGuildRoomViceManagerPositionRequestInvestigation,
          id: 1,
          checked: false,
        },
        {
          label: "تایید و امضا نامه استعلامات درخواست شغل",
          value:
            MainLocationGuildRoomViceManagerClaimEnum.MainLocationGuildRoomViceManagerPositionRequestSignInquiries,
          id: 2,
          checked: false,
        },
        {
          label: "تایید پس از پرداخت در درخواست شغل",
          value:
            MainLocationGuildRoomViceManagerClaimEnum.MainLocationGuildRoomViceManagerPositionRequestConfirmPayment,
          id: 3,
          checked: false,
        },
        {
          label: "اعلام نظر در درخواست نظام صنفی شهرستانی",
          value:
            MainLocationGuildRoomViceManagerClaimEnum.MainLocationGuildRoomViceManagerProvinceGuilRoomRequestInvestigation,
          id: 4,
          checked: false,
        },
        { label: "", value: 7, id: 9, checked: false, isAll: true },
      ],
    },
  ]);

  const [servicesId, setServicesId] = React.useState<any>(null);
  const [userInfo, setUserInfo] = React.useState<any>(null);

  const getUserByNationalIdMutation = useGetUserByNationalCode();
  const getUserRolesMutation = useGetUserRolsInMainLocation();
  const postCreateUserProvinceGuildRoomMutation =
    usePostSetUserInMainLocationGuildRoom();
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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(value, { resetForm, setFieldValue }) => {
        if (!userInfo) {
          return showToast(["ابتدا از وجود کاربر مطمئن شوید!"], "error");
        }

        let ids: any = [];
        let executiveAccesses: any = [];
        let viceAccesses: any = [];

        value.roles.forEach((el: any) => {
          ids.push(el.value);
          if (
            el.value ===
            UserRoleOfMainLocationGuildRoom.MainLocationGuildRoomExecutiveManager
          ) {
            checkBoxData[0].options.forEach((val: any) => {
              if (val.checked) {
                executiveAccesses.push(val.value);
              }
            });
          }
          if (
            el.value ===
            UserRoleOfMainLocationGuildRoom.MainLocationGuildRoomViceManager
          ) {
            checkBoxData[1].options.forEach((val: any) => {
              if (val.checked) {
                viceAccesses.push(val.value);
              }
            });
          }
        });

        const obj: any = {
          userId: userInfo.id,
          allowedRoles: ids,
          mainLocationId: mainLocationId,
          mainLocationGuildRoomExecutiveManagerClaims: executiveAccesses,
          mainLocationGuildRoomViceManagerClaims: viceAccesses,
        };

        postCreateUserProvinceGuildRoomMutation.mutate(obj, {
          onSuccess: (val: any) => {
            setFieldValue("roles", null);
            setServicesId(null);
            const newEvent = { ...refetchEvent };
            newEvent.mainlocationGuildUser = !newEvent.mainlocationGuildUser;
            setRefetchEvent(newEvent);
            showToast(["با موفقیت انجام شد!"], "success");
          },
        });
      }}
      validationSchema={AddUserToGuild}
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
            <>
              <CardTitle>افزودن کاربر</CardTitle>
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

                      setCheckBoxData((prev: any) => {
                        let newData = [...prev];
                        newData[0].isActive = false;
                        newData[1].isActive = false;
                        return newData;
                      });

                      if (e) {
                        e.forEach((row: any) => {
                          if (
                            row.value ===
                            UserRoleOfMainLocationGuildRoom.MainLocationGuildRoomExecutiveManager
                          ) {
                            setCheckBoxData((prev: any) => {
                              let newData = [...prev];
                              newData[0].isActive = true;
                              return newData;
                            });
                          }
                          if (
                            row.value ===
                            UserRoleOfMainLocationGuildRoom.MainLocationGuildRoomViceManager
                          ) {
                            setCheckBoxData((prev: any) => {
                              let newData = [...prev];
                              newData[1].isActive = true;
                              return newData;
                            });
                          }
                        });
                      }
                    }}
                    onBlur={() => setFieldTouched("roles", true)}
                    //isDisabled={!isAllServiceByTypeIDSuccess}
                  />
                  <div style={{ marginTop: "15px" }}>
                    <CheckBoxList
                      data={checkBoxData}
                      setCheckBoxData={setCheckBoxData}
                    />
                  </div>
                </div>
              </TwoColumn>

              <SubmitButton
                isLoading={postCreateUserProvinceGuildRoomMutation.isLoading}
                schema={AddUserToGuild}
                values={values}
                //initialValue={initialValues}
              />
            </>
          </Form>
        );
      }}
    </Formik>
  );
};

export { AddGuildUser };
