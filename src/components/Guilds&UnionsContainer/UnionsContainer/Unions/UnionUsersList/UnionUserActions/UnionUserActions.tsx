import React, { useContext, useState } from "react";
import { Edit, Edit3, FileMinus, List } from "react-feather";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Spinner } from "reactstrap";
import Swal from "sweetalert2";
import { UserRoles } from "../../../../../../core/enums";
import { CreateUserUnion } from "../../../../../../core/models";
import { usePostSetUserUnion } from "../../../../../../core/services/api";
import { IsIncludes, showToast } from "../../../../../../core/utils";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { Can } from "../../../../../common/Wrapper/Can/Can";
import { UserChangeRoles } from "../../UserChangeRoles/UserChangeRoles";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number; userNationalCode: any };
      original: any;
    };
  };
  isAdmin: boolean;
}

const UnionUserActions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id, userNationalCode },
      original,
    },
  },
  isAdmin,
}) => {
  // delete and edit icon in row
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const { id: countyUnionId } = useParams<{ id: string }>();

  const setUserUnionMutation = usePostSetUserUnion();
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const deleteClickHandler = (id: any) => {
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
          const obj: CreateUserUnion = {
            userId: id,
            allowedRoles: [],
            countyUnionId: parseInt(countyUnionId),
            expertJobsClaim: [],
            unionExecutiveManagerClaims: [],
            unionViceManagerClaims: [],
          };

          setUserUnionMutation.mutate(obj, {
            onSuccess: (val: any) => {
              showToast(["با موفقیت انجام شد!"], "success");
              const newEvent = { ...refetchEvent };
              newEvent.unionUserList = !newEvent.unionUserList;
              setRefetchEvent(newEvent);
            },
          });
        }
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-content-center"
      style={{ flexWrap: "wrap" }}
    >
      {isOpen && (
        <UserChangeRoles
          userNationalCode={userNationalCode}
          currentUser={id}
          isOpen={isOpen}
          toggleModal={() => setIsOpen(false)}
        />
      )}
      <Link target="_blank" to={`/UserList/RealUsersList/${id}`}>
        <Button
          style={{ margin: "3px" }}
          size="sm"
          color="warning"
          onClick={() => {}}
        >
          جزییات &nbsp;
          <Edit
            style={{ position: "relative", top: "-2px" }}
            size={12}
            color="white"
          />
        </Button>
      </Link>
      <Can roles={[UserRoles.UnionAdmin]}>
        {isAdmin && (
          <>
            <Button
              style={{ margin: "3px" }}
              size="sm"
              color="info"
              onClick={() => setIsOpen(true)}
            >
              تغییر نقش &nbsp;
              <Edit3
                style={{ position: "relative", top: "-1px" }}
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
              {setUserUnionMutation.isLoading && (
                <Spinner color="white" size="sm" />
              )}
              حذف &nbsp;
              <FileMinus
                style={{ position: "relative", top: "-2px" }}
                size={12}
                color="white"
              />
            </Button>

            {IsIncludes(original.role, "کارشناس اتحادیه") && (
              <Button
                style={{ margin: "3px" }}
                size="sm"
                color="primary"
                onClick={() => {
                  const win: Window | null = window.open(
                    `/Unions/UnionEdit/admin/${countyUnionId}/ExpertReports/${id}`,
                    "_blank"
                  );
                  win?.focus();
                }}
              >
                {setUserUnionMutation.isLoading && (
                  <Spinner color="white" size="sm" />
                )}
                گزارشات کارشناس &nbsp;
                <List
                  style={{ position: "relative" }}
                  size={12}
                  color="white"
                />
              </Button>
            )}
          </>
        )}
      </Can>
    </div>
  );
};

export { UnionUserActions };
