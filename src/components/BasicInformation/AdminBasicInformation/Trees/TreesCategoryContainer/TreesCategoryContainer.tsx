import * as React from "react";
import { TreesWrapper } from "../TreesWrapper/TreesWrapper";
import { Add } from "./Add/Add";
import { List } from "./List/List";

const TreesCategoryContainer: React.FC = () => {
  return (
    <>
      <TreesWrapper text="ثبت و مدیریت دسته بندی درختان">
        <Add />
      </TreesWrapper>

      <List />
    </>
  );
};

export { TreesCategoryContainer };
