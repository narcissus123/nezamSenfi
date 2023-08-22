import React, { useContext, useState } from "react";
import { Edit, FileMinus } from "react-feather";
import { UseMutationResult } from "react-query";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import { ToastTypes } from "../../../../../../../core/enums";
import { useDeleteCategoryTree } from "../../../../../../../core/services/api/base-tree-category.api";
import { showToast } from "../../../../../../../core/utils";
import { refetchContext } from "../../../../../../../core/utils/context/EventContext";
import { EditModal } from "./EditModal/EditModal";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number; name: any; title: any };
      original: any;
    };
  };
  mutation: UseMutationResult;
}

const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id , name , title },
      original
    },
  },

}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);
  const mutation = useDeleteCategoryTree();

  const deleteClickHandler = (id:any)=>{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mr-1",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "ایا مایل به حذف اطلاعات هستید؟",
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
          mutation.mutate(id, {
            onSuccess: (val: any) => {
              showToast(
                ["دسته بندی درخت با موفقیت حدف شد"],
                ToastTypes.success
              );
              const newEvent = { ...refetchEvent };
              newEvent.treesCategoryList = !newEvent.treesCategoryList;
              setRefetchEvent(newEvent);
            },
          });
        }
      });
  }
  return (
    <div className="d-flex justify-content-center align-content-center">
      <EditModal
        backdrop
        isOpen={openModal}
        currentId={id}
        toggleModal={() => setOpenModal(false)}
        data={original}
      />
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

      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="danger"
        onClick={() => {
          deleteClickHandler(id);
        }}
      >
        حذف &nbsp;
        <FileMinus
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { Actions };
