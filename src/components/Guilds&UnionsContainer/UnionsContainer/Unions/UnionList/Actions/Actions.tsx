import React from "react";
import { User } from "react-feather";
import { UseMutationResult } from "react-query";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import { UserRoles } from "../../../../../../core/enums";
import { showToast } from "../../../../../../core/utils";
import { Can } from "../../../../../common/Wrapper/Can/Can";
import { File } from "react-feather";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number , name : any };
    };
  };
  mutation : UseMutationResult,
  setShowEditModal : (id:any) => void,
  setSelectedUser : (id:any) => void,
}

const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id , name },
    },
  },
  mutation,
  setSelectedUser,
  setShowEditModal

}) => {

  const history = useHistory();


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
          //mutation.mutate(1)
          showToast(["اطلاعات با موفقیت حدف شد"], "success");
        }
      });
  }
  return (
    <div className="d-flex justify-content-center align-content-center">
      <Can roles={[UserRoles.CountyGuildRoomAdmin]}>
        <Button
          style={{ margin: "3px" }}
          size="sm"
          color="info"
          onClick={() => {
            history.push({
              pathname: "/Unions/UnionEdit/" + id,
              state: { unionName: name },
            });
          }}
        >
          کاربران &nbsp;
          <User
            style={{ position: "relative", top: "-2px" }}
            size={12}
            color="white"
          />
        </Button>
      </Can>

      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() => {
          history.push("/UnionsDetails/Union/" + id + "/RegisteryDocs");
        }}
      >
        جزئیات &nbsp;
        <File
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>

      {/* <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() => {
          setSelectedUser(id)
          setShowEditModal(true)
        }}
      >
        ویرایش &nbsp;
        <Edit
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button> */}

      {/* <Button
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
      </Button> */}
    </div>
  );
};

export { Actions };
