import { Form, Formik } from "formik";
import * as React from "react";
import { X } from "react-feather";
import { useQueryClient } from "react-query";
import {
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { ToastTypes } from "../../../../../core/enums";
import { useEditUserMachineFilesById } from "../../../../../core/services/api";
import { getAccessToken } from "../../../../../core/services/authentication/authentication.service";
import { showToast } from "../../../../../core/utils";
import { SubmitButton } from "../../../../common/Form";
import { SweetAlertCallback } from "../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";
import { FileInput } from "../../FileInput";
import Styled from "./MachineryModal.module.scss";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  currentId: number;
  data?: any;
  setSelectedUser: any;
}

const MachineryModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  data,
  currentId,
}) => {
  const [deleteFileName, setDeleteFileName] = React.useState<any>();
  const queryClient = useQueryClient();
  const [myFiles, setmyFiles] = React.useState<any>([]);
  const [showConfirmation, setShowConfirmation] = React.useState<any>(false);
  const [loading, setLoading] = React.useState(false);
  const update = useEditUserMachineFilesById();

  React.useEffect(() => {
    if (currentId) {
      try {
        let selectedGuild = data.find((guild: any) => guild.id === currentId);
        setmyFiles([]);
        serve(selectedGuild.files);
      } catch (error) {}
    }
  }, [currentId, isOpen]);

  const onSubmit = (value: any) => {
    const formData = new FormData();
    const newData = [...value];

    console.log("newData", newData);

    myFiles.forEach((item: any) => {
      console.log(item);

      newData.push({
        file: item.image ? [item.image] : item.file,
        userMachineFileTypeEnum: {
          value: item.imageName.userMachineFileTypeEnum,
          label: item.imageName.userMachineFileTypeEnumTilte,
        },
      });
    });

    if (newData) {
      for (let i = 0; i < newData.length; i++) {
        formData.append(`Files[${i}].File`, newData[i].file[0]);
        formData.append(
          `Files[${i}].UserMachineFileTypeEnum`,
          newData[i].userMachineFileTypeEnum.value
        );
      }
    }

    formData.append("UserMachineId", currentId.toString());
    update.mutate(formData, {
      onSuccess: () => {
        queryClient.resetQueries("[AllUserMachine]");
        toggleModal();
      },
    });
  };

  const serve = async (files: any) => {
    const MainUrl = process.env.REACT_APP_PUBLIC_PATH;
    const token = getAccessToken();
    setLoading(true);
    const result: any = [];
    try {
      await files.forEach(async (item: any) => {
        // console.log(item);

        // const file = await serveFile.mutateAsync(item);

        // console.log(file);

        try {
          fetch(MainUrl + "/api/Upload/ServeFile?fileName=" + item.fileName, {
            headers: {
              Authorization: token ? "Bearer " + token : "",
            },
          })
            .then((r) => r.arrayBuffer())
            .then((buffer) => {
              // note this is already an ArrayBuffer
              // there is no buffer.data here
              console.log("buffer", buffer);

              const blob = new Blob([buffer]);
              const exportFile: File = new File(
                [blob],
                "untitled." + item.fileName.split(".").pop()
              );
              const url = URL.createObjectURL(blob);
              //result.push({image:blob,imageUrl:url,imageName:item})
              setmyFiles((prev: any) => {
                return [
                  ...prev,
                  { image: exportFile, imageUrl: url, imageName: item },
                ];
              });
            });
        } catch (error) {}
      });
    } catch (error) {}

    setLoading(false);

    setmyFiles(result);
  };

  const handledelete = (imageName: any) => {
    const newarray = myFiles.filter(
      (item: any) => item.imageName.fileName !== imageName
    );

    const formData = new FormData();

    if (newarray.length > 0) {
      for (let i = 0; i < newarray.length; i++) {
        formData.append(`Files[${i}].File`, newarray[i].image);
        formData.append(
          `Files[${i}].UserMachineFileTypeEnum`,
          newarray[i].imageName.userMachineFileTypeEnum
        );
      }
    } else {
      formData.append(`Files`, null as any);
    }
    formData.append("UserMachineId", currentId.toString());
    update.mutate(formData, {
      onSuccess: () => {
        setmyFiles(newarray);
        queryClient.resetQueries("[AllUserMachine]");
      },
    });
  };

  const deleteClickHandler = (name: any) => {
    setDeleteFileName(name);
    setShowConfirmation(true);
  };

  return (
    <>
      <SweetAlertCallback
        mutation={update}
        title="آیا مطمئنید؟"
        onCancel={() => {
          setShowConfirmation(false);
        }}
        onClose={() => {
          setShowConfirmation(false);
        }}
        onConfirm={() => {
          setShowConfirmation(false);
          handledelete(deleteFileName);
        }}
        show={showConfirmation}
      >
        آیا از پاک کردن این داده مطمئنید؟
      </SweetAlertCallback>
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className={`${Styled["modal-width"]} modal-dialog-centered`}
        backdrop={backdrop}
      >
        <ModalHeader toggle={toggleModal}>ویرایش اسناد</ModalHeader>
        <ModalBody>
          <Formik
            enableReinitialize={true}
            initialValues={{ file: null }}
            //validationSchema={addInsuranceValidate}
            onSubmit={(value: any) => onSubmit(value)}
          >
            {({ values, setFieldValue, submitForm }) => {
              return (
                <Form>
                  <FileInput
                    files={values.file}
                    outLine
                    // onSubmit={onSubmit}
                    inputText="بارگذاری اصل اسناد"
                    setFieldValue={(val: any) => {
                      setFieldValue("file", val);
                    }}
                  />

                  <SubmitButton
                    isLoading={false}
                    btnText="ثبت نهایی"
                    onClick={() => {
                      if (values.file) {
                        onSubmit(values.file);
                      } else
                        showToast(
                          ["سندی بارگذاری نکرده اید"],
                          ToastTypes.error
                        );
                    }}
                  />
                  <hr />
                  <ListGroup tag="div" className="mt-1">
                    <ListGroupItem tag="a" active>
                      اسناد
                    </ListGroupItem>
                    {loading ? (
                      <div> loading </div>
                    ) : myFiles.length > 0 ? (
                      myFiles.map((item: any) => {
                        return (
                          <ListGroupItem
                            tag="a"
                            className="d-flex justify-content-between"
                          >
                            <img
                              src={item.imageUrl}
                              style={{
                                width: "70px",
                                height: "70px",
                                borderRadius: "7px",
                              }}
                            />
                            <span className="d-flex justify-content-center align-items-center">
                              {item.imageName.fileName} (
                              {item.imageName.userMachineFileTypeEnumTilte})
                            </span>
                            <span className="d-flex justify-content-center align-items-center">
                              <X
                                color="red"
                                onClick={() =>
                                  deleteClickHandler(item.imageName.fileName)
                                }
                              />
                            </span>
                          </ListGroupItem>
                        );
                      })
                    ) : (
                      <p className="w-100 text-center mt-1">
                        سندی ثبت نشده است!
                      </p>
                    )}
                  </ListGroup>
                </Form>
              );
            }}
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
};

export { MachineryModal };
