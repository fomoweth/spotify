import React from "react";

import styled from "styled-components";

const Login = () => {
  return (
    <LoginContainer>
      <LoginWrapper>
        <img
          src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
          alt="Spotify logo"
        />
        <a href="https://spotify-backend-ac7a5.web.app/login">
          LOGIN WITH SPOTIFY
        </a>
      </LoginWrapper>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  /* border: 1px solid red; */

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #000;
`;

const LoginWrapper = styled.div`
  /* border: 1px solid red; */

  display: grid;
  place-items: center;
  height: 40vh;
  margin: auto;

  > img {
    /* border: 1px solid red; */

    width: 70%;
  }

  > a {
    /* border: 1px solid red; */

    padding: 20px;
    border-radius: 99px;
    background-color: #1db954;
    font-weight: 800;
    color: white;
    text-decoration: none;
  }
`;

export default Login;
