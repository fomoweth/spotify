import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  GET_SELECTED_ARTISTS,
  SET_SELECTED_ARTISTS,
  SET_FOLLOWING_ARTISTS,
} from "../../states/appSlice";

import { useParams } from "react-router";

import SpotifyWebApi from "spotify-web-api-js";

import styled from "styled-components";
import {
  SongRowHeader,
  SongRowLeft,
  SongRowRight,
  TrackNumber,
  TrackInfo,
  AlbumTitle,
  TrackTime,
} from "../SongRow/SongRowElements";
import { AccessTime, Favorite, FavoriteBorder } from "@material-ui/icons";

import { capitalize } from "../../utils";

import LoadingContainer from "../../views/base/LoadingContainer";
import AlbumRow from "../ItemList/AlbumRow";
import SongRow from "../ItemList/SongRow";

const spotify = new SpotifyWebApi();

const ArtistDetail = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const selectedArtist = useSelector(GET_SELECTED_ARTISTS);

  const [topTracks, setTopTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [singles, setSingles] = useState([]);

  const [isFollowing, setIsFollowing] = useState();

  useEffect(() => {
    spotify
      .getArtist(id)
      .then((artist) => {
        dispatch(
          SET_SELECTED_ARTISTS({
            selected_artists: artist,
          })
        );
      })
      .then(() => {
        spotify
          .getArtistTopTracks(id, "US")
          .then((tracks) => {
            setTopTracks(tracks.tracks);
          })
          .then(() => {
            spotify
              .getArtistAlbums(id, { include_groups: "album" })
              .then((albums) => {
                setAlbums(albums.items);
              });
          })
          .then(() => {
            spotify
              .getArtistAlbums(id, { include_groups: "single" })
              .then((singles) => {
                setSingles(singles.items);
              });
          })
          .then(() => {
            spotify.isFollowingArtists([id]).then((res) => {
              setIsFollowing(res[0]);
            });
          });
      });
  }, [id, isFollowing]);

  const handleFollowing = async () => {
    if (isFollowing) {
      await spotify
        .unfollowArtists([id])
        .then((res) => {
          setIsFollowing(res[0]);
        })
        .then(() => {
          spotify.getFollowedArtists().then((artists) => {
            dispatch(
              SET_FOLLOWING_ARTISTS({
                following_artists: artists.artists.items,
              })
            );
          });
        });
    } else {
      await spotify
        .followArtists([id])
        .then((res) => {
          setIsFollowing(res[0]);
        })
        .then(() => {
          spotify.getFollowedArtists().then((artists) => {
            dispatch(
              SET_FOLLOWING_ARTISTS({
                following_artists: artists.artists.items,
              })
            );
          });
        });
    }
  };

  return (
    <ArtistDetailContainer>
      {selectedArtist && topTracks && albums && singles ? (
        <>
          <ArtistDetailWrapper>
            <img
              src={`${selectedArtist.images[1].url}`}
              alt={`${selectedArtist.name} Photo`}
            />
            <ArtistDetailInfo>
              <strong>ARTIST</strong>
              <h1>
                {selectedArtist.name}
                {isFollowing ? (
                  <Favorite className="active" onClick={handleFollowing} />
                ) : (
                  <FavoriteBorder
                    className="active"
                    onClick={handleFollowing}
                  />
                )}
              </h1>
              <ArtistDetailText>
                <p>
                  {selectedArtist.genres
                    .map((genre) => capitalize(genre))
                    .join(", ")}
                </p>
                <p>
                  {selectedArtist.followers.total.toLocaleString()} followers
                </p>
              </ArtistDetailText>
            </ArtistDetailInfo>
          </ArtistDetailWrapper>

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
                <TrackTime>
                  <AccessTime className="trackTime_icon" />
                </TrackTime>
              </SongRowRight>
            </SongRowHeader>
            <SongRowWrapper>
              {topTracks.map((item, idx) => (
                <SongRow key={idx} idx={idx} track={item} type="playlist" />
              ))}
            </SongRowWrapper>
          </SongRowContainer>

          <AlbumRowContainer>
            <AlbumRow items={albums} title="Albums" />
          </AlbumRowContainer>

          <SingleRowContainer>
            <AlbumRow items={singles} title="Singles" />
          </SingleRowContainer>
        </>
      ) : (
        <LoadingContainer />
      )}
    </ArtistDetailContainer>
  );
};

const ArtistDetailContainer = styled.div`
  /* border: 1px solid red; */

  flex: 0.8;
  display: flex;
  flex-direction: column;
  color: #fff;
  margin-bottom: 8rem;
`;

const ArtistDetailWrapper = styled.div`
  /* border: 1px solid red; */

  display: flex;
  width: 100%;

  > img {
    object-fit: contain;
    width: 320px;
    height: 320px;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: 50px;
    border-radius: 999px;
  }
`;

const ArtistDetailInfo = styled.div`
  /* border: 1px solid red; */

  display: flex;
  flex-direction: column;
  justify-content: center;

  color: #fff;
  width: 100%;
  margin-left: 30px;

  > strong {
    margin-bottom: 0;
    font-size: 2rem;
  }

  > h1 {
    font-size: 5rem;
    margin: 10px;

    > .MuiSvgIcon-root {
      font-size: 4rem;
      margin-left: 10px;
    }
  }

  .active {
    color: #1ed15e;
  }
`;

const ArtistDetailText = styled.div`
  display: flex;
  flex-direction: column;
  color: gray;
`;

const AlbumRowContainer = styled.div``;

const SingleRowContainer = styled.div``;

const SongRowContainer = styled.div`
  max-height: 20rem;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const SongRowWrapper = styled.div``;

export default ArtistDetail;
