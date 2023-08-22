import React, { FC } from "react";
import { Link } from "react-router-dom";

interface IPropTypes {
  cell: {
    row: {
      values: { username: string };
      original: { userId: number };
    };
  };
}

const TransactionUserInfo: FC<IPropTypes> = ({
  cell: {
    row: {
      original: { userId },
      values: { username },
    },
  },
}) => {
  return (
    <Link
      style={{ color: "#626262" }}
      target="_blank"
      to={`/UserList/RealUsersList/${userId}`}
    >
      <p style={{ marginBottom: "0", cursor: "pointer" }}>{username}</p>
    </Link>
  );
};

export { TransactionUserInfo };
