import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import styled from "styled-components";

import Home from "../app/Home";
import SearchPage from "../app/SearchPage";
import PlaylistPage from "../app/PlaylistPage";
import LibraryPage from "../app/LibraryPage";
import QueuePage from "../app/QueuePage";
import AlbumDetail from "../../components/item-detail/AlbumDetail";
import ArtistDetail from "../../components/item-detail/ArtistDetail";
import Profile from "../user/Profile";
import About from "../app/About";

import MusicPlayer from "../../components/player/MusicPlayer";
import SideBar from "../../components/side-bar/SideBar";
import Header from "../../components/header/Header";
import LoadingContainer from "./LoadingContainer";

const App = ({ accessToken }) => {
  const history = createBrowserHistory();
  const [search, setSearch] = useState("");

  return (
    <Router history={history}>
      <AppContainer>
        {accessToken ? (
          <AppWrapper>
            <SideBarContainer>
              <SideBar />
            </SideBarContainer>
            <DashboardContainer>
              <Header setSearch={setSearch} />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>

                <Route exact path="/search">
                  <SearchPage search={search} />
                </Route>

                <Route exact path="/collection">
                  <LibraryPage />
                </Route>

                <Route exact path="/playlist/:id">
                  <PlaylistPage type="PLAYLIST" />
                </Route>

                <Route exact path="/collection/tracks">
                  <PlaylistPage type="LIKED SONGS" />
                </Route>

                <Route exact path="/album/:id">
                  <AlbumDetail />
                </Route>

                <Route exact path="/artist/:id">
                  <ArtistDetail />
                </Route>

                <Route exact path="/queue">
                  <QueuePage />
                </Route>

                <Route exact path="/profile">
                  <Profile />
                </Route>

                <Route exact path="/about">
                  <About />
                </Route>
              </Switch>
            </DashboardContainer>
            <PlayerContainer>
              <MusicPlayer />
            </PlayerContainer>
          </AppWrapper>
        ) : (
          <LoadingContainer />
        )}
      </AppContainer>
    </Router>
  );
};

const AppContainer = styled.div`
  /* border: 1px solid red; */

  height: 100vh;
  min-width: 100vw;
`;

const AppWrapper = styled.div`
  /* border: 1px solid red; */

  display: flex;
  justify-content: space-between;
  height: 100vh;
  background-color: #131313;
  width: 100vw;
  overflow-y: overlay;

  /* #2A2A2A */
  @media screen and (max-width: 1050px) {
    width: 100vw;
  }
`;

const DashboardContainer = styled.div`
  /* border: 1px solid red; */

  flex: 0.84;
  display: flex;
  flex-direction: column;
  /* height: 100vh; */
  background-color: #131313;
  overflow-x: hidden;
`;

const SideBarContainer = styled.div`
  /* border: 1px solid red; */

  flex: 0.15;
  max-width: 20vw;

  @media screen and (max-width: 1050px) {
    width: 200px;
    margin-right: 0;
  }
`;

const PlayerContainer = styled.div`
  /* border: 1px solid red; */

  flex: 0.15;
  display: flex;
  position: fixed;
  width: 100vw;
`;

export default App;
