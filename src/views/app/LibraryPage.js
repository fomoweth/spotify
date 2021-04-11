import React from "react";

import { useSelector } from "react-redux";
import {
  GET_USER_PLAYLISTS,
  GET_FOLLOWING_ARTISTS,
  GET_SAVED_ALBUMS,
  GET_SAVED_TRACKS,
} from "../../states/appSlice";

import { useHistory } from "react-router";

import styled from "styled-components";
import PlaylistRow from "../../components/item-list/Playlist";
import ArtistRow from "../../components/item-list/ArtistRow";
import SavedAlbumRow from "../../components/item-list/SavedAlbumRow";
import LibraryCard from "../../styles/LibraryCard";
import LoadingContainer from "../base/LoadingContainer";

const LibraryPage = () => {
  const history = useHistory();

  const userPlaylists = useSelector(GET_USER_PLAYLISTS);
  const savedTracks = useSelector(GET_SAVED_TRACKS);
  const followingArtists = useSelector(GET_FOLLOWING_ARTISTS);
  const savedAlbums = useSelector(GET_SAVED_ALBUMS);

  return (
    <LibraryPageContainer>
      {userPlaylists && savedTracks && followingArtists && savedAlbums ? (
        <LibraryPageWrapper>
          <LibraryCardContainer>
            <LibraryCardWrapper
              onClick={() => history.push("/collection/tracks")}
            >
              <LibraryCard
                title="Liked Songs"
                count={savedTracks.length}
                type="songs"
              />
            </LibraryCardWrapper>
          </LibraryCardContainer>

          <PlaylistWrapper>
            <PlaylistRow items={userPlaylists} />
          </PlaylistWrapper>

          <AlbumsWrapper>
            <SavedAlbumRow items={savedAlbums} type="savedAlbums" />
          </AlbumsWrapper>

          <ArtistsWrapper>
            <ArtistRow items={followingArtists} />
          </ArtistsWrapper>
        </LibraryPageWrapper>
      ) : (
        <LoadingContainer />
      )}
    </LibraryPageContainer>
  );
};

const LibraryPageContainer = styled.div`
  flex: 0.8;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const LibraryPageWrapper = styled.div``;

const PlaylistWrapper = styled.div``;

const LibraryCardContainer = styled.div`
  display: flex;
`;

const LibraryCardWrapper = styled.div`
  margin: 2rem;
  margin-top: 1rem;

  &:hover {
    transition: transform 450ms;
  }
`;

const ArtistsWrapper = styled.div``;

const AlbumsWrapper = styled.div``;

export default LibraryPage;
