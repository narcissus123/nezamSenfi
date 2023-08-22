import React, { useEffect } from "react";
import { Edit } from "react-feather";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import { useConfirmUnionById } from "../../../../../core/services/api";
import { showToast } from "../../../../../core/utils";
import { LoadingModal } from "../../../../common/LoadingModal/LoadingModal";

interface IPropTypes {
  cell: {
    row: {
      cells: any;
      values: {
        id: number;
      };
    };
  };
  reloadData: (obj: any) => void;
  dataObj: any;
  setInitialPage: any;
}

const UnionActions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      cells,
      values: { id },
    },
  },
  reloadData,
  dataObj,
  setInitialPage,
}) => {
  const confirmUnion = useConfirmUnionById();

  const onSubmit = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mr-1",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "اتحادیه مورد نظر تایید شود؟",
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
          confirmUnion.mutate(id);
        }
      });
  };

  useEffect(() => {
    if (confirmUnion.isSuccess) {
      if (cells.length === 1) {
        let lastPage = 0;
        setInitialPage((page: number) => {
          lastPage = page - 1;
          return lastPage === -1 ? 0 : lastPage;
        });
        reloadData({ ...dataObj, page: lastPage === -1 ? 1 : lastPage + 1 });
      } else {
        let lastPage = 0;
        setInitialPage((page: number) => {
          lastPage = page;
          return lastPage;
        });
        reloadData({ ...dataObj, page: lastPage + 1 });
      }
      showToast(["با موفقیت تایید شد"], "success");
    }
  }, [confirmUnion.isSuccess]);

  return (
    <div
      className="d-flex justify-content-center align-content-center"
      style={{ flexWrap: "wrap" }}
    >
      <LoadingModal isOpen={confirmUnion.isLoading} />
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="primary"
        onClick={onSubmit}
      >
        تایید &nbsp;
        <Edit
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { UnionActions };
