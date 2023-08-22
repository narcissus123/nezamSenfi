import React, { useState } from "react";
import { Check, Edit } from "react-feather";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import CheckBoxesVuexy from "../../../../../../../../common/@vuexy/checkbox/CheckboxesVuexy";
import { LinksModal } from "./LinksModal";

interface IPropTypes {
  cell: {
    row: {
      values: {};
      original: { documents: any[]; userInfoId: number };
    };
  };
  setDocumentIds: (val: any) => void;
}

const DocumentsList: React.FC<IPropTypes> = ({
  cell: {
    row: {
      original: { documents, userInfoId },
    },
  },
  setDocumentIds,
}) => {
  const [files, setFiles] = useState<any>([]);
  const [showDownload, setShowDownload] = useState<boolean>(false);

  const showDownloadFiles = (files: any) => {
    setFiles(files);
    setShowDownload(true);
  };

  return (
    <>
      {showDownload && (
        <LinksModal
          backdrop
          filesPaths={files.files}
          userInfoId={files.userInfoId}
          isOpen={showDownload}
          toggleModal={() => setShowDownload(false)}
        />
      )}
      <ListGroup tag="div" style={{ width: "100%" }} className="text-left">
        {documents.length > 0 &&
          documents.map((rows, key) => (
            <ListGroupItem
              key={key}
              tag="a"
              style={{ color: "#626262" }}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                {rows.title} -
                <span
                  style={{ fontWeight: "bold", fontSize: "16px" }}
                  onClick={() =>
                    showDownloadFiles({
                      files: rows.files,
                      userInfoId: rows.userInfoId,
                    })
                  }
                >
                  {" "}
                  دانلود فایل ها
                </span>
              </div>
              <CheckBoxesVuexy
                defaultChecked={rows.isConfirm}
                onChange={(e: any) => {
                  const checked = e.currentTarget.checked;
                  if (checked)
                    setDocumentIds((old: number[]) => [...old, rows.id]);
                  else
                    setDocumentIds((old: number[]) =>
                      old.filter((it: number) => it !== rows.id)
                    );
                  console.log();
                }}
                // color="primary"
                icon={<Check className="vx-icon" size={16} />}
              />
            </ListGroupItem>
          ))}
      </ListGroup>
    </>
  );
};

export { DocumentsList };
