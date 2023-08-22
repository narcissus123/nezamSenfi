import React from "react";
import { useHistory } from "react-router-dom";
import { stringShorter } from "../../../../../core/utils";


interface IPropTypes {
  cell: {
    row: {
      values: { id: number , text: string };
    };
  };
}

const TextCell: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id , text },
    },
  },
}) => {

  const history = useHistory();


  return (
    <span>
      {stringShorter(text , 40)}
    </span>
  );
};

export { TextCell };
