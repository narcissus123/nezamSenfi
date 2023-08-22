import React, { useContext, useState } from "react";
import { File, FileMinus } from "react-feather";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Button, Spinner } from "reactstrap";
import Swal from "sweetalert2";
import { ToastTypes } from "../../../../../../../../core/enums";
import { useRemoveAdminInProvince } from "../../../../../../../../core/services/api";
import { showToast } from "../../../../../../../../core/utils";
import { refetchContext } from "../../../../../../../../core/utils/context/EventContext";
const queryString = require('query-string');

interface IPropTypes {
  cell: {
    row: {
      values: { id: number; userNationalCode: any };
      original: { provinceId: any };
    };
  };
}

const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id , userNationalCode },
      original: { provinceId }
    },
  },
}) => {
  // delete and edit icon in row
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);


  const removeMutation = useRemoveAdminInProvince()

  const {refetchEvent,setRefetchEvent} = useContext(refetchContext)

  const location = useLocation()
  const parsed = queryString.parse(location.search);
  
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
        if (result.isConfirmed) {
          removeMutation.mutate(
            { provinceId: parsed.id, userId: id },
            {
              onSuccess: (val: any) => {
                showToast(["با موفقیت انجام شد."], ToastTypes.success);
                const newEvent = { ...refetchEvent };
                newEvent.provinceAdminRemove = !newEvent.provinceAdminRemove;
                setRefetchEvent(newEvent);
              },
            }
          );
        }
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
