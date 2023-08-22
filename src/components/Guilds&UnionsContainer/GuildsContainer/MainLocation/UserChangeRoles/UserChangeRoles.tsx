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
import { InpuLable } from "../../../../common/Form/InputComponents/InputLable/InputLable";
import * as Yup from "yup";
import {
  useGetUserRolsInMainLocation,
  usePostSetUserInMainLocationGuildRoom,
} from "../../../../../core/services/api/guilds.api";
import { useParams } from "react-router-dom";
import { fullOption } from "../../../../../core/utils/selected-option.utils";
import { showToast } from "../../../../../core/utils/show-toast";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import {
  MainLocationGuildRoomExecutiveManagerClaimEnum,
  MainLocationGuildRoomViceManagerClaimEnum,
  UserRolesPersian,
} from "../../../../../core/enums";
import { UserRoleOfMainLocationGuildRoom } from "../../../../../core/enums/user-role-of-mainlocation-gulid-room.enums";
import { CheckBoxList, MultiSelectOption } from "../../../../common/Form";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  currentUser: number;
  userNationalCode: any;
  mainLocationId: any;
}

const UserChangeRoles: FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  currentUser,
  userNationalCode,
  mainLocationId,
}) => {
  const getUserRolesMutation = useGetUserRolsInMainLocation();
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

  const handleOnchange = (e: any, setFieldValue: any) => {
    setFieldValue("roles", e);
    setServicesId(e);
  };

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

  useEffect(() => {
    if (currentUser && isOpen) {
      getUserRolesMutation.mutate(
        { userId: currentUser, mainLocationId: mainLocationId },
        {
          onSuccess: (val: any) => {
            if (val.data && val.data.result) {
              let newSelectedRoles: any = [];

              val.data.result.allowedRoles.forEach((el: any) => {
                newSelectedRoles.push(fullOption(el, noChangeAllServiceState));

                if (
                  el ===
                  UserRoleOfMainLocationGuildRoom.MainLocationGuildRoomExecutiveManager
                ) {
                  setCheckBoxData((prev: any) => {
                    let newData = [...prev];
                    newData[0].isActive = true;
                    return newData;
                  });
                }
                if (
                  el ===
                  UserRoleOfMainLocationGuildRoom.MainLocationGuildRoomViceManager
                ) {
                  setCheckBoxData((prev: any) => {
                    let newData = [...prev];
                    newData[1].isActive = true;
                    return newData;
                  });
                }
              });

              if (val.data.result.mainLocationGuildRoomViceManagerClaims) {
                setCheckBoxData((prev: any) => {
                  let newData = [...prev];
                  val.data.result.mainLocationGuildRoomViceManagerClaims.forEach(
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

              if (val.data.result.mainLocationGuildRoomExecutiveManagerClaims) {
                setCheckBoxData((prev: any) => {
                  let newData = [...prev];
                  val.data.result.mainLocationGuildRoomExecutiveManagerClaims.forEach(
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

  const postCreateUserProvinceGuildRoomMutation =
    usePostSetUserInMainLocationGuildRoom();

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
          onSubmit={(value, { resetForm, setFieldValue }) => {
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
              userId: currentUser,
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
                newEvent.mainlocationGuildUser =
                  !newEvent.mainlocationGuildUser;
                setRefetchEvent(newEvent);
                showToast(["با موفقیت انجام شد!"], "success");
              },
            });
          }}
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
                  <>
                    <ModalBody>
                      <Alert color="info">
                        نام کاربری: {userNationalCode}{" "}
                      </Alert>
                      <MultiSelectOption
                        labelText="نقش ها"
                        name="roles"
                        placeHolder="انتخاب کنید..."
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
                        significant={true}
                        options={AllServiceState}
                        hasLabel={true}
                        isDisabled={getUserRolesMutation.isLoading}
                        isLoading={getUserRolesMutation.isLoading}
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
                          {postCreateUserProvinceGuildRoomMutation.isLoading && (
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
                  </>
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
