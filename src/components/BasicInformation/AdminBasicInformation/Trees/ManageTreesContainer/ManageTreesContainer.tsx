import * as React from "react";
import { TreesWrapper } from "../TreesWrapper/TreesWrapper";
import { Add } from "./Add/Add";
import { List } from "./List/List";

const ManageTreesContainer: React.FC = () => {
  return (
    <>
      <TreesWrapper text="ثبت و مدیریت درختان">
        <Add />
      </TreesWrapper>
      <List />
    </>
  );
};

export { ManageTreesContainer };
