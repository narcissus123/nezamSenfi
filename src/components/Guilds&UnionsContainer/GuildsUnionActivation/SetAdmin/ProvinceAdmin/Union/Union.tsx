import React, { FC, } from "react";
import { List } from "./List/List";

interface IPropTypes {}

const Union: FC<IPropTypes> = ({}) => {
  return (
    <>
      <List />
    </>
  );
};

export { Union };
