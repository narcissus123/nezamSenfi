import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Alert, Button, Card, CardBody, Col, FormGroup, Row } from "reactstrap";
import { ToastTypes, UserRoles } from "../../../../../../core/enums";
import { GuildsActivation } from "../../../../../../core/enums/guilds-activation-status.enums";
import {
  useGetUserByNationalCode,
  useShowServeGuildRoomFileByAdmins,
  useShowServeMainLocationGuildRoomFileByAdmins,
  useShowServeUnionFileByAdmins,
} from "../../../../../../core/services/api";
import { showToast } from "../../../../../../core/utils";
import { GoToTruePage } from "../../../../../../core/utils/context/StatusProvider";
import { isSameString } from "../../../../../../core/utils/same-string.utils";
import { MemebersInfoValidate } from "../../../../../../core/validations/members-info.validations";
import {
  FileInput,
  FormDivider,
  MultiSelectOption,
  SubmitButton,
} from "../../../../../common/Form";
import { InputGroupSearch } from "../../../../../common/Form/InputComponents/InputGroupSearch/InputGroupSearch";
import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { Can } from "../../../../../common/Wrapper/Can/Can";
import { StatusWrapper } from "../../../../../common/Wrapper/StatusWrapper/StatusWrapper";
import { MemberList } from "./List/MemberList";

interface IPropTypes {
  membersMutation: any;
  rolesMutation: any;
  AllServiceState: any;
  noChangeAllServiceState: any;
  requestDetail: any;
  type: any;
  refetch: any;
}

const MembersInfo: FC<IPropTypes> = ({
  type,
  refetch,
  membersMutation,
  rolesMutation,
  AllServiceState,
  noChangeAllServiceState,
  requestDetail,
}) => {
  const [userInfo, setUserInfo] = React.useState<any>(null);
  const [counter, setCounter] = React.useState<any>(1);
  const [servicesId, setServicesId] = React.useState<any>([]);
  const [tableData, setTableData] = React.useState<any>([]);
  const [initialValues, setInitialValues] = React.useState<any>({
    files: null,
  });
  const [initialVal, setInitialVal] = useState<any>({
    NationalId: "",
    roles: [],
  });

  const getUserByNationalIdMutation = useGetUserByNationalCode();

  const { req_id: id }: any = useParams();

  const setMembersMutation = membersMutation();

  const handleOnchange = (e: any, setFieldValue: any) => {
    setFieldValue("roles", e);
    setServicesId(e);
  };

  const [fileServer, setFileServer] = useState<Blob[]>([]);
  const [fileServerName, setFileServerName] = useState<File[]>([]);
  const serveMainLocationFile = useShowServeMainLocationGuildRoomFileByAdmins();

  useEffect(() => {
    const loadData = async () => {
      if (requestDetail && requestDetail.usersFiles) {
        setFileServer([]);
        setFileServerName([]);
        const files = requestDetail.usersFiles;
        const filesObj: any = [];
        await files.forEach(async (file: any) => {
          filesObj.push({
            fileName: file,
            guildRoomRequestId: requestDetail.id,
            isUnion: isSameString(type, "union"),
            isMainLocation: true,
          });
          let result: any = {};

          result = await serveMainLocationFile.mutateAsync({
            fileName: file,
            guildRoomRequestId: requestDetail.id,
          });

          try {
            const fileBlob = new Blob([result.data]);
            const fileUpload = new File(
              [fileBlob],
              "untitled." + file.split(".").pop()
            );
            setFileServer((old: Blob[]) => [...old, fileBlob]);
            setFileServerName((old: File[]) => [...old, fileUpload]);
          } catch (error) {}
        });
        setInitialValues((old: any) => ({
          ...old,
          files: filesObj,
        }));
      }
    };

    loadData();
  }, [requestDetail]);

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
  useEffect(() => {
    if (requestDetail && requestDetail.guildRoomsUsers) {
      setTableData([]);
      requestDetail.guildRoomsUsers.forEach((row: any) => {
        let newFormObject = {
          id: row.userId,
          name: `${row.userFirstName} ${row.userLastName}`,
          userNationalCode: row.userNationalCode,
          role: row.roles,
        };
        setTableData((prev: any) => {
          return [...prev, newFormObject];
        });
      });

      let newFiles: any = [];
      if (requestDetail.usersFiles) {
        requestDetail.usersFiles.forEach((row: any) => {
          newFiles.push({
            fileName: row,
            guildRoomRequestId: id,
            isUnion: isSameString(type, "union"),
          });
        });
      }
      setInitialValues((prev: any) => {
        return { ...prev, files: newFiles };
      });
    }
  }, [requestDetail]);

  const onSubmit = (value: any, { resetForm }: any) => {
    if (tableData.some((user: any) => user.id === value.NationalId)) {
      showToast(["کاربر انتخاب شده در لیست وجود دارد!"], ToastTypes.error);
    } else if (userInfo) {
      let selectedRoles: any = [];
      servicesId.forEach((row: any) => {
        selectedRoles.push(row.value);
      });

      let newFormObject = {
        id: userInfo.id,
        name: userInfo.fullName,
        userNationalCode: userInfo.nationalCode,
        role: selectedRoles,
      };

      setCounter((prev: number) => {
        return prev + 1;
      });
      setTableData((prev: any) => {
        return [...prev, newFormObject];
      });
      resetForm();
      setUserInfo(null);
      setServicesId([]);
    } else {
      getUserByNationalIdMutation.mutate(value.NationalId, {
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

            let selectedRoles: any = [];
            servicesId.forEach((row: any) => {
              selectedRoles.push(row.value);
            });

            let newFormObject = {
              id: userObj.id,
              name: userObj.fullName,
              userNationalCode: userObj.nationalCode,
              role: selectedRoles,
            };
            console.log("--1 ---", newFormObject);
            setCounter((prev: number) => {
              return prev + 1;
            });
            setTableData((prev: any) => {
              return [...prev, newFormObject];
            });
            resetForm();
            setUserInfo(null);
            setServicesId([]);
          }
        },
      });
    }
  };

  const onFinalSubmit = (value: any) => {
    if (!value.files || !(value.files.length > 0)) {
      return showToast(
        ["لطفا اسناد مورد نیاز را انتخاب کنید!"],
        ToastTypes.error
      );
    } else if (tableData.length === 0) {
      return showToast(["حداقل یک کاربر را وارد کنید!"], ToastTypes.error);
    } else {
      const formData = new FormData();

      if (value.files && !value.files[0].fileName) {
        value.files.forEach((file: File) => {
          formData.append(`Files`, file);
        });
      } else if (fileServerName.length > 0) {
        fileServerName.forEach((img: any) => {
          formData.append("Files", img);
        });
      }

      for (let i = 0; i < tableData.length; i++) {
        formData.append(`Users[${i}].UserId`, tableData[i].id);
        for (let j = 0; j < tableData[i].role.length; j++) {
          formData.append(`Users[${i}].Posts[${j}]`, tableData[i].role[j]);
        }
      }

      setMembersMutation.mutate(formData, {
        onSuccess: (val: any) => {
          showToast(["با موفقیت انجام شد"], ToastTypes.success);
          refetch.mutate();
        },
      });
    }
  };

  return (
    <Card>
      {refetch.isLoading ? (
        <FallBackSpinner />
      ) : (
        <>
          <Can roles={[UserRoles.Admin]}>
            <Formik
              initialValues={initialVal}
              onSubmit={onSubmit}
              validationSchema={MemebersInfoValidate}
              enableReinitialize
            >
              {({ values, handleChange, setFieldValue, setFieldTouched }) => (
                <Form>
                  <FormDivider textHeader="افزودن عضو">
                    <CardBody>
                      <Row>
                        <Col sm="6">
                          <FormGroup>
                            <InputGroupSearch
                              handleChange={handleChange}
                              name="NationalId"
                              placeholder="لطفا کد ملی کاربر را وارد کنید"
                              value={values.NationalId}
                              loading={getUserByNationalIdMutation.isLoading}
                              significant
                              lableText="کد ملی"
                              onSearch={() => onSearchUser(values.NationalId)}
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
                        <Col sm="6">
                          <MultiSelectOption
                            labelText="نقش"
                            name="roles"
                            placeHolder="انتخاب کنید..."
                            significant={true}
                            options={AllServiceState}
                            value={servicesId}
                            onChange={(e) => handleOnchange(e, setFieldValue)}
                            hasLabel={true}
                          />
                        </Col>
                      </Row>

                      <SubmitButton
                        isLoading={false}
                        btnText="افزودن"
                        isDisabled={values.NationalId ? false : true}
                        values={values}
                        schema={MemebersInfoValidate}
                      />
                    </CardBody>
                  </FormDivider>
                </Form>
              )}
            </Formik>
            <hr />
          </Can>
          <FormDivider textHeader="لیست اعضا">
            <CardBody>
              <MemberList
                tableData={tableData}
                setTableData={setTableData}
                AllServiceState={AllServiceState}
                noChangeAllServiceState={noChangeAllServiceState}
              />
            </CardBody>
          </FormDivider>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onFinalSubmit}
          >
            {({ values, handleChange, setFieldValue }) => (
              <Form>
                <Col sm="4">
                  <FileInput
                    outLine
                    removeServedFiles={() => {
                      setFileServer([]);
                    }}
                    files={values.files}
                    fileServer={fileServer}
                    isServerFile={true}
                    accept="image/jpeg, image/png, image/jpg, image/tif,image/tiff, application/pdf"
                    setFieldValue={(val: any) => setFieldValue("files", val)}
                  />
                </Col>
                <Can roles={[UserRoles.Admin]}>
                  <SubmitButton
                    isLoading={setMembersMutation.isLoading}
                    btnText="ثبت"
                    values={values}
                  />
                </Can>
              </Form>
            )}
          </Formik>
        </>
      )}
    </Card>
  );
};

export { MembersInfo };
