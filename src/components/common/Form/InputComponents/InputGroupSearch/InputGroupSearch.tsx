import React, { FC } from "react";
import { Search } from "react-feather";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  Spinner,
} from "reactstrap";
import { InpuLable } from "../InputLable/InputLable";

interface IPropTypes {
  value: string;
  handleChange: any;
  loading?: boolean;
  placeholder: string;
  name: string;
  significant?: boolean;
  lableText: string;
  onSearch?: () => void;
}

const InputGroupSearch: FC<IPropTypes> = ({
  value,
  handleChange,
  loading,
  placeholder,
  name,
  significant,
  lableText,
  onSearch,
}) => {
  return (
    <>
      <InpuLable
        significant={significant ? significant : false}
        lableText={lableText}
      />
      <InputGroup>
        <Input
          value={value}
          placeholder={placeholder}
          type="text"
          name={name}
          onChange={handleChange}
        />
        <InputGroupAddon dir="ltr" addonType="append">
          <Button color="primary" onClick={onSearch}>
            {loading ? (
              <Spinner
                style={{
                  padding: "0 !important",
                  margin: "0 !important",
                }}
                color="white"
                size="sm"
              />
            ) : (
              <Search size={15} />
            )}
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </>
  );
};

export { InputGroupSearch };
