import Modal from "@mui/material/Modal";
import ImageCropper from "./ImageCropper";
import React, { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import IconButton from "@mui/material/IconButton";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function NewCandidateModal({
  modalIsOpen,
  closeModal,
  updateCandidatesData,
}) {
  const [candidateImageURL, setCandidateImageURL] = React.useState("");
  const [newCandidateName, setNewCandidateName] = React.useState("");

  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const badgeStyle = {
    width: 28,
    height: 28,
    border: "1px solid gray",
    background: "rgba(255, 255, 255, 0.7)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
  };

  async function handleSubmit() {
    const docRef = doc(db, "candidates", newCandidateName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //skapa errormeddelande
      console.log("candidate already exists");
    } else {
      const docData = {
        picture: candidateImageURL,
        votes: 0,
        created: Timestamp.fromDate(new Date()),
      };
      await setDoc(doc(db, "candidates", newCandidateName), docData);

      setCandidateImageURL("");
      setNewCandidateName("");
      updateCandidatesData();
      closeModal();

      //CandidatesData i App.js ska nu uppdateras och modalen ska stängas samt ett success-meddelande ska visas
    }
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={modalIsOpen}
      sx={{ overflow: "scroll" }}
      onClose={closeModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={modalIsOpen}>
        <Box sx={style}>
          <form
            onSubmit={event => {
              event.preventDefault();
              handleSubmit();
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 15,
            }}
          >
            <Title>Add a new Candidate</Title>
            <TextField
              id="new-candidate-name"
              label="Name"
              required
              value={newCandidateName}
              onChange={(e) => setNewCandidateName(e.target.value)}
              type="text"
              size="small"
              sx={{ maxWidth: 220 }}
            />
            {!candidateImageURL ? (
              <ImageCropper handleUpload={(url) => setCandidateImageURL(url)} />
            ) : (
              <>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <IconButton
                      id="delete-img-badge"
                      sx={badgeStyle}
                      onClick={() => setCandidateImageURL("")}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <Avatar
                    src={candidateImageURL}
                    alt={newCandidateName}
                    sx={{ width: 100, height: 100 }}
                  />
                </Badge>
                <Button variant="outlined" type="submit">
                  Add
                </Button>
              </>
            )}
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}
