import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  GET_DEVICE_ID,
  GET_PLAYING_STATE,
  SET_PLAYING_STATE,
  SET_CURRENTLY_PLAYING,
  GET_CURRENTLY_PLAYING_PLAYLIST,
  SET_CURRENTLY_PLAYING_PLAYLIST,
  GET_USER,
  SET_USER_PLAYLISTS,
} from "../../states/appSlice";

import SpotifyWebApi from "spotify-web-api-js";
import { client_id } from "../../utils/";

import {
  MiniPlayerContainer,
  MiniPlayerLeft,
  MiniPlayerRight,
} from "../../styles/MiniPlayerStyles";
import {
  PauseCircleOutline,
  PlayCircleOutline,
  Favorite,
  FavoriteBorder,
} from "@material-ui/icons";
import MenuDropdown from "../../styles/MenuDropdown";

const spotify = new SpotifyWebApi(client_id);

const MiniPlayerPlaylist = ({ playlist, savedTracks }) => {
  const dispatch = useDispatch();

  const user = useSelector(GET_USER);

  const device_id = useSelector(GET_DEVICE_ID);

  const currentlyPlayingPlaylist = useSelector(GET_CURRENTLY_PLAYING_PLAYLIST);
  const playingState = useSelector(GET_PLAYING_STATE);

  const [isFollowing, setIsFollowing] = useState();

  useEffect(() => {
    if (playlist) {
      spotify.areFollowingPlaylist(playlist.id, [user?.id]).then((res) => {
        setIsFollowing(res[0]);
      });
    }
  }, [playlist, isFollowing]);

  const handlePlayPlaylist = async () => {
    if (!playingState) {
      await spotify.play({ device_id, context_uri: playlist.uri }).then(() => {
        spotify
          .getMyCurrentPlayingTrack()
          .then((current_track) => {
            dispatch(
              SET_CURRENTLY_PLAYING({
                currently_playing: current_track.item,
              })
            );
          })
          .then(() => {
            dispatch(
              SET_CURRENTLY_PLAYING_PLAYLIST({
                currently_playing_playlist: playlist,
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
      });
    } else {
      await spotify.pause({ device_id }).then(() => {
        dispatch(
          SET_PLAYING_STATE({
            playing_state: false,
          })
        );
      });
    }
  };

  const handlePlaySavedTracks = async () => {
    if (!playingState) {
      await spotify
        .play({ device_id, uris: savedTracks })
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
            SET_CURRENTLY_PLAYING_PLAYLIST({
              currently_playing_playlist: playlist,
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
      await spotify.pause({ device_id }).then(() => {
        dispatch(
          SET_PLAYING_STATE({
            playing_state: false,
          })
        );
      });
    }
  };

  const handleFollowing = async () => {
    if (isFollowing) {
      await spotify
        .unfollowPlaylist(playlist.id)
        .then((res) => {
          setIsFollowing(res[0]);
        })
        .then(() => {
          spotify.getUserPlaylists().then((playlists) => {
            dispatch(
              SET_USER_PLAYLISTS({
                user_playlists: playlists.items,
              })
            );
          });
        });
    } else {
      await spotify
        .followPlaylist(playlist.id)
        .then((res) => {
          setIsFollowing(res[0]);
        })
        .then(() => {
          spotify.getUserPlaylists().then((playlists) => {
            dispatch(
              SET_USER_PLAYLISTS({
                user_playlists: playlists.items,
              })
            );
          });
        });
    }
  };

  return (
    <>
      {playlist ? (
        <MiniPlayerContainer>
          <MiniPlayerLeft>
            {playingState &&
            currentlyPlayingPlaylist &&
            currentlyPlayingPlaylist.uri === playlist.uri ? (
              <PauseCircleOutline
                className="active"
                onClick={handlePlayPlaylist}
              />
            ) : (
              <PlayCircleOutline
                className="active"
                onClick={handlePlayPlaylist}
              />
            )}

            {isFollowing ? (
              <Favorite className="active favorite" onClick={handleFollowing} />
            ) : (
              <FavoriteBorder
                className="active favorite"
                onClick={handleFollowing}
              />
            )}
            <MenuDropdown className="dropdown_menu" type="player" />
          </MiniPlayerLeft>
          <MiniPlayerRight></MiniPlayerRight>
        </MiniPlayerContainer>
      ) : (
        <MiniPlayerContainer>
          <MiniPlayerLeft>
            {playingState ? (
              <PauseCircleOutline
                className="active"
                onClick={handlePlaySavedTracks}
              />
            ) : (
              <PlayCircleOutline
                className="active"
                onClick={handlePlaySavedTracks}
              />
            )}
            <MenuDropdown className="dropdown_menu" type="player" />
          </MiniPlayerLeft>
          <MiniPlayerRight></MiniPlayerRight>
        </MiniPlayerContainer>
      )}
    </>
  );
};

export default MiniPlayerPlaylist;
