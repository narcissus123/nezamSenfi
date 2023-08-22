import React, { useEffect, useState } from "react";
import { Edit, MoreHorizontal } from "react-feather";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import { ToastTypes } from "../../../../../../core/enums";
import { useConfirmCountyGuildRoom } from "../../../../../../core/services/api";
import { showToast } from "../../../../../../core/utils";
import { LoadingModal } from "../../../../../common/LoadingModal/LoadingModal";
import { CountyDetails } from "../CountyDetails";

interface IPropTypes {
  cell: {
    row: {
      cells: any;
      values: any;
    };
  };
  reloadData: (obj: any) => void;
  setInitialPage: any;
  unionConfirmFilter: any;
}

const CountyActions: React.FC<IPropTypes> = ({
  cell: {
    row: { cells, values },
  },
  reloadData,
  setInitialPage,
  unionConfirmFilter,
}) => {
  const confirmCounty = useConfirmCountyGuildRoom();

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
        title: "صنف مورد نظر تایید شود؟",
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
          //mutation.mutate(1)
          confirmCounty.mutate(values.id);
        }
      });
  };

  useEffect(() => {
    if (confirmCounty.data && confirmCounty.data.data) {
      showToast(["با موفقیت تایید شد"], ToastTypes.success);
      let lastPage = 0;
      if (cells.length === 1) {
        setInitialPage((state: any) => {
          lastPage = state - 1;
          return lastPage === -1 ? 0: lastPage;
        });
      } else
        setInitialPage((state: any) => {
          lastPage = state;
          return lastPage;
        });
      reloadData({
        ...unionConfirmFilter,
        page: lastPage === -1 ? 1 : lastPage + 1,
      });
    }
  }, [confirmCounty.isSuccess]);

  useEffect(() => {
    if (confirmCounty.isError) {
      showToast(["مشکلی پیش آمده است"], ToastTypes.error);
    }
  }, [confirmCounty.isError]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="d-flex justify-content-center align-content-center"
      style={{ flexWrap: "wrap" }}
    >
      <LoadingModal isOpen={confirmCounty.isLoading} />
      <CountyDetails
        isOpen={isOpen}
        values={values}
        toggleModal={() => setIsOpen(false)}
      />
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

      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() => setIsOpen(true)}
      >
        جزییات &nbsp;
        <MoreHorizontal
          style={{ position: "relative", top: "0px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { CountyActions };
