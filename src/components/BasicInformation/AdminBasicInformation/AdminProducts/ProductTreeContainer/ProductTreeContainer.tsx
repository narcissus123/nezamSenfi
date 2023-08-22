import React, { useEffect, useState } from "react";
import Tree from "react-animated-tree-v2";
import { ChevronsDown } from "react-feather";
import { Button, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { useDeleteJobSection } from "../../../../../core/services/api";
import { useGetJobSectionByFilter } from "../../../../../core/services/api/job.api";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { AddButtons } from "./AddButtons/AddButtons";
import "./ProductTreeContainer.scss";
import { CustomTree } from "./CustomTree/CustomTree";
import { SubSectionTree } from "./SubSectionTree/SubSectionTree";
import { EditSectionModal } from "./CustomTree/EditSectionModal/EditSectionModal";

const ProductTreeContainer: React.FC = () => {
  const [filterList, setFilterList] = useState({
    page: 1,
    pageSize: 10,
    title: "",
    code: "",
  });
  const [tableData, setTableData] = useState([]);
  const [showMore, setShowMore] = useState<boolean>(true);

  const getList = useGetJobSectionByFilter();
  const DeleteServicesById = useDeleteJobSection();

  useEffect(() => {
    getList.mutate(filterList);
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
      <Card>
        <CardHeader>
          <CardTitle className="d-md-flex align-items-center justify-content-between w-100">
            <span> ساختار درختی محصولات </span>
            <AddButtons />
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Tree itemId="Sections" content="بخش ها" open>
            {getList.isLoading || DeleteServicesById.isLoading ? (
              <FallBackSpinner setHeight={200} />
            ) : tableData.length > 0 ? (
              tableData.map((row: any) => (
                <CustomTree
                  DeleteServicesById={DeleteServicesById}
                  filterList={filterList}
                  getList={getList}
                  row={row}
                  SubTree={(prop) => <SubSectionTree section={row} {...prop} />}
                  editModal={(prop) => (
                    <EditSectionModal
                      {...prop}
                      job={row}
                      refetch={() => getList.mutate(filterList)}
                    />
                  )}
                />
              ))
            ) : (
              <p style={{ fontSize: "16px", marginRight: "10px" }}>
                بخشی وجود ندارد!
              </p>
            )}

            {tableData.length > 0 && (
              <Button
                color="secondary"
                outline
                style={{
                  fontSize: "15px",
                  padding: "10px 24px",
                  border: "none",
                }}
                disabled={!showMore}
                className={`d-flex align-items-center justify-content-center ml-1 mt-1 mb-1`}
                onClick={() => {
                  getList.mutate({
                    ...filterList,
                    pageSize: filterList.pageSize + 10,
                  });
                  setFilterList((old) => ({
                    ...old,
                    pageSize: old.pageSize + 10,
                  }));
                }}
              >
                <ChevronsDown size={17} /> بیشتر{" "}
              </Button>
            )}
          </Tree>
        </CardBody>
      </Card>
    </>
  );
};

export { ProductTreeContainer };
