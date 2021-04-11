import styled from "styled-components";

export const MiniPlayerContainer = styled.div`
  display: flex;

  .MuiSvgIcon-root {
    cursor: pointer;
    color: #fff;
    font-size: 4rem;
    margin: 0 1rem 0 3rem;

    &:hover {
      color: #fff;
    }
  }

  .active {
    color: #1ed15e;

    &:hover {
      color: #fff;
    }
  }

  .more_icon {
    margin-left: 0;
    color: gray;

    &:hover {
      color: #fff;
    }
  }
`;

export const MiniPlayerLeft = styled.div`
  /* border: 1px solid red; */

  flex: 0.12;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;

  .MuiSvgIcon-root {
    margin: 0;
    /* color: #a8a6b2; */
  }

  .active {
    color: #1ed15e !important;
  }

  .favorite {
    font-size: 2rem;
    margin-left: 0.7rem;
  }
`;

export const MiniPlayerRight = styled.div`
  /* border: 1px solid red; */

  flex: 0.85;
  display: flex;
`;
