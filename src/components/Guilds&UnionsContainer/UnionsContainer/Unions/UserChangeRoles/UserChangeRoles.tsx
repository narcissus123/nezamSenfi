import { Form, Formik } from "formik";
import React, { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Col,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import * as Yup from "yup";
import {
  ToastTypes,
  UnionExecutiveManagerClaimEnum,
  UnionViceManagerClaimEnum,
  UserRoleOfUnion,
} from "../../../../../core/enums";
import { CreateUserUnion } from "../../../../../core/models";
import {
  useGetUnionJobByUnionUseTypeId,
  useGetUnionUseTypeByUnionId,
  useGetUserRolesInUnion,
  usePostSetUserUnion,
} from "../../../../../core/services/api";
import { fullOption, showToast } from "../../../../../core/utils";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import { CheckBoxList, MultiSelectOption } from "../../../../common/Form";
import { CheckBoxListTextInput } from "../../../../common/Form/CheckBoxListTextInput/CheckBoxListTextInput";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  currentUser: number;
  userNationalCode: any;
}

const UserChangeRoles: FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  currentUser,
  userNationalCode,
}) => {
  const validate = Yup.object().shape({
    roles: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.number(),
          label: Yup.string().nullable(),
        })
      )
      .typeError("لفطا یکی از گزینه ها را انتخاب کنید!")
      .required("لطفا یکی از گزینه ها را انتخاب کنید!")
  });

  const [allUseTypes, setAllUseTypes] = React.useState<any>(null);
  const getUseTypes = useGetUnionUseTypeByUnionId();
  const getJobs = useGetUnionJobByUnionUseTypeId();
  const getUserRolesMutation = useGetUserRolesInUnion();
  const { id } = useParams<{ id: string }>();
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const [initialValue, setInitialValue] = useState<any>({
    roles: null,
    //useTypes: null,
  });
  const [jobsAdded, setJobsAdded] = useState(false);

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
          value: UserRoleOfUnion.UnionIssuingResponsible,
          label: "مسئول صدور اتحادیه",
        },

        {
          value: UserRoleOfUnion.UnionIssuingManager,
          label: "مدیر صدور اتحادیه",
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

  const [servicesId, setServicesId] = useState([]);
  const [gainedJobs, setGainedJobs] = useState<any>(null);

  // useEffect(() => {
  //   return () => {
  //     setCheckBoxJob([]);
  //     setGainedJobs(null);
  //     setInitialValue({ roles: null });
  //   };
  // }, []);

  const setUserUnionMutation = usePostSetUserUnion();

  useEffect(() => {
    if (currentUser && isOpen) {
      getUserRolesMutation.mutate(
        { userId: currentUser, countyUnionId: parseInt(id) },
        {
          onSuccess: (val: any) => {
            if (val.data && val.data.result) {
              let newSelectedRoles: any = [];

              try {
                val.data.result.allowedRoles.forEach((el: any) => {
                  newSelectedRoles.push(
                    fullOption(el, noChangeAllServiceState)
                  );

                  if (el === UserRoleOfUnion.UnionExecutiveManager) {
                    setCheckBoxData((prev: any) => {
                      let newData = [...prev];
                      newData[0].isActive = true;
                      return newData;
                    });
                  }
                  if (el === UserRoleOfUnion.UnionViceManager) {
                    setCheckBoxData((prev: any) => {
                      let newData = [...prev];
                      newData[1].isActive = true;
                      return newData;
                    });
                  }
                });
                if (val.data.result.unionViceManagerClaims) {
                  setCheckBoxData((prev: any) => {
                    let newData = [...prev];
                    val.data.result.unionViceManagerClaims.forEach(
                      (el: any) => {
                        newData[1].options.forEach((row: any, key: any) => {
                          if (el === row.value) {
                            newData[1].options[key].checked = true;
                          }
                        });
                      }
                    );

                    return newData;
                  });
                }

                if (val.data.result.unionExecutiveManagerClaims) {
                  setCheckBoxData((prev: any) => {
                    let newData = [...prev];
                    val.data.result.unionExecutiveManagerClaims.forEach(
                      (el: any) => {
                        newData[0].options.forEach((row: any, key: any) => {
                          if (el === row.value) {
                            newData[0].options[key].checked = true;
                          }
                        });
                      }
                    );
                    return newData;
                  });
                }

                if (val.data.result.expertUnionUseTypeJobIds) {
                  getUseTypes.mutate(+id, {
                    onSuccess: (value) => {
                      const result = value.data.result.unionUseTypes;
                      const useTypes: any = [];

                      result.forEach((item: any) => {
                        useTypes.push({
                          value: item.useTypeId,
                        });
                      });

                      onShowAllJobs(useTypes);
                      setAllUseTypes(useTypes);

                      const gainedJobs =
                        val.data.result.expertUnionUseTypeJobIds;
                      console.log(gainedJobs);
                      setGainedJobs(gainedJobs);
                    },
                  });
                }

                setInitialValue({
                  roles: newSelectedRoles,
                });
                setServicesId(newSelectedRoles);
              } catch (error) {}
            }
          },
        }
      );
    }
  }, [currentUser, isOpen]);

  useEffect(() => {
    if (gainedJobs) {
      let newCheckJob: any = checkBoxJob;
      gainedJobs.forEach((job: any) => {
        newCheckJob.forEach((item: any, checkBoxIndex: number) => {
          const jobs = item.options;
          jobs.forEach((op: any, jobIndex: number) => {
            if (job.expertJobsId === op.value) {
              newCheckJob[checkBoxIndex].options[jobIndex] = {
                ...op,
                checked: true,
              };
            }
            setInitialValue((old: any) => {
              let newObj = { ...old };
              newObj[job.expertJobsId] = job.totalArea;
              return newObj;
            });
          });
        });
      });
      setCheckBoxJob(newCheckJob);
    }
  }, [gainedJobs, jobsAdded]);

  const handleOnchange = (e: any, setFieldValue: any) => {
    setFieldValue("roles", e);
    setServicesId(e);
  };

  const onRoleChange = (e: any, setFieldValue: any) => {
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
      e.forEach((row: any) => {
        if (row.value === UserRoleOfUnion.UnionExecutiveManager) {
          setCheckBoxData((prev: any) => {
            let newData = [...prev];
            newData[0].isActive = true;
            return newData;
          });
        }
        if (row.value === UserRoleOfUnion.UnionViceManager) {
          setCheckBoxData((prev: any) => {
            let newData = [...prev];
            newData[1].isActive = true;
            return newData;
          });
        }
        if (row.value === UserRoleOfUnion.UnionExpert && !allUseTypes) {
          getUseTypes.mutate(+id, {
            onSuccess: (val) => {
              const result = val.data.result.unionUseTypes;
              const useTypes: any = [];

              result.forEach((item: any) => {
                useTypes.push({
                  value: item.useTypeId,
                });
              });

              onShowAllJobs(useTypes);
              setAllUseTypes(useTypes);
            },
          });
        }
      });
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
      setJobsAdded((old: boolean) => !old);
    }
   
  };

  const onSubmit = (value: any) => {
    let ids: any = [];
    let executiveAccesses: any = [];
    let viceAccesses: any = [];
    let expertJobsClaim: any = [];
    let isExpertEmpty = false;

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
        if (!checkAdd) {
          isExpertEmpty = true;
          return showToast(["لطفا حداقل یک شغل انتخاب کنید"], ToastTypes.error);
        }
      }
    });

    if (isExpertEmpty) return;

    const obj: CreateUserUnion = {
      userId: currentUser,
      allowedRoles: ids,
      countyUnionId: parseInt(id),
      unionViceManagerClaims: viceAccesses,
      unionExecutiveManagerClaims: executiveAccesses,
      expertJobsClaim: expertJobsClaim,
    };

    setUserUnionMutation.mutate(obj, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد!"], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.unionUserList = !newEvent.unionUserList;
        setRefetchEvent(newEvent);
        toggleModal();
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      unmountOnClose={true}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggleModal}>تغییر نقش کاربر</ModalHeader>
      <ModalBody>
        <Formik
          initialValues={initialValue}
          validationSchema={validate}
          enableReinitialize={true}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            setFieldTouched,
            setFieldValue,
          }) => {
            return (
              <React.Fragment>
                <Form>
                  <ModalBody>
                    <Alert color="info">نام کاربری: {userNationalCode} </Alert>
                    <FormGroup style={{ marginBottom: "40px" }}>
                      <MultiSelectOption
                        labelText="نقش ها"
                        placeHolder="نقش های مورد نظر را انتخاب کنید"
                        name="roles"
                        options={AllServiceState}
                        isLoading={
                          getUserRolesMutation.isLoading ||
                          getJobs.isLoading ||
                          getUseTypes.isLoading
                        }
                        significant
                        hasLabel
                        isDisabled={getUserRolesMutation.isLoading}
                        onChange={(e) => onRoleChange(e, setFieldValue)}
                      />

                      <div style={{ marginTop: "15px" }}>
                        <CheckBoxList
                          data={checkBoxData}
                          setCheckBoxData={setCheckBoxData}
                        />
                      </div>
                    </FormGroup>

                    {values.roles &&
                      values.roles.some(
                        (row: any) => row.value === UserRoleOfUnion.UnionExpert
                      ) && (
                        <FormGroup>
                          <div style={{ marginTop: "15px" }}>
                            <Alert color="info">شغل ها</Alert>
                            {getJobs.isLoading ? (
                              <p style={{ textAlign: "center" }}>
                                در حال بازگذاری ...{" "}
                              </p>
                            ) : (
                              <CheckBoxListTextInput
                                data={checkBoxJob}
                                setCheckBoxData={setCheckBoxJob}
                              />
                            )}
                          </div>
                        </FormGroup>
                      )}
                  </ModalBody>
                  <ModalFooter>
                    <Col className="d-flex align-items-center justify-content-left">
                      <Button
                        className="d-flex align-items-center justify-content-center"
                        color="primary"
                        style={{ marginLeft: "10px" }}
                        type="submit"
                        onClick={(val: any) => handleSubmit(val)}
                      >
                        {setUserUnionMutation.isLoading && (
                          <Spinner color="white" size="sm" />
                        )}
                        <span className="ml-50">ذخیره</span>
                      </Button>
                      <Button
                        className="d-flex align-items-center justify-content-center"
                        color="danger"
                        outline
                        type="button"
                        onClick={() => toggleModal()}
                      >
                        {false && <Spinner color="white" size="sm" />}
                        <span className="ml-50">انصراف</span>
                      </Button>
                    </Col>
                  </ModalFooter>
                </Form>
              </React.Fragment>
            );
          }}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export { UserChangeRoles };
