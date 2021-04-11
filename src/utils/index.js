export const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

export const capitalize = (s) => {
  if (typeof s !== "string") return "";

  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const convertMsToMin = (ms) => {
  let min = Math.floor((ms / 1000 / 60) << 0);
  let sec = Math.floor((ms / 1000) % 60);

  if (sec < 10) {
    sec = `0${sec}`;
  }

  return `${min}:${sec}`;
};

// Spotify

// End Points
export const AUTHORIZE = "https://accounts.spotify.com/authorize";
export const TOKEN = "https://accounts.spotify.com/api/token";
export const PLAYLISTS = "https://api.spotify.com/v1/me/playlists";
export const DEVICES = "https://api.spotify.com/v1/me/player/devices";
export const PLAY = "https://api.spotify.com/v1/me/player/play";
export const PAUSE = "https://api.spotify.com/v1/me/player/pause";
export const NEXT = "https://api.spotify.com/v1/me/player/next";
export const PREVIOUS = "https://api.spotify.com/v1/me/player/previous";
export const PLAYER = "https://api.spotify.com/v1/me/player";
export const TRACKS = `https://api.spotify.com/v1/playlists/{{PlaylistId}}/tracks`;
export const CURRENTLY_PLAYING =
  "https://api.spotify.com/v1/me/player/currently-playing";
export const SHUFFLE = "https://api.spotify.com/v1/me/player/shuffle";

// Scopes
export const scopes = [
  // Images
  "ugc-image-upload",

  // Listening History
  "user-read-recently-played",
  "user-top-read",
  "user-read-playback-position",

  // Spotify Connect
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",

  // Playback
  "streaming",
  "app-remote-control",

  // Playlists
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-read-collaborative",

  // Follow
  "user-follow-modify",
  "user-follow-read",

  // Library
  "user-library-read",
  "user-library-modify",

  // Users
  "user-read-email",
  "user-read-private",
];

export const client_id = "378e88384c3f4854994cab6a02c8757e";
