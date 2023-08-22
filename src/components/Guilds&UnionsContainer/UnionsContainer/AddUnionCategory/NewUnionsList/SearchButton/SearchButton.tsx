import React, { FC } from "react";
import { Button, FormGroup, Input } from "reactstrap";
import { Search } from "react-feather";

interface IPropTypes {
  setInput: (value: any) => void;
  onSearch: () => void;
  inputPlaceHolder: string;
}

const SearchButton: FC<IPropTypes> = ({
  setInput,
  onSearch,
  inputPlaceHolder,
}) => {
  return (
    <div className="d-flex flex-wrap justify-content-left">
      <div className="position-relative has-icon-left mb-1">
        <Input
          placeholder={inputPlaceHolder}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="form-control-position">
          <Search size="15" />
        </div>
      </div>

      <FormGroup>
        <Button
          onClick={onSearch}
          color="primary"
          style={{ marginRight: "10px" }}
        >
          جستوجو
        </Button>
      </FormGroup>
    </div>
  );
};

export { SearchButton };
