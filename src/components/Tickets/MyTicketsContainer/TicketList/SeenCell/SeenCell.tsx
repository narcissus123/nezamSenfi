import React from "react";
import {  Eye, EyeOff } from "react-feather";



interface IPropTypes {
  cell: {
    row: {
      values: { id: number; isRead: Boolean };
    };
  };
}

const SeenCell: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id , isRead },
    },
  },
}) => {
  return (
    <div className="d-flex justify-content-center align-content-center">
      {isRead ? (
        <span title="خوانده شده">
          <Eye size={16} color="black" />
        </span>
      ) : (
        <span title="خوانده نشده">
          <EyeOff size={16} color="black" />
        </span>
      )}
    </div>
  );
};

export { SeenCell };
