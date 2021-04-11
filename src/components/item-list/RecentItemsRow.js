import React from "react";

import styled from "styled-components";
import ItemCard from "../../styles/ItemCard";

const RecentItemsRow = ({ items }) => {
  return (
    <RecentItemsContainer>
      <h2>Recently Played</h2>
      <RecentItemsWrapper>
        {items &&
          items.map((item, idx) => (
            <ItemCard
              key={idx}
              track={item.track}
              id={item.id}
              imgUrl={item.track.album.images[1].url}
              coverName={item.track.album.name}
              title={item.track.name}
              artists={item.track.artists}
              type="track"
            />
          ))}
      </RecentItemsWrapper>
    </RecentItemsContainer>
  );
};

const RecentItemsContainer = styled.div`
  > h2 {
    color: #fff;
  }
`;

const RecentItemsWrapper = styled.div`
  /* border: 1px solid red; */

  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;

  &:hover {
    transition: transform 450ms;
  }
`;

export default RecentItemsRow;
