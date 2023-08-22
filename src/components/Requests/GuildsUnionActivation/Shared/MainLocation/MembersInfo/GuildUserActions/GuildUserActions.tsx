import React, { useState } from "react";
import { Edit, FileMinus } from "react-feather";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import { UserChangeRoles } from "./UserChangeRoles/UserChangeRoles";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number , userNationalCode : any , role : any};
    };
  };
  setTableData : any
  AllServiceState : any
  noChangeAllServiceState : any
}

const GuildUserActions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id , userNationalCode , role},
    },
  },
  setTableData,
  AllServiceState,
  noChangeAllServiceState
}) => {
  // delete and edit icon in row
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  
  const { id : provinceId } = useParams<{ id: string }>();

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
          setTableData((prev:any) => {
            return prev.filter((val: any) => val.id !== id);
          })
        }
      });
  }

  return (
    <div
      className="d-flex justify-content-center align-content-center"
      style={{ flexWrap: "wrap" }}
    >
      <UserChangeRoles
        userNationalCode={userNationalCode}
        currentUser={id}
        roles={role}
        isOpen={isOpen}
        toggleModal={() => setIsOpen(false)}
        setTableData={setTableData}
        AllServiceState={AllServiceState}
        noChangeAllServiceState={noChangeAllServiceState}
      />

      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="info"
        onClick={() => setIsOpen(true)}
      >
        تغییر نقش &nbsp;
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

export { GuildUserActions };
