import React, { useContext, useState } from "react";
import { Edit, File, FileMinus } from "react-feather";
import { Link, useHistory } from "react-router-dom";
import { Button, Spinner } from "reactstrap";
import Swal from "sweetalert2";
import { UserRoles } from "../../../../../../core/enums";
import { usePostSetUserInMainLocationGuildRoom } from "../../../../../../core/services/api/guilds.api";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { showToast } from "../../../../../../core/utils/show-toast";
import { Can } from "../../../../../common/Wrapper/Can/Can";
import { UserChangeRoles } from "../../UserChangeRoles/UserChangeRoles";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number , userNationalCode : any };
    };
  };
  isAdmin : boolean
  mainLocationId : any
}

const GuildUserActions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id , userNationalCode  },
    },
  },
  isAdmin,
  mainLocationId
}) => {
  // delete and edit icon in row
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const postCreateUserProvinceGuildRoomMutation = usePostSetUserInMainLocationGuildRoom();
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
        if (result.isConfirmed) {
          const obj: any = {
            userId: id,
            allowedRoles: [],
            mainLocationId: mainLocationId,
          };

          postCreateUserProvinceGuildRoomMutation.mutate(obj, {
            onSuccess: (val: any) => {
              showToast(["با موفقیت انجام شد!"], "success");
              const newEvent = { ...refetchEvent };
              newEvent.mainlocationGuildUser = !newEvent.mainlocationGuildUser;
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
      <UserChangeRoles
        userNationalCode={userNationalCode}
        currentUser={id}
        isOpen={isOpen}
        toggleModal={() => setIsOpen(false)}
        mainLocationId={mainLocationId}
      />
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
      <Can roles={[UserRoles.Admin]}>
        <>
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
            {postCreateUserProvinceGuildRoomMutation.isLoading && (
              <Spinner color="white" size="sm" />
            )}
            حذف &nbsp;
            <FileMinus
              style={{ position: "relative", top: "-2px" }}
              size={12}
              color="white"
            />
          </Button>
        </>
      </Can>
    </div>
  );
};

export { GuildUserActions };
