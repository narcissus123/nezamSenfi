import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Alert, Button, Card, CardBody, Col, FormGroup, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../core/enums";
import { GuildsActivation } from "../../../../../../core/enums/guilds-activation-status.enums";
import {
  useGetUserByNationalCode,
  useShowServeGuildRoomFileByAdmins,
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
import { StatusWrapper } from "../../../../../common/Wrapper/StatusWrapper/StatusWrapper";
import { MemberList } from "./List/MemberList";

interface IPropTypes {
  AllServiceState: any;
  noChangeAllServiceState: any;
  requestDetail: any;
  type: any;
  refetch: any;
}

const MembersInfo: FC<IPropTypes> = ({
  type,
  refetch,
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

  const handleOnchange = (e: any, setFieldValue: any) => {
    setFieldValue("roles", e);
    setServicesId(e);
  };

  const [fileServer, setFileServer] = useState<Blob[]>([]);
  const [fileServerName, setFileServerName] = useState<File[]>([]);
  const serveFile = useShowServeGuildRoomFileByAdmins();
  const serveUnionFile = useShowServeUnionFileByAdmins();

  useEffect(() => {
    const loadData = async () => {
      if (requestDetail &&  requestDetail.usersFiles ) {
        setFileServer([]);
        setFileServerName([]);
        const files = requestDetail.usersFiles;
        const filesObj: any = [];
        await files.forEach(async (file: any) => {
          filesObj.push({
            fileName: file,
            guildRoomRequestId: requestDetail.guildRoomRequestId,
            isUnion: isSameString(type, "union"),
          });
          let result: any = {};
          if (isSameString(type, "union")) {
            result = await serveUnionFile.mutateAsync({
              fileName: file,
              guildRoomRequestId: requestDetail.guildRoomRequestId,
            });
          } else
            result = await serveFile.mutateAsync({
              fileName: file,
              guildRoomRequestId: requestDetail.guildRoomRequestId,
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
            guildRoomRequestId: requestDetail.guildRoomRequestId,
            isUnion: isSameString(type, "union"),
          });
        });
      }
      setInitialValues((prev: any) => {
        return { ...prev, files: newFiles };
      });
    }
  }, [requestDetail]);

  const onSubmit = (value: any) => {
    
  };

  const onFinalSubmit = (value: any) => {
   
  };

  return (
    <Card>
      {refetch.isLoading ? (
        <FallBackSpinner />
      ) : (
        <>
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
                    disabled={true}
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
              </Form>
            )}
          </Formik>
        </>
      )}
    </Card>
  );
};

export { MembersInfo };
