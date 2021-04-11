import React from "react";

import styled from "styled-components";
import ItemCard from "../../styles/ItemCard";

const AlbumRow = ({ items, title }) => {
  return (
    <AlbumContainer>
      <h2>{title}</h2>
      <AlbumWrapper>
        {items.map((item, idx) => (
          <ItemCard
            key={idx}
            id={item.id}
            imgUrl={item.images[1].url}
            coverName={item.name}
            title={item.name}
            info={item.artists[0].name}
            type={item.type}
            date={item.release_date}
          />
        ))}
      </AlbumWrapper>
    </AlbumContainer>
  );
};

const AlbumContainer = styled.div`
  > h2 {
    color: #fff;
  }
`;

const AlbumWrapper = styled.div`
  /* border: 1px solid red; */

  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;

  &:hover {
    transition: transform 450ms;
  }
`;

export default AlbumRow;
