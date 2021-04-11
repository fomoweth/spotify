import React from "react";
import { useSelector } from "react-redux";
import {
  GET_NEW_RELEASES,
  GET_RECENT_ITEMS,
  GET_USER_PLAYLISTS,
} from "../../states/appSlice";

import styled from "styled-components";

import NewReleaseRow from "../../components/item-list/NewReleaseRow";
import LoadingContainer from "../base/LoadingContainer";
import RecentItemsRow from "../../components/item-list/RecentItemsRow";
import PlaylistRow from "../../components/item-list/Playlist";
import { MusicNote } from "@material-ui/icons";
import { Link } from "react-router-dom";

const Home = () => {
  const recentItems = useSelector(GET_RECENT_ITEMS);
  const newReleases = useSelector(GET_NEW_RELEASES);
  const user_playlists = useSelector(GET_USER_PLAYLISTS);

  return (
    <HomeContainer>
      <h1>
        Let's Start Listening <MusicNote />
      </h1>
      <h3>
        - Check out{" "}
        <Link to="/about" className="link">
          About Page
        </Link>{" "}
        before use.
      </h3>
      {newReleases && recentItems && user_playlists ? (
        <HomeWrapper>
          <PlaylistWrapper>
            <PlaylistRow items={user_playlists} />
          </PlaylistWrapper>
          <RecentItemsWrapper>
            <RecentItemsRow items={recentItems} />
          </RecentItemsWrapper>
          <NewReleaseWrapper>
            <NewReleaseRow items={newReleases} />
          </NewReleaseWrapper>
        </HomeWrapper>
      ) : (
        <LoadingContainer />
      )}
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  /* border: 1px solid red; */

  flex: 0.8;
  display: flex;
  flex-direction: column;
  overflow: auto;

  > h1 {
    color: #fff;
    font-size: 3rem;
    margin-bottom: 0;
  }

  > h3 {
    color: #fff;
  }

  .MuiSvgIcon-root {
    font-size: 3rem;
    color: #1ed15e;
  }

  .link {
    color: #1f66f2;
    text-decoration: none;

    &:hover {
      color: #3096e8;
    }
  }
`;

const HomeWrapper = styled.div`
  /* overflow: auto; */
`;

const PlaylistWrapper = styled.div``;

const RecentItemsWrapper = styled.div``;

const NewReleaseWrapper = styled.div``;

export default Home;
