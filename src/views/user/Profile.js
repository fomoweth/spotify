import React from "react";

import { useSelector } from "react-redux";
import {
  GET_RECENT_ITEMS,
  GET_USER,
  GET_FOLLOWING_ARTISTS,
} from "../../states/appSlice";

import styled from "styled-components";

import RecentItemsRow from "../../components/item-list/RecentItemsRow";
import ArtistRow from "../../components/item-list/ArtistRow";
import LoadingContainer from "../base/LoadingContainer";

const Profile = () => {
  const user = useSelector(GET_USER);
  const recentItems = useSelector(GET_RECENT_ITEMS);
  const followingArtists = useSelector(GET_FOLLOWING_ARTISTS);

  return (
    <ProfileContainer>
      {user ? (
        <>
          <ProfileWrapper>
            <img
              src={user?.images[0].url}
              alt={`${user?.display_name}'s Photo`}
            />
            <ProfileInfo>
              <strong>PROFILE</strong>
              <h1>{user?.display_name}</h1>
              <ProfileInfoText>
                <p>{user?.email}</p>
                <p>{user?.followers?.total} followers</p>
                <p>{user?.country}</p>
              </ProfileInfoText>
            </ProfileInfo>
          </ProfileWrapper>

          <RecentItemsContainer>
            <RecentItemsRow items={recentItems} />
          </RecentItemsContainer>
          <ArtistsWrapper>
            <ArtistRow items={followingArtists} />
          </ArtistsWrapper>
        </>
      ) : (
        <LoadingContainer />
      )}
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  flex: 0.8;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const ProfileWrapper = styled.div`
  display: flex;
  width: 100%;

  > img {
    object-fit: contain;
    width: 300px;
    height: 300px;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: 50px;
    border-radius: 999px;
  }
`;

const ProfileInfo = styled.div`
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
  }
`;

const ProfileInfoText = styled.div`
  /* border: 1px solid red; */

  display: flex;
  flex-direction: column;
  color: gray;

  > p {
    margin: 5px;
  }
`;

const RecentItemsContainer = styled.div``;

const ArtistsWrapper = styled.div``;

export default Profile;
