import React from "react";

import { useHistory } from "react-router";

import styled from "styled-components";

import { truncate } from "../../utils";

const LongItemCard = ({ id, imgUrl, playlistName }) => {
  const history = useHistory();

  return (
    <LongItemCardContainer onClick={() => history.push(`/playlist/${id}`)}>
      <img src={`${imgUrl}`} alt={`${playlistName} Cover Photo`} />
      <LongItemText>
        <h3>{truncate(playlistName, 20)}</h3>
      </LongItemText>
    </LongItemCardContainer>
  );
};

const LongItemCardContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 15px;
  min-width: 280px;
  cursor: pointer;
  background-color: #2a2a2a;

  > img {
    object-fit: contain;
    height: 64px;
    width: 64px;
  }

  &:hover {
    transform: scale(1.08);
    background-color: #282828;
  }
`;

const LongItemText = styled.div`
  margin: 10px;
  margin-left: 15px;

  > h3 {
    color: #fff;
    margin: 0;
  }

  > p {
    color: gray;
    margin: 0;
    margin-top: 5px;
  }

  > span {
    color: gray;
    font-size: 0.75rem;
  }
`;

export default LongItemCard;
