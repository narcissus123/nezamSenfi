import React, { useContext, useState } from "react";
import { File, FileMinus } from "react-feather";
import { Link, useHistory } from "react-router-dom";
import { Button, Spinner } from "reactstrap";
import Swal from "sweetalert2";
import { ToastTypes } from "../../../../../../../../core/enums";
import { useRemoveAdminInCounty } from "../../../../../../../../core/services/api";
import { showToast } from "../../../../../../../../core/utils";
import { refetchContext } from "../../../../../../../../core/utils/context/EventContext";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number; userNationalCode: any };
      original: { countyId: any };
    };
  };
}

const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id , userNationalCode },
      original: { countyId }
    },
  },
}) => {
  // delete and edit icon in row
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);


  const removeMutation = useRemoveAdminInCounty()

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
        title: "ایا مایل به حذف کاربر هستید؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "حذف",
        cancelButtonText: "انصراف",
        showLoaderOnConfirm: true,
      })
      .then((result) => {
        removeMutation.mutate({countyId : countyId.value , userId : id} , { onSuccess:(val:any)=>{
          showToast(['با موفقیت انجام شد.']  , ToastTypes.success)
          const newEvent = {...refetchEvent}
          newEvent.countyAdminRemove = !newEvent.countyAdminRemove
          setRefetchEvent(newEvent)
        }})
      });
  }


  
  return (
    <div
      className="d-flex justify-content-center align-content-center"
      style={{ flexWrap: "wrap" }}
    >
      <Link target="_blank" to={`/UserList/RealUsersList/${id}`}>
        <Button
          style={{ margin: "3px" }}
          size="sm"
          color="warning"
          onClick={() => {}}
        >
          جزییات &nbsp;
          <File
            style={{ position: "relative", top: "-2px" }}
            size={12}
            color="white"
          />
        </Button>
      </Link>
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
    </div>
  );
};

export { Actions };
