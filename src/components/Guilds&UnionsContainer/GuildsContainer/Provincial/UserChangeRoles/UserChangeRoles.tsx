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
  useGetUserRolsInProvinceByUserId,
  usePostCreateUserProvinceGuildRoom,
} from "../../../../../core/services/api/guilds.api";
import { useParams } from "react-router-dom";
import { UserRoleOfProvinceGulidRoom } from "../../../../../core/enums/user-role-of-province-gulid-room.enums";
import { fullOption } from "../../../../../core/utils/selected-option.utils";
import { CreateUserProvinceGuildRoom } from "../../../../../core/models/create-user-province-guild-room.models";
import { showToast } from "../../../../../core/utils/show-toast";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import {
  ProvinceGuildRoomExecutiveManagerClaims,
  ProvinceGuildRoomViceManagerClaimEnum,
  UserRolesPersian,
} from "../../../../../core/enums";
import { CheckBoxList, MultiSelectOption } from "../../../../common/Form";

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
  const getUserRolesMutation = useGetUserRolsInProvinceByUserId();
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
          value: UserRoleOfProvinceGulidRoom.ProvinceGuildRoomManager,
          label: "مدیر اتاق اصناف استان",
        },
        {
          value: UserRoleOfProvinceGulidRoom.ProvinceSecretariat,
          label: UserRolesPersian.ProvinceSecretariat,
        },
        {
          value: UserRoleOfProvinceGulidRoom.ProvinceTreasurer,
          label: UserRolesPersian.ProvinceTreasurer,
        },
        {
          value: UserRoleOfProvinceGulidRoom.ProvinceGuildRoomExecutiveManager,
          label: UserRolesPersian.ProvinceGuildRoomExecutiveManager,
        },
        {
          value: UserRoleOfProvinceGulidRoom.ProvinceGuildRoomViceManager,
          label: UserRolesPersian.ProvinceGuildRoomViceManager,
        },
      ],
    },
  ];

  const [AllServiceState, setAllServiceState] = React.useState([
    {
      label: " نقش را انتخاب کنید",
      options: [
        {
          value: UserRoleOfProvinceGulidRoom.ProvinceGuildRoomManager,
          label: "مدیر اتاق اصناف استان",
        },
        {
          value: UserRoleOfProvinceGulidRoom.ProvinceSecretariat,
          label: UserRolesPersian.ProvinceSecretariat,
        },
        {
          value: UserRoleOfProvinceGulidRoom.ProvinceTreasurer,
          label: UserRolesPersian.ProvinceTreasurer,
        },
        {
          value: UserRoleOfProvinceGulidRoom.ProvinceGuildRoomExecutiveManager,
          label: UserRolesPersian.ProvinceGuildRoomExecutiveManager,
        },
        {
          value: UserRoleOfProvinceGulidRoom.ProvinceGuildRoomViceManager,
          label: UserRolesPersian.ProvinceGuildRoomViceManager,
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
            ProvinceGuildRoomExecutiveManagerClaims.ProvinceGuildRoomExecutiveManagerPositionRequestInvestigation,
          id: 1,
          checked: false,
        },
        {
          label: "تایید و امضا نامه استعلامات درخواست شغل",
          value:
            ProvinceGuildRoomExecutiveManagerClaims.ProvinceGuildRoomExecutiveManagerPositionRequestSignInquiries,
          id: 2,
          checked: false,
        },
        {
          label: "تایید پس از پرداخت در درخواست شغل",
          value:
            ProvinceGuildRoomExecutiveManagerClaims.ProvinceGuildRoomExecutiveManagerPositionRequestConfirmPayment,
          id: 3,
          checked: false,
        },
        {
          label: "اعلام نظر در درخواست نظام صنفی شهرستانی",
          value:
            ProvinceGuildRoomExecutiveManagerClaims.ProvinceGuildRoomExecutiveManagerCountyGuilRoomRequestInvestigation,
          id: 4,
          checked: false,
        },
        {
          label: "اعلام نظر در درخواست اتحادیه",
          value:
            ProvinceGuildRoomExecutiveManagerClaims.ProvinceGuildRoomExecutiveManagerUnionGuilRoomRequestInvestigation,
          id: 5,
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
            ProvinceGuildRoomViceManagerClaimEnum.ProvinceGuildRoomViceManagerPositionRequestInvestigation,
          id: 1,
          checked: false,
        },
        {
          label: "تایید و امضا نامه استعلامات درخواست شغل",
          value:
            ProvinceGuildRoomViceManagerClaimEnum.ProvinceGuildRoomViceManagerPositionRequestSignInquiries,
          id: 2,
          checked: false,
        },
        {
          label: "تایید پس از پرداخت در درخواست شغل",
          value:
            ProvinceGuildRoomViceManagerClaimEnum.ProvinceGuildRoomViceManagerPositionRequestConfirmPayment,
          id: 3,
          checked: false,
        },
        {
          label: "اعلام نظر در درخواست نظام صنفی شهرستانی",
          value:
            ProvinceGuildRoomViceManagerClaimEnum.ProvinceGuildRoomViceManagerCountyGuilRoomRequestInvestigation,
          id: 4,
          checked: false,
        },
        {
          label: "اعلام نظر در درخواست اتحادیه",
          value:
            ProvinceGuildRoomViceManagerClaimEnum.ProvinceGuildRoomViceManagerUnionGuilRoomRequestInvestigation,
          id: 5,
          checked: false,
        },
        { label: "", value: 7, id: 9, checked: false, isAll: true },
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
        { userId: currentUser, provinceId: parseInt(id) },
        {
          onSuccess: (val: any) => {
            if (val.data && val.data.result) {
              let newSelectedRoles: any = [];

              val.data.result.allowedRoles.forEach((el: any) => {
                newSelectedRoles.push(fullOption(el, noChangeAllServiceState));

                if (
                  el ===
                  UserRoleOfProvinceGulidRoom.ProvinceGuildRoomExecutiveManager
                ) {
                  setCheckBoxData((prev: any) => {
                    let newData = [...prev];
                    newData[0].isActive = true;
                    return newData;
                  });
                }
                if (
                  el ===
                  UserRoleOfProvinceGulidRoom.ProvinceGuildRoomViceManager
                ) {
                  setCheckBoxData((prev: any) => {
                    let newData = [...prev];
                    newData[1].isActive = true;
                    return newData;
                  });
                }
              });

              if (val.data.result.provinceGuildRoomViceManagerClaims) {
                setCheckBoxData((prev: any) => {
                  let newData = [...prev];
                  val.data.result.provinceGuildRoomViceManagerClaims.forEach(
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

              if (val.data.result.provinceGuildRoomExecutiveManagerClaims) {
                setCheckBoxData((prev: any) => {
                  let newData = [...prev];
                  val.data.result.provinceGuildRoomExecutiveManagerClaims.forEach(
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
    usePostCreateUserProvinceGuildRoom();

  const onSubmit = (value: any) => {
    let ids: any = [];
    let executiveAccesses: any = [];
    let viceAccesses: any = [];

    value.roles.forEach((el: any) => {
      ids.push(el.value);
      if (
        el.value ===
        UserRoleOfProvinceGulidRoom.ProvinceGuildRoomExecutiveManager
      ) {
        checkBoxData[0].options.forEach((val: any) => {
          if (val.checked) {
            executiveAccesses.push(val.value);
          }
        });
      }
      if (
        el.value === UserRoleOfProvinceGulidRoom.ProvinceGuildRoomViceManager
      ) {
        checkBoxData[1].options.forEach((val: any) => {
          if (val.checked) {
            viceAccesses.push(val.value);
          }
        });
      }
    });

    value.roles.forEach((el: any) => {
      ids.push(el.value);
    });

    const obj: CreateUserProvinceGuildRoom = {
      userId: currentUser,
      allowedRoles: ids,
      provinceId: parseInt(id),
      provinceGuildRoomExecutiveManagerClaims: executiveAccesses,
      provinceGuildRoomViceManagerClaims: viceAccesses,
    };

    postCreateUserProvinceGuildRoomMutation.mutate(obj, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد!"], "success");
        const newEvent = { ...refetchEvent };
        newEvent.provinceGuildUser = !newEvent.provinceGuildUser;
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
                        name="roles"
                        placeHolder="انتخاب کنید..."
                        onChange={(e: any) => {
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
                                UserRoleOfProvinceGulidRoom.ProvinceGuildRoomExecutiveManager
                              ) {
                                setCheckBoxData((prev: any) => {
                                  let newData = [...prev];
                                  newData[0].isActive = true;
                                  return newData;
                                });
                              }
                              if (
                                row.value ===
                                UserRoleOfProvinceGulidRoom.ProvinceGuildRoomViceManager
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
                    </FormGroup>
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
