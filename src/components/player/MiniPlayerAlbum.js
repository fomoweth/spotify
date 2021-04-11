import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  GET_DEVICE_ID,
  GET_PLAYING_STATE,
  SET_PLAYING_STATE,
  SET_CURRENTLY_PLAYING,
  GET_CURRENTLY_PLAYING_PLAYLIST,
  SET_CURRENTLY_PLAYING_PLAYLIST,
  SET_SAVED_ALBUMS,
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

const MiniPlayerAlbum = ({ playlist, albumId }) => {
  const dispatch = useDispatch();

  const device_id = useSelector(GET_DEVICE_ID);

  const currentlyPlayingPlaylist = useSelector(GET_CURRENTLY_PLAYING_PLAYLIST);
  const playingState = useSelector(GET_PLAYING_STATE);

  const [isFollowing, setIsFollowing] = useState();

  useEffect(() => {
    spotify.containsMySavedAlbums([albumId]).then((res) => {
      setIsFollowing(res[0]);
    });
  }, [isFollowing]);

  const handlePlay = async () => {
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

  const handleFollowing = async () => {
    if (isFollowing) {
      await spotify
        .removeFromMySavedAlbums([albumId])
        .then((res) => {
          setIsFollowing(res[0]);
        })
        .then(() => {
          spotify.getMySavedAlbums().then((albums) => {
            dispatch(
              SET_SAVED_ALBUMS({
                saved_albums: albums.items,
              })
            );
          });
        });
    } else {
      await spotify
        .addToMySavedAlbums([albumId])
        .then((res) => {
          setIsFollowing(res[0]);
        })
        .then(() => {
          spotify.getMySavedAlbums().then((albums) => {
            dispatch(
              SET_SAVED_ALBUMS({
                saved_albums: albums.items,
              })
            );
          });
        });
    }
  };

  return (
    <MiniPlayerContainer>
      <MiniPlayerLeft>
        {playingState &&
        currentlyPlayingPlaylist &&
        currentlyPlayingPlaylist.uri === playlist.uri ? (
          <PauseCircleOutline className="active" onClick={handlePlay} />
        ) : (
          <PlayCircleOutline className="active" onClick={handlePlay} />
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
  );
};

export default MiniPlayerAlbum;
