import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import CandidatesTable from "./CandidatesTable";
import { Button } from "@mui/material";

export default function Arena({ initBattlefieldArr, setInitBattlefieldArr, candidatesData, deleteCandidate }) {

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button onClick={setInitBattlefieldArr}>Generate battlefield</Button>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack direction="row">
        {  
        initBattlefieldArr.map((columnArr, columnIndex) => (
          <Stack 
            key={columnIndex}
            sx={{ marginTop: 11.2*columnIndex, marginLeft: -3 }} 
          >
            {columnArr.map((placingObj, rowIndex) => {
              return (
                <Avatar
                  placement={placingObj.placement}
                  name={placingObj.name}
                  picture={placingObj.picture}
                  neighbours={placingObj.neighbours}
                  votes={placingObj.votes}
                  key={columnIndex + "." + rowIndex}
                  src={placingObj.picture}
                  sx={{ width: 180, height: 180, border: "1px solid black", }}
                />
              );
            })}
          </Stack>
        ))
        }
        </Stack>
      </Paper>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column", marginTop: 7, marginBottom: 20 }}>
          <CandidatesTable
            candidatesData={candidatesData}
            deleteCandidate={deleteCandidate}
          />
        </Paper>
    </Container>
  );
}
