import React, { useState, useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { GET_USER } from "../../states/appSlice";

import { useHistory, withRouter } from "react-router-dom";

import styled from "styled-components";
import { Avatar, Button } from "@material-ui/core";
import { ArrowBack, ArrowForward, ExpandMore } from "@material-ui/icons";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";

import SearchBar from "./SearchBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minWidth: 500,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default withRouter(function Header({ location, setSearch }) {
  const user = useSelector(GET_USER);

  const [currentPath, setCurrentPath] = useState(location.pathname);

  const history = useHistory();

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const prevOpen = useRef(open);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }

    setOpen(false);
  };

  const handleClickAbout = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }

    setOpen(false);
    history.push("/about");
  };

  const handleClickProfile = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }

    setOpen(false);
    history.push("/profile");
  };

  function handleListKeyDown(e) {
    if (e.key === "Tab") {
      e.preventDefault();
      setOpen(false);
    }
  }

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    const { pathname } = location;

    setCurrentPath(pathname);
  }, [location.pathname]);

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <HistoryOption>
          <HistoryIcon>
            <ArrowBack
              onClick={() => {
                history.goBack();
              }}
            />
          </HistoryIcon>
          <HistoryIcon>
            <ArrowForward
              onClick={() => {
                history.goForward();
              }}
            />
          </HistoryIcon>
        </HistoryOption>
        {currentPath === "/search" ? (
          <SearchBar
            type="text"
            placeholder="Search for Artists/songs"
            onChange={(e) => setSearch(e.target.value)}
          />
        ) : null}
      </HeaderWrapper>

      <HeaderWrapper>
        <div className={classes.root}>
          <HeaderMenuContainer
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <Avatar
              className="header_avatar"
              src={user?.images[0]?.url}
              alt={user?.display_name}
            />
            <p>{user?.display_name}</p>
            <ExpandMore className="header_icon" />
          </HeaderMenuContainer>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                  width: 150,
                  backgroundColor: "#000",
                  color: "#fff",
                  marginTop: "3px",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleClickAbout}>About</MenuItem>
                      <MenuItem onClick={handleClickProfile}>Profile</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </HeaderWrapper>
    </HeaderContainer>
  );
});

const HeaderContainer = styled.div`
  /* border: 1px solid red; */

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 1rem;
  margin: 1rem;
`;

const HeaderWrapper = styled.div`
  /* border: 1px solid red; */

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 33rem;
`;

const HistoryOption = styled.div`
  /* border: 1px solid red; */

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 135px;
`;

const HistoryIcon = styled(Button)`
  color: #fff !important;
  background-color: #040404 !important;
  padding: 0.5rem 0 !important;
  border-radius: 99px !important;

  &:hover {
    color: #040404 !important;
    background-color: #fff !important;
  }
`;

const HeaderMenuContainer = styled.div`
  border: 1px solid red;

  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #040404;
  width: 13rem;
  height: 3rem;
  margin-left: auto;
  margin-right: 5rem;
  padding: 0.5rem;
  border: none;
  border-radius: 90px;
  cursor: pointer;

  .header_avatar {
    object-fit: contain;
  }

  > p {
    color: #fff;
    margin: 0;
  }

  .header_icon {
    color: #fff;
    margin-right: 0.5rem;
  }
`;
