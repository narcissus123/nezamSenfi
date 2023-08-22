import React, { useContext, useState } from "react";
import { Edit, FileMinus, User } from "react-feather";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Spinner } from "reactstrap";
import Swal from "sweetalert2";
import { ToastTypes } from "../../../../../core/enums";
import { useDeleteConsumptionCost } from "../../../../../core/services/api";
import { showToast } from "../../../../../core/utils";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import { EditModal } from "./EditModal/EditModal";



interface IPropTypes {
  cell: {
    row: {
      values: { id: number; userNationalCode: any , title : any };
      original: any
    };
  };
}

const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id , userNationalCode , title },
      original
    },
  },
}) => {
  // delete and edit icon in row
  const [openModal, setOpenModal] = useState<boolean>(false);
  
  const removeMutation = useDeleteConsumptionCost()

  const {refetchEvent,setRefetchEvent} = useContext(refetchContext)
  
  const deleteClickHandler = (id : any) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mr-1",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "ایا مایل به حذف هستید؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "حذف",
        cancelButtonText: "انصراف",
        showLoaderOnConfirm: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          removeMutation.mutate(id, {
            onSuccess: (val: any) => {
              showToast(["با موفقیت انجام شد."], ToastTypes.success);
              const newEvent = { ...refetchEvent };
              newEvent.costManagementList = !newEvent.costManagementList;
              setRefetchEvent(newEvent);
            },
          });
        }
      });
  }


  
  return (
    <div
      className="d-flex justify-content-center align-content-center"
      style={{ flexWrap: "wrap" }}
    >
      {openModal && (
        <EditModal
          backdrop
          isOpen={openModal}
          currentId={id}
          toggleModal={() => setOpenModal(false)}
          data={original}
        />
      )}
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="danger"
        onClick={() => {
          deleteClickHandler(id);
        }}
      >
        {removeMutation.isLoading && <Spinner color="white" size="sm" />}
        حذف &nbsp;
        <FileMinus
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        ویرایش &nbsp;
        <Edit
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { Actions };
