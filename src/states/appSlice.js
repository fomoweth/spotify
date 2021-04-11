import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null,
    device_id: null,

    user_playlists: [],
    recent_items: [],
    following_artists: [],
    saved_albums: [],
    saved_tracks: [],
    new_releases: [],

    currently_playing_playlist: [],
    shuffle_state: false,
    repeat_state: "",
    playing_state: false,
    currently_playing: [],

    current_playlist: [],
    current_playlist_tracks: [],
    selected_album: null,
    selected_artists: null,

    playback_state: {
      device_id: null,
      playing_state: false,
      currently_playing: [],
      current_playlist: [],
      shuffle_state: "",
      repeat_state: "",
      volume: 65,
    },
  },
  reducers: {
    SET_USER: (state, action) => {
      state.user = action.payload.user;
    },
    SET_DEVICE_ID: (state, action) => {
      state.device_id = action.payload.device_id;
    },

    SET_RECENT_ITEMS: (state, action) => {
      state.recent_items = action.payload.recent_items;
    },
    SET_USER_PLAYLISTS: (state, action) => {
      state.user_playlists = action.payload.user_playlists;
    },
    SET_SAVED_ALBUMS: (state, action) => {
      state.saved_albums = action.payload.saved_albums;
    },
    SET_SAVED_TRACKS: (state, action) => {
      state.saved_tracks = action.payload.saved_tracks;
    },
    SET_FOLLOWING_ARTISTS: (state, action) => {
      state.following_artists = action.payload.following_artists;
    },
    SET_NEW_RELEASES: (state, action) => {
      state.new_releases = action.payload.new_releases;
    },

    SET_CURRENTLY_PLAYING_PLAYLIST: (state, action) => {
      state.currently_playing_playlist =
        action.payload.currently_playing_playlist;
    },
    SET_CURRENTLY_PLAYING: (state, action) => {
      state.currently_playing = action.payload.currently_playing;
    },
    SET_PLAYING_STATE: (state, action) => {
      state.playing_state = action.payload.playing_state;
    },
    SET_SHUFFLE_STATE: (state, action) => {
      state.shuffle_state = action.payload.shuffle_state;
    },
    SET_REPEAT_STATE: (state, action) => {
      state.repeat_state = action.payload.repeat_state;
    },

    SET_CURRENT_PLAYLIST: (state, action) => {
      state.current_playlist = action.payload.current_playlist;
    },
    SET_CURRENT_PLAYLIST_TRACKS: (state, action) => {
      state.current_playlist_tracks = action.payload.current_playlist_tracks;
    },
    SET_SELECTED_ALBUM: (state, action) => {
      state.selected_album = action.payload.selected_album;
    },
    SET_SELECTED_ARTISTS: (state, action) => {
      state.selected_artists = action.payload.selected_artists;
    },

    SET_PLAYBACK_STATE: (state, action) => {
      state.playback_state = action.payload.playback_state;
    },
  },
});

export const {
  SET_USER,
  SET_DEVICE_ID,

  SET_RECENT_ITEMS,
  SET_USER_PLAYLISTS,
  SET_SAVED_ALBUMS,
  SET_SAVED_TRACKS,
  SET_FOLLOWING_ARTISTS,
  SET_NEW_RELEASES,

  SET_CURRENTLY_PLAYING_PLAYLIST,
  SET_CURRENTLY_PLAYING,
  SET_PLAYING_STATE,
  SET_SHUFFLE_STATE,
  SET_REPEAT_STATE,

  SET_CURRENT_PLAYLIST,
  SET_CURRENT_PLAYLIST_TRACKS,
  SET_SELECTED_ALBUM,
  SET_SELECTED_ARTISTS,

  SET_PLAYBACK_STATE,
} = appSlice.actions;

export const GET_USER = (state) => state.app.user;
export const GET_DEVICE_ID = (state) => state.app.device_id;

export const GET_RECENT_ITEMS = (state) => state.app.recent_items;
export const GET_USER_PLAYLISTS = (state) => state.app.user_playlists;
export const GET_FOLLOWING_ARTISTS = (state) => state.app.following_artists;
export const GET_SAVED_ALBUMS = (state) => state.app.saved_albums;
export const GET_SAVED_TRACKS = (state) => state.app.saved_tracks;
export const GET_NEW_RELEASES = (state) => state.app.new_releases;

export const GET_CURRENTLY_PLAYING_PLAYLIST = (state) =>
  state.app.currently_playing_playlist;
export const GET_CURRENTLY_PLAYING = (state) => state.app.currently_playing;
export const GET_PLAYING_STATE = (state) => state.app.playing_state;
export const GET_SHUFFLE_STATE = (state) => state.app.shuffle_state;
export const GET_REPEAT_STATE = (state) => state.app.repeat_state;

export const GET_CURRENT_PLAYLIST = (state) => state.app.current_playlist;
export const GET_CURRENT_PLAYLIST_TRACKS = (state) =>
  state.app.current_playlist_tracks;
export const GET_SELECTED_ALBUM = (state) => state.app.selected_album;
export const GET_SELECTED_ARTISTS = (state) => state.app.selected_artists;

export const GET_PLAYBACK_STATE = (state) => state.app.playback_state;

export default appSlice.reducer;
