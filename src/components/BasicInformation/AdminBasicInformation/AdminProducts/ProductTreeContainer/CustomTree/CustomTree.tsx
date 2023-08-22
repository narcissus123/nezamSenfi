import React, { FC, ReactNode, useState } from "react";
import Tree from "react-animated-tree-v2";
import { Delete, Edit } from "react-feather";
import Swal from "sweetalert2";

interface IPropTypes {
  row: any;
  DeleteServicesById: any;
  getList: any;
  filterList: any;
  SubTree: (prop: any) => ReactNode;
  editModal?: (prop: any) => ReactNode;
}

const CustomTree: FC<IPropTypes> = ({
  row,
  DeleteServicesById,
  getList,
  filterList,
  SubTree,
  editModal,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isEditModal, setIsEditModal] = useState<boolean>(false);

  return (
    <>
      {isEditModal &&
        editModal &&
        editModal({
          isOpen: isEditModal,
          toggle: () => setIsEditModal(false),
        })}
      <Tree
        itemId={row.title}
        onItemToggle={(e) => setOpen((old) => !old)}
        content={
          <>
            <span style={{ fontSize: "15px" }}> {row.title} </span>
            {row.code == "0" && row.jobClassId ? (
              <></>
            ) : (
              <>
                <Delete
                  style={{
                    position: "relative",
                    top: "-2px",
                    margin: " 0 5px",
                    cursor: "pointer",
                    opacity: 0.7,
                  }}
                  size={15}
                  onClick={() => {
                    const swalWithBootstrapButtons = Swal.mixin({
                      customClass: {
                        confirmButton: "btn btn-success mr-1",
                        cancelButton: "btn btn-danger",
                      },
                      buttonsStyling: false,
                    });

                    swalWithBootstrapButtons
                      .fire({
                        title: "‌اخطار",
                        text: "بخش مورد نظر حذف گردد؟",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "بله",
                        cancelButtonText: "خیر",
                        showLoaderOnConfirm: true,
                      })
                      .then((result) => {
                        if (result.isConfirmed) {
                          //  history.push(url);
                          DeleteServicesById.mutate(row.id, {
                            onSuccess: () => {
                              getList.mutate(filterList);
                            },
                          });
                        }
                      });
                  }}
                  color="red"
                />
                <Edit
                  style={{
                    position: "relative",
                    top: "-2px",
                    cursor: "pointer",
                    opacity: 0.7,
                  }}
                  size={15}
                  onClick={() => setIsEditModal(true)}
                  color="blue"
                />
              </>
            )}
          </>
        }
      >
        {SubTree({ open })}
      </Tree>
    </>
  );
};

export { CustomTree };
