import React, { FC, useEffect, useState } from "react";
import { ChevronsDown } from "react-feather";
import { Button } from "reactstrap";
import {
  useDeleteJob,
  useGetJobByFilter,
} from "../../../../../../core/services/api";
import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { JobTreeItem } from "./JobTreeItem";

interface IPropTypes {
  subClass: any;
  open: boolean;
}

const JobTree: FC<IPropTypes> = ({ subClass, open }) => {
  const [tableData, setTableData] = useState([]);
  const [filterList, setFilterList] = useState({
    page: 1,
    pageSize: 5,
    title: "",
    code: "",
    jobSubClassId: subClass.id,
    useTypeId: 0,
  });

  const [showMore, setShowMore] = useState<boolean>(true);

  const getList = useGetJobByFilter();
  const DeleteServicesById = useDeleteJob();

  useEffect(() => {
    if (open) getList.mutate(filterList);
  }, []);

  useEffect(() => {
    if (getList.isSuccess) {
      const result = getList.data?.data.result;
      setTableData(result.items);
      if (result.count === result.totalCount) setShowMore(false);
    }
  }, [getList.isSuccess]);

  return (
    <>
      <p className="mt-1 ml-2" style={{ color: "blue" }}>
        عنوان فعالیت اقتصادی
      </p>
      <hr className="ml-2" />
      {getList.isLoading || DeleteServicesById.isLoading ? (
        <FallBackSpinner setHeight={100} />
      ) : tableData.length > 0 ? (
        tableData.map((row: any) => (
          <JobTreeItem
            DeleteServicesById={DeleteServicesById}
            filterList={filterList}
            getList={getList}
            row={row}
          />
        ))
      ) : (
        <p style={{ fontSize: "16px", marginRight: "10px" }}>
          عنوان فعالیت اقتصادی وجود ندارد!
        </p>
      )}

      {tableData.length > 0 && (
        <Button
          color="secondary"
          disabled={!showMore}
          outline
          style={{ fontSize: "15px", padding: "10px 24px", border: "none" }}
          className={`d-flex align-items-center justify-content-center ml-1 mt-1 mb-1`}
          onClick={() => {
            getList.mutate({
              ...filterList,
              pageSize: filterList.pageSize + 5,
            });
            setFilterList((old) => ({
              ...old,
              pageSize: old.pageSize + 5,
            }));
          }}
        >
          <ChevronsDown size={17} /> بیشتر{" "}
        </Button>
      )}
    </>
  );
};

export { JobTree };
