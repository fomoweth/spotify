import React from "react";

import { useHistory } from "react-router";

import styled from "styled-components";

const SideBarOption = ({ id, pageName, Icon, title }) => {
  const history = useHistory();

  return (
    <SideBarOptionContainer
      onClick={
        id
          ? () => history.push(`/playlist/${id}`)
          : pageName === "home"
          ? () => history.push("/")
          : () => history.push(`/${pageName}`)
      }
    >
      {Icon && <Icon className="sideBarOption_icon" />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </SideBarOptionContainer>
  );
};

const SideBarOptionContainer = styled.div`
  /* border: 1px solid red; */

  display: flex;
  align-items: center;
  color: gray;
  height: 4rem;
  cursor: pointer;
  transition: 200ms color ease-in;

  &:hover {
    color: #fff;
  }

  .sideBarOption_icon {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  > p {
    margin-top: 0.5rem;
    margin-left: 1rem;
    font-size: 1rem;
  }

  @media screen and (max-width: 1050px) {
    margin-right: 0;
    max-width: 200px;
  }
`;

export default SideBarOption;
