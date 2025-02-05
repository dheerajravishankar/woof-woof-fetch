import * as React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import Confetti from "react-confetti";

import { useDogs } from "../context/DogsContext";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "#fff",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
  p: 4,
  textAlign: "center",
  overflow: "hidden",
};

const headerStyle = {
  background: "linear-gradient(45deg, #fba91a, #300d38)",
  padding: "20px",
  //   borderRadius: "16px 16px 0 0",
  color: "#fff",
  fontSize: "1.3rem",
  fontWeight: "500",
};

const imageStyle = {
  width: "100%",
  height: "auto",
  //   borderRadius: "12px",
  boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.1)",
  marginTop: "20px",
};

const textStyle = {
  marginTop: "20px",
  fontSize: "1rem",
  color: "#333",
  fontWeight: "400",
};

const buttonStyle = {
  background: "#300d38",
  color: "#fff",
  marginTop: "20px",
  "&:hover": {
    background: "#8e24aa",
  },
};

export default function Match({ open, handleClose }) {
  const { loading, match } = useDogs();

  return (
    <div>
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {loading ? (
            <Box sx={modalStyle}>
              <Typography sx={headerStyle}>Loading...</Typography>
            </Box>
          ) : (
            <>
              <Confetti width={window.innerWidth} height={window.innerHeight} />
              <Box sx={modalStyle}>
                <Typography sx={headerStyle}>
                  Hurray!! You were matched with {match.name}
                </Typography>
                <img src={match.img} alt={match.name} style={imageStyle} />
                <Typography sx={textStyle}>
                  Come take me home! I live at {match.zip_code}.
                </Typography>
                <Button
                  variant="contained"
                  sx={buttonStyle}
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Box>
            </>
          )}
        </Modal>
      </>
    </div>
  );
}
