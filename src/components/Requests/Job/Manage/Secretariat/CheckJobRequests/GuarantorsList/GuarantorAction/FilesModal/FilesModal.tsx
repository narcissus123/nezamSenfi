import React from "react";

import { useParams } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import {
  useServeFileByAdmins,
  useServeShowFileByAdmin,
} from "../../../../../../../../../core/services/api";
import { DownloadRow } from "../../../../../../../../common/DownloadRow/DownloadRow";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  data?: any;
  userId: any;
}

const FilesModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  data,
  userId,
}) => {
  let { id } = useParams<any>();

  let filesData: any = [];
  data.forEach((e: any) => {
    filesData.push({ fileName: e, folderName: userId });
  });

  console.log("filesdata ---", filesData);

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className="modal-dialog-centered"
        backdrop={backdrop}
      >
        <ModalHeader toggle={toggleModal}>اسناد بارگزاری شده</ModalHeader>
        <ModalBody>
          <ListGroup tag="div" className="mt-1">
            <>
              {filesData &&
                filesData.map((item: any, key: any) => {
                  return (
                    <div key={key}>
                      <ListGroupItem
                        tag="a"
                        className="d-flex justify-content-between"
                        key={key}
                      >
                        <DownloadRow
                          mutate={useServeFileByAdmins}
                          type="admin"
                          row={item}
                          useServeShowFile={useServeShowFileByAdmin}
                        />
                      </ListGroupItem>
                    </div>
                  );
                })}
            </>
          </ListGroup>
        </ModalBody>
      </Modal>
    </>
  );
};

export { FilesModal };
