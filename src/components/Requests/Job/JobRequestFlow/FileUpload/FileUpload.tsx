import React, { useEffect, useState } from "react";
import { X } from "react-feather";
import { Button, FormGroup, ListGroup, ListGroupItem } from "reactstrap";
import {
  useServeFileByAdmins,
  useServeShowFileByAdmin,
} from "../../../../../core/services/api";
import { DownloadRow } from "../../../../common/DownloadRow/DownloadRow";
import { SelectModal } from "./SelectModal/SelectModal";

export interface FileInputProps {
  setFieldValue: any;
  files: any;
  inputText?: string;
  color?: string;
  disabled?: boolean;
  getFileMutation?: any;
  accept?: string;
}

const FileUpload: React.FC<FileInputProps> = ({
  setFieldValue,
  files = [],
  inputText,
  color,
  disabled,
  getFileMutation,
  accept,
}) => {
  const [showSelectModal, setShowSelectModal] = useState<boolean>(false);
  const [localFiles, setLocalFiles] = useState<any>(null);

  useEffect(() => {
    const new_file = files
      .map((e: any) => e.id)
      .map((e: any, i: any, final: any) => final.indexOf(e) === i && i)
      .filter((e: any) => files[e])
      .map((e: any) => files[e]);
    setLocalFiles(new_file);
  }, [files]);

  return (
    <>
      <SelectModal
        backdrop={true}
        data={files}
        isOpen={showSelectModal}
        accept={
          accept
            ? accept
            : "image/jpeg, image/png, image/jpg, image/tif,image/tiff, application/pdf"
        }
        toggleModal={() => setShowSelectModal((val: any) => !val)}
      />

      <FormGroup style={{ paddingTop: "22.8px" }}>
        <Button
          disabled={disabled}
          color={color ? color : "primary"}
          onClick={() => {
            setShowSelectModal(true);
          }}
        >
          {inputText ? inputText : "بارگذاری اسناد"}
        </Button>

        <p style={{ paddingTop: "10px" }}>
          {files ? (
            files.length > 0 ? (
              <ListGroup tag="div" className="mt-1">
                <ListGroupItem tag="a" active>
                  فایل های انتخاب شده
                </ListGroupItem>
                {files &&
                  Array.from(files).map((item: any, key: any) => {
                    return (
                      <div key={key}>
                        {item.name && (
                          <ListGroupItem
                            tag="a"
                            className="d-flex justify-content-between"
                          >
                            {item.name}

                            <span>
                              <X
                                color="red"
                                onClick={() => {
                                  let newFiles = Array.from(localFiles).filter(
                                    (file, ind) => ind !== key
                                  );

                                  setFieldValue(newFiles);
                                }}
                              />
                            </span>
                          </ListGroupItem>
                        )}
                      </div>
                    );
                  })}
                {localFiles &&
                  Array.from(localFiles).map((item: any, key: any) => {
                    return (
                      <div key={key}>
                        {item.value &&
                          item.value.map((value: any, key: any) => {
                            return (
                              <ListGroupItem
                                tag="a"
                                className="d-flex justify-content-between"
                                key={key}
                              >
                                <DownloadRow
                                  mutate={useServeFileByAdmins}
                                  type="admin"
                                  row={value}
                                  useServeShowFile={useServeShowFileByAdmin}
                                />
                              </ListGroupItem>
                            );
                          })}
                      </div>
                    );
                  })}
              </ListGroup>
            ) : (
              ""
            )
          ) : (
            " "
          )}
        </p>
      </FormGroup>
    </>
  );
};

export { FileUpload };
