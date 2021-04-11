import React, { useState } from "react";

import { useHistory } from "react-router";

import SpotifyWebApi from "spotify-web-api-js";
import { client_id } from "../utils/";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { MoreVert, MoreHoriz } from "@material-ui/icons";

const spotify = new SpotifyWebApi({ client_id });

const ITEM_HEIGHT = 48;

const MenuDropdown = ({ artistId, albumId, uri, type }) => {
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddToQue = async () => {
    setAnchorEl(null);

    await spotify.queue(uri);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {type === "tracks" ? <MoreVert /> : <MoreHoriz />}
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
            backgroundColor: "#282828",
            color: "lightgray",
            padding: 0,
            fontSize: "2.5rem",
          },
        }}
      >
        {type === "tracks" ? (
          <div>
            <MenuItem onClick={handleAddToQue}>Add to queue</MenuItem>
            <MenuItem onClick={() => history.push(`/artist/${artistId}`)}>
              Go to artist
            </MenuItem>
            <MenuItem onClick={() => history.push(`/album/${albumId}`)}>
              Go to album
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={handleAddToQue}>Add to queue</MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
};

export default MenuDropdown;
