import React from "react";
import { stringShorter } from "../../../../../../core/utils";


interface IPropTypes {
  cell: {
    row: {
      values: { id: number , name:any  , countyDescription : any};
    };
  };
}

const DescriptionCell: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id , name , countyDescription },
    },
  },

}) => {

  return <span>{stringShorter(countyDescription, 40)}</span>;
};

export { DescriptionCell };
