import React from "react";

import { useHistory } from "react-router";

import styled from "styled-components";

import { truncate, capitalize } from "../utils";

const ArtistCard = ({ id, imgUrl, artistName, artistType }) => {
  const history = useHistory();

  return (
    <ArtistCardContainer onClick={() => history.push(`/artist/${id}`)}>
      <img src={`${imgUrl}`} alt={`${artistName} Photo`} />
      <ArtistCardText>
        <h3>{truncate(artistName, 15)}</h3>
        <p>{capitalize(artistType)}</p>
      </ArtistCardText>
    </ArtistCardContainer>
  );
};

const ArtistCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  padding: 15px;
  cursor: pointer;
  background-color: #191919;

  > img {
    object-fit: contain;
    height: 150px;
    width: 150px;
    border-radius: 999px;
  }

  &:hover {
    transform: scale(1.08);
    background-color: #282828;
  }
`;

const ArtistCardText = styled.div`
  margin: 10px;

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

export default ArtistCard;
