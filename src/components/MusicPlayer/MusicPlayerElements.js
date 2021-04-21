import styled from "styled-components";

export const PlayerContainer = styled.div`
  /* border: 1px solid red; */

  position: fixed;
  display: flex;
  justify-content: space-between;
  background-color: #282828;
  width: 99%;
  bottom: 0;
  padding: 1rem;
`;

export const PlayerLeft = styled.div`
  /* border: 1px solid red; */

  flex: 0.3;
  display: flex;
  align-items: center;
  width: 18rem;
  color: #fff;
`;

export const AlbumCover = styled.div`
  > img {
    object-fit: contain;
    height: 64px;
    width: 64px;
    cursor: pointer;
  }
`;

export const TrackInfo = styled.div`
  margin-left: 1rem;

  > h3 {
    margin: 0;
    margin-bottom: 0.25rem;
    cursor: pointer;
    font-size: 1.25rem;

    &:hover {
      text-decoration: underline;
    }
  }

  > p {
    margin: 0;
    color: gray;
    cursor: pointer;
    font-size: 0.85rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const PlayerMid = styled.div`
  /* border: 1px solid red; */

  flex: 0.4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 18rem;
  padding: 0 6rem;

  .MuiSvgIcon-root {
    cursor: pointer;
    color: #fff;
    font-size: 2rem;

    &:hover {
      color: #1ed15e;
    }
  }

  .active {
    color: #1ed15e;

    &:hover {
      color: #fff;
    }
  }

  .mid_button {
    font-size: 3rem;
  }
`;

export const PlayerRight = styled.div`
  /* border: 1px solid red; */

  flex: 0.3;
  display: flex;
  align-items: center;
  max-width: 18rem;
  padding: 0 6rem;

  * .MuiSlider-root {
    color: #1ed15e;
  }

  .MuiSvgIcon-root {
    cursor: pointer;
    color: #fff;

    &:hover {
      color: #1ed15e;
    }
  }
`;
