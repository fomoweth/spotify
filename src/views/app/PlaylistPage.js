import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  GET_CURRENT_PLAYLIST,
  SET_CURRENT_PLAYLIST,
  GET_USER,
  GET_SAVED_TRACKS,
  GET_CURRENT_PLAYLIST_TRACKS,
  SET_CURRENT_PLAYLIST_TRACKS,
} from "../../states/appSlice";

import { useParams } from "react-router";

import styled from "styled-components";
import {
  SongRowContainer,
  SongRowLeft,
  SongRowRight,
  TrackNumber,
  TrackInfo,
  AlbumTitle,
  TrackTime,
  Liked,
  Option,
  SongRowRightTail,
  SongRowHeader,
} from "../../styles/SongRowStyles";
import { AccessTime, FiberManualRecord } from "@material-ui/icons";
import SongRow from "../../components/ItemList/SongRow";

import MiniPlayerPlaylist from "../../components/MiniPlayer/MiniPlayerPlaylist";
import LoadingContainer from "../base/LoadingContainer";

import SpotifyWebApi from "spotify-web-api-js";
import { client_id } from "../../utils";

const spotify = new SpotifyWebApi({ client_id });

const PlayListPage = ({ type }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector(GET_USER);
  const playlist = useSelector(GET_CURRENT_PLAYLIST);
  const playlistTracks = useSelector(GET_CURRENT_PLAYLIST_TRACKS);

  const savedTracks = useSelector(GET_SAVED_TRACKS);
  const [savedTracksUri, setSavedTracksUri] = useState([]);

  useEffect(() => {
    spotify.getPlaylist(id).then((playlist) => {
      dispatch(
        SET_CURRENT_PLAYLIST({
          current_playlist: playlist,
        })
      );
    });

    spotify.getPlaylistTracks(id, { limit: 40 }).then((tracks) => {
      dispatch(
        SET_CURRENT_PLAYLIST_TRACKS({
          current_playlist_tracks: tracks,
        })
      );
    });

    console.log(playlistTracks);
  }, [id]);

  useEffect(() => {
    const savedTracksUri = [];
    savedTracks.map((item) => {
      savedTracksUri.push(item.track.uri);
    });

    setSavedTracksUri(savedTracksUri);
  }, [savedTracks]);

  return (
    <PlayListPageContainer>
      {playlist || savedTracks ? (
        <>
          <PlayListPageHeader>
            <PlayListPageHeaderLeft>
              {type === "PLAYLIST" ? (
                <PlayListPageInfo>
                  <img
                    src={playlist?.images?.[0].url}
                    alt={`${playlist?.name} Cover`}
                  />
                  <PlayListPageInfoText>
                    <strong>PLAYLIST</strong>
                    <h2>{playlist?.name}</h2>
                    <PlayListPageDesc>
                      <strong>{playlist?.owner?.display_name}</strong>
                      <FiberManualRecord className="divider_icon" />
                      {playlist?.tracks?.items?.length?.toLocaleString()} songs
                      <FiberManualRecord className="divider_icon" />
                      {playlist?.followers?.total?.toLocaleString()} likes
                    </PlayListPageDesc>
                  </PlayListPageInfoText>
                </PlayListPageInfo>
              ) : (
                <PlayListPageInfo>
                  <PlayListPageInfoText>
                    <strong>{type}</strong>
                    <h2>Liked Songs</h2>
                    <PlayListPageDesc>
                      <strong>{user?.display_name}</strong>
                      <FiberManualRecord className="divider_icon" />
                      {savedTracks?.length?.toLocaleString()} songs
                    </PlayListPageDesc>
                  </PlayListPageInfoText>
                </PlayListPageInfo>
              )}
            </PlayListPageHeaderLeft>
            <PlayListPageHeaderRight></PlayListPageHeaderRight>
          </PlayListPageHeader>

          <PlayerContainer>
            <MiniPlayerPlaylist
              playlist={playlist}
              savedTracks={savedTracksUri}
            />
          </PlayerContainer>

          <PlayListPageBody>
            <SongRowContainer>
              <SongRowHeader>
                <SongRowLeft>
                  <TrackNumber>
                    <h3>#</h3>
                  </TrackNumber>
                  <TrackInfo>
                    <h3>TITLE</h3>
                  </TrackInfo>
                </SongRowLeft>
                <SongRowRight>
                  <AlbumTitle>
                    <h3>ALBUM</h3>
                  </AlbumTitle>
                  <SongRowRightTail>
                    <Liked></Liked>
                    <TrackTime>
                      <AccessTime className="trackTime_icon" />
                    </TrackTime>

                    <Option></Option>
                  </SongRowRightTail>
                </SongRowRight>
              </SongRowHeader>
            </SongRowContainer>
            {type === "PLAYLIST" ? (
              <SongRowWrapper>
                {/* {playlist?.tracks?.items?.map((item, idx) => (
                  <SongRow
                    key={idx}
                    idx={idx}
                    track={item.track}
                    type="playlist"
                  />
                ))} */}
                {playlistTracks?.items?.map((item, idx) => (
                  <SongRow
                    key={idx}
                    idx={idx}
                    track={item.track}
                    type="playlist"
                  />
                ))}
              </SongRowWrapper>
            ) : (
              <SongRowWrapper>
                {savedTracks?.map((item, idx) => (
                  <SongRow
                    key={idx}
                    idx={idx}
                    track={item.track}
                    type="playlist"
                  />
                ))}
              </SongRowWrapper>
            )}
          </PlayListPageBody>
        </>
      ) : (
        <LoadingContainer />
      )}
    </PlayListPageContainer>
  );
};

const PlayListPageContainer = styled.div`
  /* border: 1px solid red; */

  flex: 0.8;
  display: flex;
  flex-direction: column;
  max-width: 80vw;
  overflow: auto;

  @media screen and (max-width: 1050px) {
    max-width: 75vw;
  }
`;

const PlayerContainer = styled.div``;

const PlayListPageHeader = styled.div`
  /* border: 1px solid red; */

  flex: 0.05;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1050px) {
    flex: 0.05;
    display: flex;
    flex-direction: column-reverse;
    padding: 0;
  }
`;

const PlayListPageHeaderLeft = styled.div`
  /* border: 1px solid red; */
`;

const PlayListPageHeaderRight = styled.div`
  /* border: 1px solid red; */

  margin: 0;

  @media screen and (max-width: 1050px) {
    margin: 1rem 2rem auto auto;
  }
`;

const PlayListPageBody = styled.div`
  /* flex: 0.8;
  overflow: auto; */
`;

const PlayListPageInfo = styled.div`
  /* border: 1px solid red; */

  display: flex;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;

  > img {
    height: 300px;
    width: 300px;
    box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
    margin: 0 1rem;
  }
`;

const PlayListPageInfoText = styled.div`
  /* border: 1px solid red; */

  flex: 1;
  margin-left: 1.5rem;

  strong {
    color: #fff;
    font-size: 1rem;
  }

  .MuiSvgIcon-root {
    color: #fff;
    font-size: 0.5rem;
  }

  h2 {
    color: #fff;
    font-size: 5rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #fff;
    font-size: 1rem;
  }

  @media screen and (max-width: 1050px) {
    h2 {
      font-size: 3rem;
      width: 20rem;
    }

    p {
      font-size: 0.3rem;
    }
  }
`;

const PlayListPageDesc = styled.p`
  /* border: 1px solid red; */

  display: flex;
  align-items: center;
  /* justify-content: space-around; */

  .divider_icon {
    margin: 0 0.5rem;
  }

  @media screen and (max-width: 1050px) {
    width: 20rem;
  }
`;

const SongRowWrapper = styled.div``;

export default PlayListPage;
