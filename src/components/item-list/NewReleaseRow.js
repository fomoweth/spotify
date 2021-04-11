import React from "react";

import styled from "styled-components";
import ItemCard from "../../styles/ItemCard";

const NewReleaseRow = ({ items }) => {
  return (
    <NewReleaseContainer>
      <h2>New Releases</h2>
      <NewReleaseWrapper>
        {items &&
          items.map((item, idx) => (
            <ItemCard
              key={idx}
              item={item}
              id={item.id}
              imgUrl={item.images[2]?.url}
              coverName={item.name}
              title={item.name}
              artists={item.artists}
              date={item.release_date}
              type="album"
            />
          ))}
      </NewReleaseWrapper>
    </NewReleaseContainer>
  );
};

const NewReleaseContainer = styled.div`
  > h2 {
    color: #fff;
  }
`;

const NewReleaseWrapper = styled.div`
  /* border: 1px solid red; */

  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;

  &:hover {
    transition: transform 450ms;
  }
`;

export default NewReleaseRow;
