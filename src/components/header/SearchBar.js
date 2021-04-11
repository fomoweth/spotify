import React from "react";

import { Search } from "@material-ui/icons";
import styled from "styled-components";

const SearchBar = ({ ...rest }) => {
  return (
    <SearchBarContainer>
      <Search />
      <input {...rest} />
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.div`
  /* border: 1px solid red; */

  display: flex;
  align-items: center;
  color: gray;
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 2rem;
  min-width: 20rem;

  > input {
    border: none;
    width: 100%;
    margin-left: 0.25rem;
  }

  > input:focus {
    outline-width: 0;
  }

  > input::placeholder {
  }
`;

export default SearchBar;
