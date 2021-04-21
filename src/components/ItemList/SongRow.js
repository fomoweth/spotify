import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  GET_DEVICE_ID,
  GET_CURRENTLY_PLAYING,
  SET_CURRENTLY_PLAYING,
  SET_PLAYING_STATE,
  SET_SAVED_TRACKS,
} from "../../states/appSlice";

import { useHistory } from "react-router";

import SpotifyWebApi from "spotify-web-api-js";
import { client_id, convertMsToMin } from "../../utils";

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
} from "../SongRow/SongRowElements";
import { Favorite, FavoriteBorder, SlowMotionVideo } from "@material-ui/icons";

import MenuDropdown from "../../styles/MenuDropdown";

const spotify = new SpotifyWebApi(client_id);

const SongRow = ({ idx, track, type }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const device_id = useSelector(GET_DEVICE_ID);
  const currentlyPlaying = useSelector(GET_CURRENTLY_PLAYING);

  const artistId = track.artists?.[0].id;

  const albumId = track.album?.id;

  const trackUri = track.uri;

  const [isFollowing, setIsFollowing] = useState();

  useEffect(() => {
    spotify.containsMySavedTracks([track.id]).then((res) => {
      setIsFollowing(res[0]);
    });
  }, [isFollowing]);

  const handlePlaying = () => {
    spotify
      .play({ device_id, uris: [track.uri] })
      .then(() => {
        spotify.getMyCurrentPlayingTrack().then((current_track) => {
          dispatch(
            SET_CURRENTLY_PLAYING({
              currently_playing: current_track.item,
            })
          );
          return current_track;
        });
      })
      .then(() => {
        dispatch(
          SET_PLAYING_STATE({
            playing_state: true,
          })
        );
      });
  };

  const handleFollowing = () => {
    if (isFollowing) {
      spotify
        .removeFromMySavedTracks([track.id])
        .then((res) => {
          setIsFollowing(res[0]);
        })
        .then(() => {
          spotify.getMySavedTracks().then((tracks) => {
            dispatch(
              SET_SAVED_TRACKS({
                saved_tracks: tracks.items,
              })
            );
          });
        });
    } else {
      spotify
        .addToMySavedTracks([track.id])
        .then((res) => {
          setIsFollowing(res[0]);
        })
        .then(() => {
          spotify.getMySavedTracks().then((tracks) => {
            dispatch(
              SET_SAVED_TRACKS({
                saved_tracks: tracks.items,
              })
            );
          });
        });
    }
  };

  return (
    <SongRowContainer>
      <SongRowWrapper>
        <SongRowLeft>
          <TrackNumber>
            {currentlyPlaying?.id === track.id ? (
              <SlowMotionVideo className="active" />
            ) : (
              <p>{idx + 1}</p>
            )}
          </TrackNumber>
          {type === "album" ? null : (
            <TrackCover onClick={handlePlaying}>
              <img
                src={track.album?.images?.[2].url}
                alt={`${track.album?.name} cover`}
              />
            </TrackCover>
          )}

          <TrackInfo>
            <h3 onClick={handlePlaying}>{track.name}</h3>
            <p onClick={() => history.push(`/artist/${artistId}`)}>
              {track.artists?.map((artist) => artist.name).join(", ")}
            </p>
          </TrackInfo>
        </SongRowLeft>

        <SongRowRight>
          <AlbumTitle onClick={() => history.push(`/album/${albumId}`)}>
            <p>{track.album?.name}</p>
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
              <p>{convertMsToMin(track.duration_ms)}</p>
            </TrackTime>
            <Option>
              <MenuDropdown
                artistId={artistId}
                albumId={albumId}
                uri={trackUri}
                type="tracks"
              />
            </Option>
          </SongRowRightTail>
        </SongRowRight>
      </SongRowWrapper>
    </SongRowContainer>
  );
};

export default SongRow;
