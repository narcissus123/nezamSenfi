import React, { useState } from "react";
import { Edit, FileMinus } from "react-feather";
import { Button } from "reactstrap";



interface IPropTypes {
  cell: {
    row: {
      values: { id: number ; usersIds: any };
      original : any
    };
  };
  setTableData : any
  setInitialValues : any
  setIsInEditMode : any,
  setEditRowID : any,
}

const UsersCell: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id , usersIds}, 
      original
    },
  },
  setTableData,
  setInitialValues,
  setIsInEditMode,
  setEditRowID
  
}) => {

  let fullName = ""

  usersIds.forEach((row:any)=>{
    fullName += row.fullName + ","
  })

  return <>{fullName}</>;
};

export { UsersCell };
