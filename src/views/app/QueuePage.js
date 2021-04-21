import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  GET_CURRENTLY_PLAYING_PLAYLIST,
  GET_CURRENTLY_PLAYING,
  GET_PLAYBACK_STATE,
  SET_CURRENTLY_PLAYING,
  SET_SELECTED_ARTISTS,
  SET_SELECTED_ALBUM,
} from "../../states/appSlice";

import { useHistory } from "react-router";

import SpotifyWebApi from "spotify-web-api-js";
import { client_id, convertMsToMin } from "../../utils";

import styled from "styled-components";
import {
  SongRowContainer,
  SongRowLeft,
  SongRowRight,
  TrackNumber,
  TrackCover,
  TrackInfo,
  AlbumTitle,
  TrackTime,
  Liked,
  Option,
  SongRowWrapper,
  SongRowRightTail,
} from "../../components/SongRow/SongRowElements";
import SongRow from "../../components/ItemList/SongRow";
import LoadingContainer from "../base/LoadingContainer";
import MenuDropdown from "../../components/MenuDropdown/MenuDropdown";

import { Favorite, FavoriteBorder, SlowMotionVideo } from "@material-ui/icons";

const spotify = new SpotifyWebApi(client_id);

const QueuePage = () => {
  const history = useHistory();

  const playlist = useSelector(GET_CURRENTLY_PLAYING_PLAYLIST);
  const currentlyPlaying = useSelector(GET_CURRENTLY_PLAYING);

  const [isFollowing, setIsFollowing] = useState();

  const [restList, setRestList] = useState([]);

  useEffect(() => {
    const restList = playlist?.tracks?.items?.filter(
      (item) => item.track?.id !== currentlyPlaying?.id
    );

    setRestList(restList);
  }, [currentlyPlaying]);

  useEffect(() => {
    spotify.containsMySavedTracks([currentlyPlaying.id]).then((res) => {
      setIsFollowing(res[0]);
    });
  }, [isFollowing]);

  const handleFollowing = async () => {
    if (isFollowing) {
      await spotify
        .removeFromMySavedTracks([currentlyPlaying.id])
        .then((res) => {
          setIsFollowing(res[0]);
        });
    } else {
      await spotify.addToMySavedTracks([currentlyPlaying.id]).then((res) => {
        setIsFollowing(res[0]);
      });
    }
  };

  return (
    <QueuePageContainer>
      {currentlyPlaying ? (
        <>
          <h1>Queue</h1>
          <h2>Now Playing</h2>
          <SongRowContainer>
            <SongRowWrapper>
              <SongRowLeft>
                <TrackNumber>
                  <SlowMotionVideo className="active" />
                </TrackNumber>

                <TrackCover
                  onClick={() =>
                    history.push(`/album/${currentlyPlaying?.album?.id}`)
                  }
                >
                  <img
                    src={currentlyPlaying?.album?.images?.[2].url}
                    alt={`${currentlyPlaying?.album?.name} cover`}
                  />
                </TrackCover>

                <TrackInfo>
                  <h3 className="active">{currentlyPlaying?.name}</h3>
                  <p
                    onClick={() =>
                      history.push(
                        `/artist/${currentlyPlaying?.artists?.[0].id}`
                      )
                    }
                  >
                    {currentlyPlaying?.artists
                      ?.map((artist) => artist.name)
                      .join(", ")}
                  </p>
                </TrackInfo>
              </SongRowLeft>

              <SongRowRight>
                <AlbumTitle
                  onClick={() =>
                    history.push(`/album/${currentlyPlaying?.album?.id}`)
                  }
                >
                  <p>{currentlyPlaying?.album?.name}</p>
                </AlbumTitle>
                <SongRowRightTail>
                  <Liked>
                    {isFollowing ? (
                      <Favorite onClick={handleFollowing} />
                    ) : (
                      <FavoriteBorder onClick={handleFollowing} />
                    )}
                  </Liked>
                  <TrackTime>
                    <p>{convertMsToMin(currentlyPlaying?.duration_ms)}</p>
                  </TrackTime>
                  <Option>
                    <MenuDropdown
                      artistId={currentlyPlaying?.artists?.[0].uri}
                      albumId={currentlyPlaying?.album?.uri}
                      uri={currentlyPlaying?.uri}
                      type="tracks"
                    />
                  </Option>
                </SongRowRightTail>
              </SongRowRight>
            </SongRowWrapper>
          </SongRowContainer>

          <h2>Next from: {playlist?.name}</h2>

          {restList?.map((item, idx) => (
            <SongRow
              key={idx}
              idx={idx + 1}
              track={item.track}
              type="playlist"
            />
          ))}
        </>
      ) : (
        <LoadingContainer />
      )}
    </QueuePageContainer>
  );
};

const QueuePageContainer = styled.div`
  flex: 0.8;
  display: flex;
  flex-direction: column;
  max-width: 80vw;
  overflow: auto;
  color: #fff;

  .active {
    color: #1ed15e !important;
  }

  > h2 {
    color: gray;
  }
`;

export default QueuePage;
