import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import styled from "styled-components";
import {
  SongRowHeader,
  SongRowLeft,
  SongRowRight,
  TrackNumber,
  TrackInfo,
  AlbumTitle,
  TrackTime,
} from "../../styles/SongRowStyles";
import { AccessTime } from "@material-ui/icons";

import SongRow from "../../components/item-list/SongRow";
import { GET_RECENT_ITEMS, GET_FOLLOWING_ARTISTS } from "../../states/appSlice";
import LoadingContainer from "../base/LoadingContainer";
import RecentItemsRow from "../../components/ItemList/RecentItemsRow";
import ArtistRow from "../../components/ItemList/ArtistRow";

import SpotifyWebApi from "spotify-web-api-js";
import { client_id } from "../../utils/";

const spotify = new SpotifyWebApi(client_id);

const SearchPage = ({ search }) => {
  const recentItems = useSelector(GET_RECENT_ITEMS);
  const followingArtists = useSelector(GET_FOLLOWING_ARTISTS);

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!search) return setSearchResults([]);

    spotify.searchTracks(search).then((res) => {
      setSearchResults(res.tracks.items);
    });
  }, [search]);

  return (
    <SearchPageContainer>
      {searchResults.length > 0 ? (
        <SearchPageWrapper>
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
            {searchResults.map((track, idx) => (
              <SongRow key={idx} idx={idx} track={track} type="playlist" />
            ))}
          </SongRowWrapper>
        </SearchPageWrapper>
      ) : (
        <>
          {recentItems ? (
            <>
              <RecentItemsWrapper>
                <RecentItemsRow items={recentItems} />
              </RecentItemsWrapper>

              <ArtistsWrapper>
                <ArtistRow items={followingArtists} />
              </ArtistsWrapper>
            </>
          ) : (
            <LoadingContainer />
          )}
        </>
      )}
    </SearchPageContainer>
  );
};

const SearchPageContainer = styled.div`
  /* border: 1px solid red; */

  flex: 0.8;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const SearchPageWrapper = styled.div`
  /* overflow: auto; */
`;

const RecentItemsWrapper = styled.div``;

const ArtistsWrapper = styled.div``;

const SongRowWrapper = styled.div``;

export default SearchPage;
