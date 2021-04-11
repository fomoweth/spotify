import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  GET_USER_PLAYLISTS,
  GET_USER,
  SET_USER_PLAYLISTS,
  SET_USER,
  SET_DEVICE_ID,
  SET_NEW_RELEASES,
  GET_DEVICE_ID,
  SET_RECENT_ITEMS,
  GET_RECENT_ITEMS,
  SET_CURRENTLY_PLAYING,
  SET_FOLLOWING_ARTISTS,
  SET_SAVED_ALBUMS,
  SET_SAVED_TRACKS,
} from "../../states/appSlice";

import axios from "axios";

import SpotifyWebApi from "spotify-web-api-js";

import styled from "styled-components";

import App from "./App";
import Login from "../user/Login";
import LoadingContainer from "./LoadingContainer";

const spotify = new SpotifyWebApi();

const Initialization = () => {
  const dispatch = useDispatch();

  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  const user = useSelector(GET_USER);
  const user_playlists = useSelector(GET_USER_PLAYLISTS);
  const deviceId = useSelector(GET_DEVICE_ID);
  const recentItems = useSelector(GET_RECENT_ITEMS);

  useEffect(() => {
    const params = getHashParams();
    const accessToken = params.access_token;
    const refreshToken = params.refresh_token;
    const expiresIn = params.expires_in;

    if (!accessToken) return;

    spotify.setAccessToken(accessToken);

    spotify.getMe().then((user) => {
      dispatch(
        SET_USER({
          user,
        })
      );
    });

    spotify.getUserPlaylists().then((playlists) => {
      dispatch(
        SET_USER_PLAYLISTS({
          user_playlists: playlists.items,
        })
      );
    });

    spotify
      .getNewReleases({
        country: "US",
      })
      .then((res) => {
        dispatch(
          SET_NEW_RELEASES({
            new_releases: res.albums.items,
          })
        );
      });

    spotify.getMyDevices().then((res) => {
      res.devices.map((device) => {
        if (device.type === "Computer") {
          dispatch(
            SET_DEVICE_ID({
              device_id: device.id,
            })
          );
        }
      });
    });

    spotify
      .getMyRecentlyPlayedTracks()
      .then((res) => {
        dispatch(
          SET_RECENT_ITEMS({
            recent_items: res.items,
          })
        );
        return res.items[0].track;
      })
      .then((recent_item) => {
        dispatch(
          SET_CURRENTLY_PLAYING({
            currently_playing: recent_item,
          })
        );
      });

    spotify.getFollowedArtists().then((artists) => {
      dispatch(
        SET_FOLLOWING_ARTISTS({
          following_artists: artists.artists.items,
        })
      );
    });

    spotify.getMySavedAlbums().then((albums) => {
      dispatch(
        SET_SAVED_ALBUMS({
          saved_albums: albums.items,
        })
      );
    });

    spotify.getMySavedTracks().then((tracks) => {
      dispatch(
        SET_SAVED_TRACKS({
          saved_tracks: tracks.items,
        })
      );
    });

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setExpiresIn(expiresIn);

    window.history.pushState({}, null, "/");
  }, []);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      axios
        .get("https://spotify-backend-ac7a5.web.app/refresh_token", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  const getHashParams = () => {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  };

  const isReady = () => {
    return (
      user !== null &&
      deviceId !== null &&
      user_playlists.length > 0 &&
      recentItems.length > 0
    );
  };

  if (!isReady) {
    return <LoadingContainer />;
  }

  return (
    <Container>
      {accessToken ? <App accessToken={accessToken} /> : <Login />}
    </Container>
  );
};

const Container = styled.div`
  /* border: 1px solid red; */

  height: 100vh;
  min-width: 100vw;
`;

export default Initialization;
