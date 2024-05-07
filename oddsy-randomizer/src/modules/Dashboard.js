import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Form from "./Form";
import Deposits from "./votesAdded";
import CandidatesTable from "./CandidatesTable";
import NewCandidateModal from "./NewCandidateModal";

export default function Dashboard({
  totalVotes,
  candidatesData,
  handleSubmitNewVotes,
  history,
  deleteCandidate,
  updateCandidatesData,
}) {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <NewCandidateModal
      modalIsOpen={modalIsOpen}
      updateCandidatesData={updateCandidatesData}
      closeModal={() => setModalIsOpen(false)}
      handleAddCandidate={updateCandidatesData}
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
          <Deposits totalVotes={totalVotes} history={history} />
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
