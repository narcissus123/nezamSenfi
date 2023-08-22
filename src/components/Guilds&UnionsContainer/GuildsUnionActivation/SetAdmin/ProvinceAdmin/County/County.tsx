import React, { FC, } from "react";
import { List } from "./List/List";
import { Set} from './Set/Set'

interface IPropTypes {}

const County: FC<IPropTypes> = ({}) => {
  return (
    <>
      <Set />
      <List />
    </>
  );
};

export { County };
