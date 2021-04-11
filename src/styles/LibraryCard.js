import React from "react";

import styled from "styled-components";

const LibraryCard = ({ title, type, count }) => {
  return (
    <LibraryCardCard>
      <LibraryCardCardWrapper></LibraryCardCardWrapper>
      <LibraryCardCardWrapper>
        <LibraryCardCardText>
          <h1>{title}</h1>
          <p>
            {count} liked {type}
          </p>
        </LibraryCardCardText>
      </LibraryCardCardWrapper>
    </LibraryCardCard>
  );
};

const LibraryCardCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #432f87;
  width: 400px;
  height: 250px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    transform: scale(1.08);
    background-color: #513aa3;
  }
`;

const LibraryCardCardWrapper = styled.div`
  /* border: 1px solid red; */

  display: flex;
  flex-direction: column;
  height: 50%;
`;

const LibraryCardCardText = styled.div`
  display: flex;
  flex-direction: column;

  color: #fff;

  margin: 2rem;
  margin-top: auto;

  > h1 {
    margin: 0;
  }

  > p {
    margin: 0;
    margin-top: 0.5rem;
  }
`;

export default LibraryCard;
