import React from "react";
import { useHistory } from "react-router-dom";
import { stringShorter } from "../../../../../core/utils";


interface IPropTypes {
  cell: {
    row: {
      values: { id: number , description: string };
    };
  };
}

const TextCell: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id , description },
    },
  },
}) => {

  const history = useHistory();


  return (
    <span>
      {stringShorter(description , 40)}
    </span>
  );
};

export { TextCell };
