import React, { FC, } from "react";
import { List } from "./List/List";
import { Set } from './Set/Set';

interface IPropTypes {}

const Union: FC<IPropTypes> = ({}) => {
  return (
    <>
      <Set />
      <List />
    </>
  );
};

export { Union };
