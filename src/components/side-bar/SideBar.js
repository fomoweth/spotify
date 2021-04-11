import React from "react";

import { useSelector } from "react-redux";
import { GET_USER_PLAYLISTS } from "../../states/appSlice";

import styled from "styled-components";
import { Favorite, Home, LibraryMusic, Search } from "@material-ui/icons";

import SideBarOption from "./SideBarOption";
import { useHistory } from "react-router";

const SideBar = () => {
  const history = useHistory();

  const userPlaylists = useSelector(GET_USER_PLAYLISTS);

  return (
    <SideBarContainer>
      <img
        className="sidebar__logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="Spotify Logo"
        onClick={() => history.push("/")}
      />

      <SideBarOption Icon={Home} title="Home" pageName="home" />
      <SideBarOption Icon={Search} title="Search" pageName="search" />
      <SideBarOption
        Icon={LibraryMusic}
        title="Your Library"
        pageName="collection"
      />
      <SideBarOption
        Icon={Favorite}
        title="Liked Songs"
        pageName="collection/tracks"
      />

      <br />
      <strong>PLAYLIST</strong>
      <hr />

      {userPlaylists?.map((playlist, idx) => (
        <SideBarOption key={idx} id={playlist.id} title={playlist.name} />
      ))}
    </SideBarContainer>
  );
};

const SideBarContainer = styled.div`
  /* border: 1px solid red; */

  color: white;
  height: 100vh;
  min-width: 230px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #040404;

  > img {
    object-fit: contain;
    width: 50%;
    height: 5rem;
    padding: 0.5rem;
    cursor: pointer;
  }

  > strong {
    margin-left: 0.5rem;
    padding: 0.5rem;
    font-size: 1rem;
  }

  > hr {
    margin: 0.5rem auto;
    border: 1px solid #282828;
    width: 95%;
  }

  @media screen and (max-width: 1050px) {
    max-width: 200px;
  }
`;

export default SideBar;
