import styled from "styled-components";

export const SongRowHeader = styled.div`
  /* border: 1px solid red; */

  display: flex;
  align-items: center;
  max-width: 96%;
  min-width: 96%;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  font-size: 1rem;
  margin: 0.5rem;
`;

export const SongRowWrapper = styled.div`
  /* border: 1px solid red; */

  display: flex;
  max-width: 97%;
  min-width: 97%;
  margin-left: auto;
  margin-right: auto;
  margin: 0.5rem;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #2a2a2a;

    h3 {
      color: #fff;
    }

    p {
      color: #fff;
    }
  }

  .active {
    color: #1ed15e !important;
  }
`;

export const SongRowContainer = styled.div`
  /* border: 1px solid red; */

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 98%;
`;

export const SongRowLeft = styled.div`
  /* border: 1px solid red; */

  flex: 0.5;
  display: flex;
  align-items: center;

  h3 {
    color: #fff;
    margin: 0;
  }

  p {
    color: gray;
    margin: 0;
  }
`;

export const TrackNumber = styled.div`
  flex: 0.1;
  text-align: center;
`;

export const TrackCover = styled.div`
  object-fit: contain;
  flex: 0.15;

  /* margin-left: auto; */

  > img {
    height: 64px;
    width: 64px;
  }
`;

export const TrackInfo = styled.div`
  flex: 0.75;
  display: flex;
  flex-direction: column;

  > p {
    margin-top: 0.4rem;
  }
`;

export const SongRowRight = styled.div`
  /* border: 1px solid red; */

  flex: 0.48;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1.5rem;

  h3 {
    color: #fff;
    margin: 0;
  }

  p {
    color: gray;
    margin: 0;
  }

  .trackTime_icon {
    color: #fff;
    margin: 0;
  }
`;

export const SongRowRightHead = styled.div``;

export const SongRowRightTail = styled.div`
  /* border: 1px solid red; */

  flex: 0.2;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AlbumTitle = styled.div`
  flex: 0.4;
`;

export const TrackTime = styled.div`
  /* border: 1px solid red; */
`;

export const Liked = styled.div`
  color: #1ed15e !important;

  .hidden {
    visibility: hidden;
    z-index: 1;

    &:hover {
      visibility: visible !important;
    }
  }
`;

export const Option = styled.div`
  /* border: 1px solid red; */

  .MuiSvgIcon-root {
    color: lightgray !important;
    font-size: 1.5rem;
  }
`;

export const OptionHeader = styled.div`
  /* border: 1px solid red; */

  display: flex;
  align-items: center;
  width: 2rem;
  height: 35px;
`;
