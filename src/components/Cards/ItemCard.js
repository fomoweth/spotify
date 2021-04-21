import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  GET_DEVICE_ID,
  SET_CURRENTLY_PLAYING,
  SET_PLAYING_STATE,
} from "../../states/appSlice";

import { useHistory } from "react-router";

import styled from "styled-components";

import SpotifyWebApi from "spotify-web-api-js";
import { client_id } from "../../utils";
import { truncate } from "../../utils";

const spotify = new SpotifyWebApi(client_id);

const ItemCard = ({
  track,
  id,
  imgUrl,
  coverName,
  title,
  artists,
  info,
  date,
  type,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const device_id = useSelector(GET_DEVICE_ID);

  const handleClick = () => {
    if (type === "track") {
      spotify
        .play({ device_id, uris: [track.uri] })
        .then(() => {
          dispatch(
            SET_CURRENTLY_PLAYING({
              currently_playing: track,
            })
          );
        })
        .then(() => {
          dispatch(
            SET_PLAYING_STATE({
              playing_state: true,
            })
          );
        });
    } else {
      history.push(`/album/${id}`);
    }
  };

  return (
    <ItemCardContainer onClick={handleClick}>
      <img src={`${imgUrl}`} alt={`${coverName} Photo`} />
      <ItemText>
        <h3>{truncate(title, 10)}</h3>
        {artists ? (
          <p>
            {truncate(artists?.map((artist) => artist.name).join(", "), 15)}
          </p>
        ) : (
          <p>{info}</p>
        )}
        {date ? <span>{date}</span> : null}
      </ItemText>
    </ItemCardContainer>
  );
};

const ItemCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 15px;
  cursor: pointer;
  background-color: #191919;

  > img {
    object-fit: contain;
    height: 150px;
    width: 150px;
  }

  &:hover {
    transform: scale(1.08);
    background-color: #282828;
  }
`;

const ItemText = styled.div`
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

export default ItemCard;
