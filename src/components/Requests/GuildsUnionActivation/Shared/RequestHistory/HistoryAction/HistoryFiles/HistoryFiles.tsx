import React, { FC, useEffect, useState } from "react";
import {
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import {
  useServeGuildRoomFileByAdmins,
  useServeUnionFileByAdmins,
  useShowServeGuildRoomFileByAdmins,
  useShowServeUnionFileByAdmins,
} from "../../../../../../../core/services/api";
import { simpleOption } from "../../../../../../../core/utils";
import { DownloadRow } from "../../../../../../common/DownloadRow/DownloadRow";
import { SimpleSubmitButton } from "../../../../../../common/Form";

import Styled from "./HistoryFiles.module.scss";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  data: any;
  isUnion: boolean;
}

const HistoryFiles: FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  data,
  isUnion,
}) => {
  const requestPage = [
    {
      value: 1,
      label: "اسناد ثبتی",
    },
    {
      value: 2,
      label: "مشخصات اعضا",
    },
    {
      value: 3,
      label: "مشخصات مکانی",
    },
    {
      value: 4,
      label: "مشاغل زیرمجموعه",
    },
  ];

  const [realData, setRealData] = useState<any>([]);

  useEffect(() => {
    let new_data: any = [];
    data.forEach((item: any) => {
      if (!new_data.some((id: any) => id.requestPage === item.requestPage)) {
        new_data.push({ requestPage: item.requestPage, files: [] });
      }
    });
    data.forEach((item: any) => {
      const index = new_data.findIndex(
        (ind: any) => ind.requestPage === item.requestPage
      );
      new_data[index].files.push({
        fullFileName: item.fullFileName,
        guildRoomRequestId: item.guildRoomRequestId
          ? item.guildRoomRequestId
          : item.unionRequestId,
        isUnion: isUnion,
      });
    });
    setRealData(new_data);
    if (!isOpen) setRealData([]);
  }, [data, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      className="modal-dialog-centered"
    >
      <ModalHeader>فایل های درخواست نظام صنفی</ModalHeader>
      <ModalBody>
        {realData.map((row: any, key: any) => {
          return (
            <>
              <ListGroupItem active tag="a" className={Styled["item-flex"]}>
                {simpleOption(row.requestPage, requestPage)?.label}
              </ListGroupItem>
              {row.files.map((file: any) => {
                return (
                  <ListGroupItem className={Styled["item-flex"]}>
                    <DownloadRow
                      mutate={
                        isUnion
                          ? useServeUnionFileByAdmins
                          : useServeGuildRoomFileByAdmins
                      }
                      type={isUnion ? "UnionAdmin" : "GuildAdmin"}
                      row={{
                        fileName: file.fullFileName,
                        guildRoomRequestId: file.guildRoomRequestId,
                        isUnion: isUnion,
                      }}
                      // setIsShow={(val: boolean) => setIsOpen(val)}
                      useServeShowFile={
                        isUnion
                          ? useShowServeUnionFileByAdmins
                          : useShowServeGuildRoomFileByAdmins
                      }
                    />
                  </ListGroupItem>
                );
              })}
              <hr />
            </>
          );
        })}
      </ModalBody>
      <ModalFooter className="justify-content-start">
        <SimpleSubmitButton
          isLoading={false}
          btnText="بازگشت"
          onCLick={toggleModal}
        />
      </ModalFooter>
    </Modal>
  );
};

export { HistoryFiles };
