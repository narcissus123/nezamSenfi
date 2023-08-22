import { Form, Formik } from "formik";
import React, { FC, useContext, useEffect, useState } from "react";
import Select from "react-select";
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
import { CheckBoxList, InpuLable, MultiSelectOption } from "../../../../common/Form";
import * as Yup from "yup";
import {
  useGetUserRolsInCountyByUserId,
  usePostCreateUserCountyGuildRoom,
} from "../../../../../core/services/api";
import { useParams } from "react-router-dom";
import { fullOption } from "../../../../../core/utils";
import { showToast } from "../../../../../core/utils";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import {
  CountyGuildRoomExecutiveManagerClaimEnum,
  CountyGuildRoomViceManagerClaimEnum,
  UserRoleOfCountyGuildRoom,
  UserRolesPersian,
} from "../../../../../core/enums";
import { CreateUserCountyGuildRoom } from "../../../../../core/models";

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
  const getUserRolesMutation = useGetUserRolsInCountyByUserId();
  const { id } = useParams<{ id: string }>();

  const [servicesId, setServicesId] = React.useState<any>(null);
  const [initialValue, setInitialValue] = useState<any>({
    roles: null,
  });

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

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

  const noChangeAllServiceState = [
    {
      label: " نقش را انتخاب کنید",
      options: [
        {
          value: UserRoleOfCountyGuildRoom.CountyGuildRoomManager,
          label: UserRolesPersian.CountyGuildRoomManager,
        },
        {
          value: UserRoleOfCountyGuildRoom.CountySecretariat,
          label: UserRolesPersian.CountySecretariat,
        },
        {
          value: UserRoleOfCountyGuildRoom.CountyTreasurer,
          label: UserRolesPersian.CountyTreasurer,
        },
        {
          value: UserRoleOfCountyGuildRoom.CountyGuildRoomExecutiveManager,
          label: UserRolesPersian.CountyGuildRoomExecutiveManager,
        },
        {
          value: UserRoleOfCountyGuildRoom.CountyGuildRoomViceManager,
          label: UserRolesPersian.CountyGuildRoomViceManager,
        },
      ],
    },
  ];

  const [AllServiceState, setAllServiceState] = React.useState([
    {
      label: " نقش را انتخاب کنید",
      options: [
        {
          value: UserRoleOfCountyGuildRoom.CountyGuildRoomManager,
          label: UserRolesPersian.CountyGuildRoomManager,
        },
        {
          value: UserRoleOfCountyGuildRoom.CountySecretariat,
          label: UserRolesPersian.CountySecretariat,
        },
        {
          value: UserRoleOfCountyGuildRoom.CountyTreasurer,
          label: UserRolesPersian.CountyTreasurer,
        },
        {
          value: UserRoleOfCountyGuildRoom.CountyGuildRoomExecutiveManager,
          label: UserRolesPersian.CountyGuildRoomExecutiveManager,
        },
        {
          value: UserRoleOfCountyGuildRoom.CountyGuildRoomViceManager,
          label: UserRolesPersian.CountyGuildRoomViceManager,
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
            CountyGuildRoomExecutiveManagerClaimEnum.CountyGuildRoomExecutiveManagerPositionRequestInvestigation,
          id: 1,
          checked: false,
        },
        {
          label: "تایید و امضا نامه استعلامات درخواست شغل",
          value:
            CountyGuildRoomExecutiveManagerClaimEnum.CountyGuildRoomExecutiveManagerPositionRequestSignInquiries,
          id: 2,
          checked: false,
        },
        {
          label: "تایید پس از پرداخت در درخواست شغل",
          value:
            CountyGuildRoomExecutiveManagerClaimEnum.CountyGuildRoomExecutiveManagerPositionRequestConfirmPayment,
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
            CountyGuildRoomViceManagerClaimEnum.CountyGuildRoomViceManagerPositionRequestInvestigation,
          id: 1,
          checked: false,
        },
        {
          label: "تایید و امضا نامه استعلامات درخواست شغل",
          value:
            CountyGuildRoomViceManagerClaimEnum.CountyGuildRoomViceManagerPositionRequestSignInquiries,
          id: 2,
          checked: false,
        },
        {
          label: "تایید پس از پرداخت در درخواست شغل",
          value:
            CountyGuildRoomViceManagerClaimEnum.CountyGuildRoomViceManagerPositionRequestConfirmPayment,
          id: 3,
          checked: false,
        },
        { label: "", value: 9, id: 5, checked: false, isAll: true },
      ],
    },
  ]);

  const handleOnchange = (e: any, setFieldValue: any) => {
    setFieldValue("roles", e);
    setServicesId(e);
  };

  useEffect(() => {
    if (currentUser && isOpen) {
      getUserRolesMutation.mutate(
        { userId: currentUser, countyId: parseInt(id) },
        {
          onSuccess: (val: any) => {
            if (val.data && val.data.result) {
              let newSelectedRoles: any = [];

              val.data.result.allowedRoles.forEach((el: any) => {
                newSelectedRoles.push(fullOption(el, noChangeAllServiceState));

                if (
                  el ===
                  UserRoleOfCountyGuildRoom.CountyGuildRoomExecutiveManager
                ) {
                  setCheckBoxData((prev: any) => {
                    let newData = [...prev];
                    newData[0].isActive = true;
                    return newData;
                  });
                }
                if (
                  el === UserRoleOfCountyGuildRoom.CountyGuildRoomViceManager
                ) {
                  setCheckBoxData((prev: any) => {
                    let newData = [...prev];
                    newData[1].isActive = true;
                    return newData;
                  });
                }
              });

              if (val.data.result.countyGuildRoomViceManagerClaims) {
                setCheckBoxData((prev: any) => {
                  let newData = [...prev];
                  val.data.result.countyGuildRoomViceManagerClaims.forEach(
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

              if (val.data.result.countyGuildRoomExecutiveManagerClaims) {
                setCheckBoxData((prev: any) => {
                  let newData = [...prev];
                  val.data.result.countyGuildRoomExecutiveManagerClaims.forEach(
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

              setInitialValue({
                roles: newSelectedRoles,
              });
              setServicesId(newSelectedRoles);
            }
          },
        }
      );
    }
  }, [currentUser, isOpen]);

  const postCreateUserCountyGuildRoomMutation =
    usePostCreateUserCountyGuildRoom();

  const onSubmit = (value: any) => {
    let ids: any = [];
    let executiveAccesses: any = [];
    let viceAccesses: any = [];

    value.roles.forEach((el: any) => {
      ids.push(el.value);
      if (
        el.value === UserRoleOfCountyGuildRoom.CountyGuildRoomExecutiveManager
      ) {
        checkBoxData[0].options.forEach((val: any) => {
          if (val.checked) {
            executiveAccesses.push(val.value);
          }
        });
      }
      if (el.value === UserRoleOfCountyGuildRoom.CountyGuildRoomViceManager) {
        checkBoxData[1].options.forEach((val: any) => {
          if (val.checked) {
            viceAccesses.push(val.value);
          }
        });
      }
    });

    const obj: CreateUserCountyGuildRoom = {
      userId: currentUser,
      allowedRoles: ids,
      countyId: parseInt(id),
      countyGuildRoomViceManagerClaims: viceAccesses,
      countyGuildRoomExecutiveManagerClaims: executiveAccesses,
    };

    postCreateUserCountyGuildRoomMutation.mutate(obj, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد!"], "success");
        const newEvent = { ...refetchEvent };
        newEvent.countyGuildUser = !newEvent.countyGuildUser;
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
          enableReinitialize
          initialValues={initialValue}
          validationSchema={validate}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, setFieldTouched, setFieldValue }) => {
            return (
              <React.Fragment>
                <Form>
                  <ModalBody>
                    <Alert color="info">نام کاربری: {userNationalCode} </Alert>
                    <MultiSelectOption
                      labelText="نقش ها"
                      name="roles"
                      placeHolder="انتخاب کنید..."
                      significant={true}
                      options={AllServiceState}
                      onChange={(e) => {
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
                            if (
                              row.value ===
                              UserRoleOfCountyGuildRoom.CountyGuildRoomExecutiveManager
                            ) {
                              setCheckBoxData((prev: any) => {
                                let newData = [...prev];
                                newData[0].isActive = true;
                                return newData;
                              });
                            }
                            if (
                              row.value ===
                              UserRoleOfCountyGuildRoom.CountyGuildRoomViceManager
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
                      hasLabel={true}
                    />
                    <div style={{ marginTop: "15px" }}>
                      <CheckBoxList
                        data={checkBoxData}
                        setCheckBoxData={setCheckBoxData}
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Col className="d-flex align-items-center justify-content-left">
                      <Button
                        className="d-flex align-items-center justify-content-center"
                        color="primary"
                        style={{ marginLeft: "10px" }}
                        onClick={(val: any) => handleSubmit(val)}
                      >
                        {postCreateUserCountyGuildRoomMutation.isLoading && (
                          <Spinner color="white" size="sm" />
                        )}
                        <span className="ml-50">ذخیره</span>
                      </Button>
                      <Button
                        className="d-flex align-items-center justify-content-center"
                        color="danger"
                        outline
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
