import React, { useState } from "react";
import { X } from "react-feather";
import { Button, FormGroup, ListGroup, ListGroupItem } from "reactstrap";
import {
  useServe,
  useServeShowFile,
  useServeGuildRoomFileByAdmins,
  useShowServeGuildRoomFileByAdmins,
  useShowServeUnionFileByAdmins,
  useServeUnionFileByAdmins,
  useServeMainLocationGuildRoomFileByAdmins,
  useShowServeMainLocationGuildRoomFileByAdmins,
} from "../../../../../core/services/api";
import { DownloadRow } from "../../../DownloadRow/DownloadRow";
import { ShowImage } from "../../../DownloadRow/ShowImage/ShowImage";
import { SelectModal } from "./SelectModal/SelectModal";

export interface FileInputProps {
  setFieldValue: any;
  files: FileList | File[] | null;
  inputText?: string;
  color?: string;
  disabled?: boolean;
  accept?: string;
  outLine?: boolean;
  typeRequest?: string;
  isSingle?: boolean;
  name?: string;
  removeServedFiles?: () => void;
  fileServer?: Blob[];
  isServerFile?: boolean;
}

const FileInput: React.FC<FileInputProps> = ({
  setFieldValue,
  files,
  name,
  inputText,
  color,
  disabled,
  isSingle,
  accept,
  outLine,

  removeServedFiles,
  fileServer = [],
  isServerFile = false,
}) => {
  const [showSelectModal, setShowSelectModal] = useState<any>(false);

  const [fileToShow, setfileToShow] = useState<any>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <SelectModal
        backdrop={true}
        name={name}
        //data={files}
        isOpen={showSelectModal}
        isSingle={isSingle}
        accept={
          accept
            ? accept
            : "image/jpeg, image/png, image/jpg, image/tif,image/tiff, application/pdf"
        }
        removeServedFiles={removeServedFiles}
        toggleModal={() => setShowSelectModal((val: any) => !val)}
      />
      <ShowImage
        image={fileToShow}
        isOpen={isOpen}
        toggle={() => setIsOpen(false)}
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
                  فایل ها
                </ListGroupItem>
                {Array.from(files).map((item: any, key: any) => {
                  return (
                    <ListGroupItem
                      tag="a"
                      className="d-flex justify-content-between"
                      key={key}
                    >
                      {item.fullFileName && (
                        <>
                          <DownloadRow
                            mutate={useServe}
                            type="applicant"
                            row={item}
                            fileServer={fileServer[key]}
                            isServerFile={isServerFile}
                            // setIsShow={(val: boolean) => setIsOpen(val)}
                            useServeShowFile={useServeShowFile}
                          />
                        </>
                      )}

                      {item.fileName &&
                        item.guildRoomRequestId &&
                        !item.isUnion && !item.isMainLocation && (
                          <>
                            <DownloadRow
                              mutate={useServeGuildRoomFileByAdmins}
                              type="GuildAdmin"
                              row={item}
                              fileServer={fileServer[key]}
                              isServerFile={isServerFile}
                              // setIsShow={(val: boolean) => setIsOpen(val)}
                              useServeShowFile={
                                useShowServeGuildRoomFileByAdmins
                              }
                            />
                          </>
                        )}

                      {item.fileName &&
                        item.guildRoomRequestId &&
                        item.isMainLocation && (
                          <>
                            <DownloadRow
                              mutate={useServeMainLocationGuildRoomFileByAdmins}
                              type="GuildAdmin"
                              row={item}
                              fileServer={fileServer[key]}
                              isServerFile={isServerFile}
                              // setIsShow={(val: boolean) => setIsOpen(val)}
                              useServeShowFile={
                                useShowServeMainLocationGuildRoomFileByAdmins
                              }
                            />
                          </>
                        )}

                        
                      {item.fileName &&
                        item.guildRoomRequestId &&
                        item.isUnion && (
                          <>
                            <DownloadRow
                              mutate={useServeUnionFileByAdmins}
                              type="UnionAdmin"
                              row={item}
                              fileServer={fileServer[key]}
                              isServerFile={isServerFile}
                              // setIsShow={(val: boolean) => setIsOpen(val)}
                              useServeShowFile={useShowServeUnionFileByAdmins}
                            />
                          </>
                        )}


                      {item.name && <span>{item.name}</span>}

                      {!item.fullFileName && !item.guildRoomRequestId && (
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
                      )}
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
