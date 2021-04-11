import React from "react";

import styled from "styled-components";
import { Button } from "@material-ui/core";

const About = () => {
  return (
    <AboutContainer>
      <AboutDesc>
        <h2>This Application retrieves all data through Spotify Web API</h2>

        <p>
          - Spotify Web API only supports 'Remote Control Features' for the
          Player
        </p>
        <p>
          - Therefore, in order to use the Player Features via this application,
          you must be logged in to Spotify
        </p>
      </AboutDesc>

      <AboutDesc>
        <h2>Used Stacks & Libraries:</h2>
        <ul>
          <li>
            <a
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ReactJS
            </a>
          </li>
          <li>
            <a
              href="https://redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux
            </a>
          </li>
          <li>
            <a
              href="https://firebase.google.com/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Firebase
            </a>
          </li>
          <li>
            <a
              href="https://developer.spotify.com/documentation/web-api/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Spotify Web API
            </a>
          </li>
          <li>
            <a
              href="https://reactrouter.com/web/guides/quick-start"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Router
            </a>
          </li>
          <li>
            <a
              href="https://styled-components.com/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Styled-Components
            </a>
          </li>
          <li>
            <a
              href="http://material-ui.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Material-UI
            </a>
          </li>
        </ul>
      </AboutDesc>

      <AboutLinks>
        <Button>
          <a
            href="https://github.com/own1t/spotify"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source Code
          </a>
        </Button>
        <Button>
          <a
            href="https://github.com/own1t/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>{" "}
        </Button>

        <Button>
          <a
            href="https://www.linkedin.com/in/ryankimmm/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>{" "}
        </Button>

        <Button>
          <a
            href="https://angel.co/u/ryan-kim-46"
            target="_blank"
            rel="noopener noreferrer"
          >
            Angel
          </a>{" "}
        </Button>
      </AboutLinks>
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  /* border: 1px solid red; */

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  color: #fff;
  margin-top: 20px;
`;

const AboutDesc = styled.div`
  width: 90%;
  margin: 10px auto;
  border-radius: 4px;
  font-size: 1em;

  li {
    margin-top: 5px;
  }

  a {
    text-decoration: none;
    color: #1f66f2;
  }

  a:hover {
    color: #3096e8;
  }
`;

const AboutLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin: 20px auto;

  a {
    text-decoration: none;
    color: #1f66f2;
  }

  a:hover {
    color: #3096e8;
  }
`;

export default About;
