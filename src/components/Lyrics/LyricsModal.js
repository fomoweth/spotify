import React, { useEffect, useState } from "react";

import ReactHtmlParser from "react-html-parser";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Comment } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    border: "3px solid #000",
    boxShadow: theme.shadows[5],
    backgroundColor: "rgba(70, 70, 70, 0.2)",
    color: "#fff",
    marginBottom: "20px",
    padding: theme.spacing(2, 4, 3),
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: "20px",
    outline: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 500,
    overflow: "scroll",
  },
}));

export const LyricsModal = ({ lyricsObj }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatLyrics = (lyrics) => {
    const result = lyrics.replace(/\n/g, "<br />");
    return result;
  };

  useEffect(() => {}, [lyricsObj]);

  return (
    <div>
      {lyricsObj && (
        <>
          <Comment type="button" onClick={handleOpen} />
          <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2
                  style={{
                    marginBottom: "30px",
                    padding: "5px",
                  }}
                >
                  {lyricsObj.title} - {lyricsObj.artist}
                </h2>

                <div>{ReactHtmlParser(formatLyrics(lyricsObj.lyrics))}</div>
              </div>
            </Fade>
          </Modal>
        </>
      )}
    </div>
  );
};

export default LyricsModal;
