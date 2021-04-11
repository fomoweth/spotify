import React from "react";

import styled from "styled-components";

const LoadingContainer = () => {
  return (
    <Container>
      <Text>Loading...</Text>
    </Container>
  );
};

const Container = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #000;

  @keyframes animate {
    0% {
      background-position: -500%;
    }
    100% {
      background-position: 500%;
    }
  }
`;

const Text = styled.p`
  position: relative;
  font-family: sans-serif;
  color: #fff;
  text-transform: uppercase;
  font-size: 4em;
  letter-spacing: 4px;
  overflow: hidden;
  background: linear-gradient(90deg, #000, #fff, #000);
  background-repeat: no-repeat;
  background-size: 80%;
  animation: animate 3s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(255, 255, 255, 0.01);
`;

export default LoadingContainer;
