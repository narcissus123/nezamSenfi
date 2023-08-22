import { Form, Formik } from "formik";
import * as React from "react";
import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Alert, Button, CardTitle, FormGroup } from "reactstrap";
import {
  ToastTypes,
  UnionExecutiveManagerClaimEnum,
  UnionViceManagerClaimEnum,
  UserRoleOfUnion,
} from "../../../../../../core/enums";
import { CreateUserUnion } from "../../../../../../core/models";
import {
  useGetUnionJobByUnionUseTypeId,
  useGetUnionUseTypeByUnionId,
  useGetUserByNationalCode,
  useGetUserRolesInUnion,
  usePostSetUserUnion,
} from "../../../../../../core/services/api";
import { removeFullOption, showToast } from "../../../../../../core/utils";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { AddUserToGuild } from "../../../../../../core/validations/add-user-to-guild.validation";
import {
  CheckBoxList,
  MultiSelectOption,
  SubmitButton,
} from "../../../../../common/Form";
import { CheckBoxListTextInput } from "../../../../../common/Form/CheckBoxListTextInput/CheckBoxListTextInput";
import { InputGroupSearch } from "../../../../../common/Form/InputComponents/InputGroupSearch/InputGroupSearch";
import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import TreeColumn from "../../../../../common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn";

const AddUnionUser = () => {
  const { id } = useParams<{ id: string }>();

  const noChangeAllServiceState = [
    {
      label: " نقش را انتخاب کنید",
      options: [
        {
          value: UserRoleOfUnion.UnionManager,
          label: "مدیر اتحادیه",
        },

        {
          value: UserRoleOfUnion.UnionExecutiveManager,
          label: "مدیر اجرایی اتحادیه",
        },

        {
          value: UserRoleOfUnion.UnionViceManager,
          label: "نایب رئیس اتحادیه",
        },
        {
          value: UserRoleOfUnion.UnionIssuingManager,
          label: "مدیر صدور اتحادیه",
        },
        {
          value: UserRoleOfUnion.UnionIssuingResponsible,
          label: "مسئول صدور اتحادیه",
        },
        {
          value: UserRoleOfUnion.UnionSecretariat,
          label: "دبیرخانه اتحادیه",
        },
        {
          value: UserRoleOfUnion.UnionExpert,
          label: "کارشناس اتحادیه",
        },
        {
          value: UserRoleOfUnion.UnionTreasurer,
          label: "خزانه دار اتحایه",
        },
      ],
    },
  ];

  const [AllServiceState, setAllServiceState] = React.useState([
    {
      label: " نقش را انتخاب کنید",
      options: [
        {
          value: UserRoleOfUnion.UnionManager,
          label: "مدیر اتحادیه",
        },

        {
          value: UserRoleOfUnion.UnionExecutiveManager,
          label: "مدیر اجرایی اتحادیه",
        },

        {
          value: UserRoleOfUnion.UnionViceManager,
          label: "نایب رئیس اتحادیه",
        },

        {
          value: UserRoleOfUnion.UnionIssuingManager,
          label: "مدیر صدور اتحادیه",
        },
        {
          value: UserRoleOfUnion.UnionIssuingResponsible,
          label: "مسئول صدور اتحادیه",
        },
        {
          value: UserRoleOfUnion.UnionSecretariat,
          label: "دبیرخانه اتحادیه",
        },
        {
          value: UserRoleOfUnion.UnionExpert,
          label: "کارشناس اتحادیه",
        },
        {
          value: UserRoleOfUnion.UnionTreasurer,
          label: "خزانه دار اتحایه",
        },
      ],
    },
  ]);

  const [allUseTypes, setAllUseTypes] = React.useState<any>(null);

  const [checkBoxJob, setCheckBoxJob] = useState<any>([]);

  const [checkBoxData, setCheckBoxData] = useState<any>([
    {
      groupId: 1,
      isActive: false,
      label: "دسترسی های مدیر اجرایی",
      options: [
        {
          label: "بررسی در خواست شغل",
          value:
            UnionExecutiveManagerClaimEnum.UnionExecutiveManagerPositionRequestInvestigation,
          id: 1,
          checked: false,
        },
        {
          label: "تایید و امضا نامه استعلامات درخواست شغل",
          value:
            UnionExecutiveManagerClaimEnum.UnionExecutiveManagerPositionRequestSignInquiries,
          id: 2,
          checked: false,
        },
        {
          label: "تایید پس از پرداخت در درخواست شغل",
          value:
            UnionExecutiveManagerClaimEnum.UnionExecutiveManagerPositionRequestConfirmPayment,
          id: 3,
          checked: false,
        },
        { label: "", value: 5, id: 8, checked: false, isAll: true },
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
            UnionViceManagerClaimEnum.UnionViceManagerPositionRequestInvestigation,
          id: 1,
          checked: false,
        },
        {
          label: "تایید و امضا نامه استعلامات درخواست شغل",
          value:
            UnionViceManagerClaimEnum.UnionViceManagerPositionRequestSignInquiries,
          id: 2,
          checked: false,
        },
        {
          label: "تایید پس از پرداخت در درخواست شغل",
          value:
            UnionViceManagerClaimEnum.UnionViceManagerPositionRequestConfirmPayment,
          id: 3,
          checked: false,
        },
        { label: "", value: 9, id: 5, checked: false, isAll: true },
      ],
    },
  ]);

  const [servicesId, setServicesId] = React.useState<any>(null);
  const [userInfo, setUserInfo] = React.useState<any>(null);

  const getUserByNationalIdMutation = useGetUserByNationalCode();
  const getUserRolesMutation = useGetUserRolesInUnion();
  const setUserUnionMutation = usePostSetUserUnion();
  const getUseTypes = useGetUnionUseTypeByUnionId();
  const getJobs = useGetUnionJobByUnionUseTypeId();
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const [initialValues, setInitialValues] = useState<any>({
    users: null,
    roles: null,
    userSearch: "",
    //useTypes: null,
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
    let executiveAccesses: any = [];
    let viceAccesses: any = [];
    let expertJobsClaim: any = [];

    value.roles.forEach((el: any) => {
      ids.push(el.value);
      if (el.value === UserRoleOfUnion.UnionExecutiveManager) {
        checkBoxData[0].options.forEach((val: any) => {
          if (val.checked) {
            executiveAccesses.push(val.value);
          }
        });
      }
      if (el.value === UserRoleOfUnion.UnionViceManager) {
        checkBoxData[1].options.forEach((val: any) => {
          if (val.checked) {
            viceAccesses.push(val.value);
          }
        });
      }
      if (el.value === UserRoleOfUnion.UnionExpert) {
        const checkAdd = checkBoxJob.some((jobs: any) =>
          jobs.options.some((row: any) => {
            if (row.id !== 0) {
              return row.checked;
            }
          })
        );
        checkAdd &&
          checkBoxJob.forEach((jobs: any) => {
            jobs.options.forEach((row: any) => {
              if (row.id !== 0 && row.checked)
                expertJobsClaim.push({
                  expertJobsId: row.value,
                  totalArea: value[row.value],
                });
            });
          });
        if (!checkAdd)
          return showToast(["لطفا حداقل یک شغل انتخاب کنید"], ToastTypes.error);
      }
    });

    const obj: CreateUserUnion = {
      userId: userInfo.id,
      allowedRoles: ids,
      countyUnionId: parseInt(id),
      unionViceManagerClaims: viceAccesses,
      unionExecutiveManagerClaims: executiveAccesses,
      expertJobsClaim: expertJobsClaim,
    };

    setUserUnionMutation.mutate(obj, {
      onSuccess: (val: any) => {
        setFieldValue("roles", null);
        setServicesId(null);
        setCheckBoxJob([]);
        const newEvent = { ...refetchEvent };
        newEvent.unionUserList = !newEvent.unionUserList;
        setRefetchEvent(newEvent);
        showToast(["با موفقیت انجام شد!"], "success");
      },
    });
  };

  const onRoleChange = async (e: any, setFieldValue: any) => {
    handleOnchange(e, setFieldValue);

    setCheckBoxData((prev: any) => {
      let newData = [...prev];
      newData[0].isActive = false;
      return newData;
    });
    setCheckBoxData((prev: any) => {
      let newData = [...prev];
      newData[1].isActive = false;
      return newData;
    });
    if (e) {
      for (let index = 0; index < e.length; index++) {
        try {
          if (e[index].value === UserRoleOfUnion.UnionExecutiveManager) {
            setCheckBoxData((prev: any) => {
              let newData = [...prev];
              newData[0].isActive = true;
              return newData;
            });
          }
          if (e[index].value === UserRoleOfUnion.UnionViceManager) {
            setCheckBoxData((prev: any) => {
              let newData = [...prev];
              newData[1].isActive = true;
              return newData;
            });
          }
          if (e[index].value === UserRoleOfUnion.UnionExpert && !allUseTypes) {
            let res = await getUseTypes.mutateAsync(+id);
            const result = res.data.result.unionUseTypes;
            const useTypes: any = [];

            result.forEach((item: any) => {
              useTypes.push({
                value: item.useTypeId,
              });
            });

            onShowAllJobs(useTypes);
            setAllUseTypes(useTypes);
          }
        } catch (err) {}
      }
     
      const expertCheck = e.some(
        (item: any) => item.value === UserRoleOfUnion.UnionExpert
      );
      if (!expertCheck) {
        setAllUseTypes(null);
        //setFieldValue("useTypes", null);
        setCheckBoxJob([]);
      }
    } else {
      setAllUseTypes(null);
      //setFieldValue("useTypes", null);
      setCheckBoxJob([]);
    }
  };

  const onShowAllJobs = async (useTypes: any) => {

    for (let index = 0; index < useTypes.length; index++) {
      let val: any = await getJobs.mutateAsync(useTypes[index].value);

      const result = val.data.result;
      //console.log(val.data.result);
      const jobDetail: any = {
        groupId: useTypes[index].value,
        isActive: true,
        label: result.useTypeTitle,
        options: [],
      };

      result.unionUseTypeJobs.forEach((item: any, index: number) => {
        jobDetail.options.push({
          label: item.useTypeJobTitle,
          value: item.useTypeJobId,
          id: index + 1,
          checked: false,
        });
      });
      jobDetail.options.push({
        label: "",
        value: 0,
        id: 0,
        checked: false,
        isAll: true,
      });

      setCheckBoxJob((old: any) => [...old, jobDetail]);
    }
   
  };

  const onSearchUser = (values: any) => {
    setUserInfo("");

    getUserByNationalIdMutation.mutate(values.userSearch, {
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
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
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
            <CardTitle>افزودن کاربر</CardTitle>
            <TreeColumn>
              <FormGroup>
                <FormGroup>
                  <InputGroupSearch
                    handleChange={handleChange}
                    lableText="نام کاربری"
                    name="userSearch"
                    value={values.userSearch}
                    placeholder="کد ملی کاربر را وارد کنید"
                    loading={getUserByNationalIdMutation.isLoading}
                    onSearch={() => onSearchUser(values)}
                    significant
                  />
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
                <MultiSelectOption
                  labelText="نقش ها"
                  significant
                  hasLabel
                  name="roles"
                  options={AllServiceState}
                  isLoading={getUserRolesMutation.isLoading}
                  placeHolder="نقش های مورد نظر را انتخاب کنید"
                  onChange={(e) => onRoleChange(e, setFieldValue)}
                />

                <div style={{ marginTop: "15px" }}>
                  <CheckBoxList
                    data={checkBoxData}
                    setCheckBoxData={setCheckBoxData}
                  />
                </div>
              </div>

              <div>
                {getJobs.isLoading || getUseTypes.isLoading ? (
                  <FallBackSpinner setHeight={200} />
                ) : (
                  <>
                    {values.roles &&
                      values.roles.some(
                        (role: any) =>
                          role.value === UserRoleOfUnion.UnionExpert
                      ) &&
                      checkBoxJob &&
                      checkBoxJob.length > 0 && (
                        <div style={{ marginTop: "23px" }}>
                          <Alert color="info" className="text-center">
                            شغل ها
                          </Alert>
                          {getJobs.isLoading || getUseTypes.isLoading ? (
                            <FallBackSpinner setHeight={200} />
                          ) : (
                            <>
                              <CheckBoxListTextInput
                                data={checkBoxJob}
                                setCheckBoxData={setCheckBoxJob}
                              />
                            </>
                          )}
                        </div>
                      )}
                  </>
                )}
              </div>
            </TreeColumn>

            <SubmitButton
              isLoading={setUserUnionMutation.isLoading}
              schema={AddUserToGuild}
              values={values}
              //initialValue={initialValues}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export { AddUnionUser };
