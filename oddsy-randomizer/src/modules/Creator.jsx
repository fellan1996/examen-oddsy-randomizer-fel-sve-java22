import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import Form from "./Form";
import CandidatesTable from "./CandidatesTable";
import NewCandidateModal from "./NewCandidateModal";
import VotesInfo from "./VotesInfo";



export default function Creator({
  totalVotes,
  candidatesData,
  handleSubmitNewVotes,
  history,
  deleteCandidate,
  updateCandidatesData,
}) {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [snackbarIsOpen, setSnackbarIsOpen] = React.useState(false);
  const [nameOfNewCandidate, setNameOfNewCandidate] = React.useState("");

  const openSnackbar = (newCandidateName) => {
    setNameOfNewCandidate(newCandidateName);
    setSnackbarIsOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarIsOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Snackbar open={snackbarIsOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {nameOfNewCandidate} has been added to the candidates!
        </Alert>
      </Snackbar>
      <NewCandidateModal
        modalIsOpen={modalIsOpen}
        updateCandidatesData={updateCandidatesData}
        closeModal={() => setModalIsOpen(false)}
        handleAddCandidate={updateCandidatesData}
        openSnackbar={openSnackbar}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Form
              currentCandidates={candidatesData}
              handleSubmitNewVotes={handleSubmitNewVotes}
              openNewCandidateModal={() => setModalIsOpen(true)}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <VotesInfo totalVotes={totalVotes} history={history} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <CandidatesTable
              candidatesData={candidatesData}
              deleteCandidate={deleteCandidate}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
