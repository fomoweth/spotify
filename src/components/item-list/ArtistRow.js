import React from "react";

import styled from "styled-components";
import ArtistCard from "../../styles/ArtistCard";

const ArtistRow = ({ items }) => {
  return (
    <ArtistContainer>
      <h2>Following</h2>
      <ArtistWrapper>
        {items &&
          items.map((item, idx) => (
            <ArtistCard
              key={idx}
              id={item.id}
              imgUrl={item.images[2].url}
              artistName={item.name}
              artistType={item.type}
            />
          ))}
      </ArtistWrapper>
    </ArtistContainer>
  );
};

const ArtistContainer = styled.div`
  > h2 {
    color: #fff;
  }
`;

const ArtistWrapper = styled.div`
  /* border: 1px solid red; */

  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;

  &:hover {
    transition: transform 450ms;
  }
`;

export default ArtistRow;
