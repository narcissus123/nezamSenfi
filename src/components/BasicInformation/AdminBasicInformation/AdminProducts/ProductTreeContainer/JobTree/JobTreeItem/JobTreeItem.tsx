import React, { FC, useState } from "react";
import { Delete, Edit } from "react-feather";
import Swal from "sweetalert2";
import { EditJobModal } from "../EditJobModal";

interface IPropTypes {
  row: any;
  DeleteServicesById: any;
  getList: any;
  filterList: any;
}

const JobTreeItem: FC<IPropTypes> = ({
  DeleteServicesById,
  filterList,
  getList,
  row,
}) => {
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  return (
    <div className="mb-1">
      {isEditModal && (
        <EditJobModal
          isOpen={isEditModal}
          toggle={() => setIsEditModal(false)}
          job={row}
          refetch={() => getList.mutate(filterList)}
        />
      )}
      <span style={{ fontSize: "15px" }} className="ml-3">
        {" "}
        {row.title}{" "}
      </span>
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
                //console.log(row);

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
    </div>
  );
};

export { JobTreeItem };
