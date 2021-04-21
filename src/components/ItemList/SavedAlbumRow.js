import React from "react";

import styled from "styled-components";
import ItemCard from "../Cards/ItemCard";

const SavedAlbumRow = ({ items }) => {
  return (
    <AlbumContainer>
      <h2>Liked Albums</h2>
      <AlbumWrapper>
        {items &&
          items.map((item, idx) => (
            <ItemCard
              key={idx}
              id={item.album.id}
              imgUrl={item.album.images[1].url}
              coverName={item.album.name}
              title={item.album.name}
              info={item.album.artists[0].name}
              type={item.album.type}
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

export default SavedAlbumRow;
