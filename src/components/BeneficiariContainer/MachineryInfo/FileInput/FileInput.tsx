import React, { useState } from "react";
import { X } from "react-feather";
import { Button, FormGroup, ListGroup, ListGroupItem } from "reactstrap";

import { SelectModal } from "./SelectModal";

export interface FileInputProps {
  setFieldValue: any;
  files: any;
  inputText?: string;
  color?: string;
  disabled?: boolean;
  accept?: string;
  outLine?: boolean;
  typeRequest?: string;
  onSubmit?: (val: any) => void;
}

const FileInput: React.FC<FileInputProps> = ({
  setFieldValue,
  files,
  inputText,
  color,
  disabled,
  accept,
  outLine,
  onSubmit,
}) => {
  const [showSelectModal, setShowSelectModal] = useState<any>(false);

  return (
    <>
      <SelectModal
        backdrop={true}
        data={files}
        isOpen={showSelectModal}
        setFieldValue={setFieldValue}
        accept={
          accept
            ? accept
            : "image/jpeg, image/png, image/jpg, image/tif,image/tiff, application/pdf"
        }
        toggleModal={() => setShowSelectModal((val: any) => !val)}
        onSubmit={onSubmit}
      />

      <FormGroup style={{ paddingTop: "22.8px" }}>
        <Button
          disabled={disabled}
          outline={outLine}
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
                  اسناد
                </ListGroupItem>
                {files.map((item: any, key: any) => {
                  return (
                    <ListGroupItem
                      tag="a"
                      className="d-flex justify-content-between"
                      key={key}
                    >
                      {item.userMachineFileTypeEnum && (
                        <span>
                          {key + 1}. {item.file[0].name} (
                          {item.userMachineFileTypeEnum.label})
                        </span>
                      )}

                      <span>
                        <X
                          color="red"
                          onClick={() => {
                            let newFiles = Array.from(files).filter(
                              (file, ind) => ind !== key
                            );

                            setFieldValue(newFiles);
                          }}
                        />
                      </span>
                    </ListGroupItem>
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

export { FileInput };
