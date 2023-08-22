import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import {
  usePostGetCountyGuildRooomPositionRequestInquiryFiles,
  usePostGetCountyUnionPositionRequestInquiryFiles,
  usePostGetMainLocationGuildRoomPositionRequestInquiryFiles,
  usePostGetProvinceGuildRoomPositionRequestInquiryFiles,
  useServeFileByAdmins,
  useServeShowFileByAdmin,
} from "../../../../../../../../core/services/api";
import { DownloadRow } from "../../../../../../../common/DownloadRow/DownloadRow";
import { FallBackSpinner } from "../../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  data?: any;
  accept?: string;
  from?: string;
  inquiryId: any;
}

const FilesModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  data,
  accept,
  from,
  inquiryId,
}) => {
  let getCountyFilesMutation =
    usePostGetCountyGuildRooomPositionRequestInquiryFiles();
  let getProvinceFilesMutation =
    usePostGetProvinceGuildRoomPositionRequestInquiryFiles();
  let getMainLocationFilesMutation =
    usePostGetMainLocationGuildRoomPositionRequestInquiryFiles();
  let getUnionFilesMutation =
    usePostGetCountyUnionPositionRequestInquiryFiles();

  let { id } = useParams<any>();

  const [localFiles, setLocalFiles] = useState<any>([]);

  useEffect(() => {
    if (isOpen) {
      switch (from) {
        case "County":
          getCountyFilesMutation.mutate(inquiryId, {
            onSuccess: (val: any) => {
              console.log("valuess ---", val);
              setLocalFiles(val.data.result);
            },
          });
          break;
        case "Province":
          getProvinceFilesMutation.mutate(inquiryId, {
            onSuccess: (val: any) => {
              console.log("valuess ---", val);
              setLocalFiles(val.data.result);
            },
          });
          break;
        case "MainLocation":
          getMainLocationFilesMutation.mutate(inquiryId, {
            onSuccess: (val: any) => {
              console.log("valuess ---", val);
              setLocalFiles(val.data.result);
            },
          });
          break;
        case "Union":
          getUnionFilesMutation.mutate(inquiryId, {
            onSuccess: (val: any) => {
              console.log("valuess ---", val);
              setLocalFiles(val.data.result);
            },
          });
          break;
      }
    }
  }, [isOpen]);
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
            {getCountyFilesMutation.isLoading ||
            getProvinceFilesMutation.isLoading ||
            getMainLocationFilesMutation.isLoading ||
            getUnionFilesMutation.isLoading ? (
              <FallBackSpinner setHeight={200} />
            ) : (
              <>
                {localFiles &&
                  localFiles.map((item: any, key: any) => {
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
            )}
          </ListGroup>
        </ModalBody>
      </Modal>
    </>
  );
};

export { FilesModal };
