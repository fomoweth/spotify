import React from "react";

import { useSelector } from "react-redux";
import { GET_USER } from "../../states/appSlice";

import styled from "styled-components";
import LongItemCard from "../../styles/LongItemCard";

const PlaylistRow = ({ items }) => {
  const user = useSelector(GET_USER);

  return (
    <PlaylistContainer>
      <h2>{user?.display_name}'s Playlists</h2>
      <PlaylistWrapper>
        {items &&
          items.map((item, idx) => (
            <LongItemCard
              key={idx}
              id={item.id}
              imgUrl={item.images[0]?.url}
              playlistName={item.name}
            />
          ))}
      </PlaylistWrapper>
    </PlaylistContainer>
  );
};

const PlaylistContainer = styled.div`
  > h2 {
    color: #fff;
  }
`;

const PlaylistWrapper = styled.div`
  /* border: 1px solid red; */

  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;

  &:hover {
    transition: transform 450ms;
  }
`;

export default PlaylistRow;
