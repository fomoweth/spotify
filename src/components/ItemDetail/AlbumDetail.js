import React, { useEffect, useState } from "react";

import { useParams, useHistory } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { GET_SELECTED_ALBUM, SET_SELECTED_ALBUM } from "../../states/appSlice";

import SpotifyWebApi from "spotify-web-api-js";
import { client_id } from "../../utils";

import styled from "styled-components";
import {
  SongRowHeader,
  SongRowLeft,
  SongRowRight,
  TrackNumber,
  TrackInfo,
  AlbumTitle,
  TrackTime,
  OptionHeader,
} from "../SongRow/SongRowElements";
import { AccessTime, FiberManualRecord } from "@material-ui/icons";
import SongRow from "../ItemList/SongRow";
import MiniPlayerAlbum from "../MiniPlayer/MiniPlayerAlbum";
import LoadingContainer from "../../views/base/LoadingContainer";

const spotify = new SpotifyWebApi(client_id);

const AlbumDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();
  const selectedAlbum = useSelector(GET_SELECTED_ALBUM);

  useEffect(() => {
    spotify.getAlbum(id).then((album) => {
      dispatch(
        SET_SELECTED_ALBUM({
          selected_album: album,
        })
      );
    });
  }, [id]);

  return (
    <AlbumDetailContainer>
      {selectedAlbum ? (
        <>
          <AlbumDetailHeader>
            <AlbumDetailHeaderLeft>
              <AlbumDetailInfo>
                <img
                  src={selectedAlbum?.images[1]?.url}
                  alt={`${selectedAlbum?.name} Cover`}
                />
                <AlbumDetailInfoText>
                  <strong>ALBUM</strong>
                  <h2>{selectedAlbum?.name}</h2>
                  <AlbumDetailDesc>
                    <strong
                      onClick={() =>
                        history.push(
                          `/artist/${selectedAlbum?.artists?.[0].id}`
                        )
                      }
                    >
                      {selectedAlbum?.artists?.[0].name}
                    </strong>
                    <FiberManualRecord />
                    {selectedAlbum?.total_tracks} songs
                    <FiberManualRecord />
                    {selectedAlbum?.release_date}
                  </AlbumDetailDesc>
                </AlbumDetailInfoText>
              </AlbumDetailInfo>
            </AlbumDetailHeaderLeft>
            <AlbumDetailHeaderRight></AlbumDetailHeaderRight>
          </AlbumDetailHeader>

          <PlayerContainer>
            <MiniPlayerAlbum playlist={selectedAlbum} albumId={id} />
          </PlayerContainer>

          <AlbumDetailBody>
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
                <AlbumTitle></AlbumTitle>
                <TrackTime>
                  <AccessTime className="trackTime_icon" />
                </TrackTime>
              </SongRowRight>
              <OptionHeader></OptionHeader>
            </SongRowHeader>
            <SongRowWrapper>
              {selectedAlbum?.tracks.items.map((item, idx) => (
                <SongRow key={idx} idx={idx} track={item} type="album" />
              ))}
            </SongRowWrapper>
          </AlbumDetailBody>
        </>
      ) : (
        <LoadingContainer />
      )}
    </AlbumDetailContainer>
  );
};

const AlbumDetailContainer = styled.div`
  /* border: 1px solid red; */

  flex: 0.8;
  display: flex;
  flex-direction: column;
  max-width: 80vw;

  @media screen and (max-width: 1050px) {
    max-width: 75vw;
  }
`;

const PlayerContainer = styled.div``;

const AlbumDetailHeader = styled.div`
  /* border: 1px solid red; */

  flex: 0.05;
  display: flex;
  justify-content: space-between;
  width: 800px !important;

  @media screen and (max-width: 1050px) {
    flex: 0.05;
    display: flex;
    flex-direction: column-reverse;
    padding: 0;
  }
`;

const AlbumDetailHeaderLeft = styled.div`
  /* border: 1px solid red; */
`;

const AlbumDetailHeaderRight = styled.div`
  /* border: 1px solid red; */

  margin: 0;

  @media screen and (max-width: 1050px) {
    margin: 1rem 2rem auto auto;
  }
`;

const AlbumDetailBody = styled.div`
  flex: 0.8;
  overflow: auto;
`;

const AlbumDetailInfo = styled.div`
  /* border: 1px solid red; */

  display: flex;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;

  > img {
    height: 300px;
    width: 300px;
    box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
    margin: 0 1rem;
  }
`;

const AlbumDetailInfoText = styled.div`
  flex: 1;
  margin-left: 1.5rem;

  strong {
    color: #fff;
    font-size: 1rem;
  }

  .MuiSvgIcon-root {
    color: #fff;
    font-size: 0.5rem;
  }

  h2 {
    color: #fff;
    font-size: 5rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #fff;
    font-size: 1rem;
  }

  @media screen and (max-width: 1050px) {
    h2 {
      font-size: 3rem;
      width: 20rem;
    }

    p {
      font-size: 0.3rem;
    }
  }
`;

const AlbumDetailDesc = styled.p`
  /* border: 1px solid red; */

  display: flex;
  align-items: center;
  justify-content: space-around;

  > strong {
    cursor: pointer;
  }

  @media screen and (max-width: 1050px) {
    width: 20rem;
  }
`;

const SongRowWrapper = styled.div``;

export default AlbumDetail;
