import React from "react";
import Avatar from "@mui/material/Avatar";
import { blue, green, orange, purple, red } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import initialBattlefieldApproach from "./listItems";

export default function Arena({ candidatesData }) {
  const initBattleFieldArray = initialBattlefieldApproach(
    candidatesData.length
  );
  const selectedIndices = []

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* <Grid container spacing={8}> */}
      {/* <Grid item xs={2}> */}
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack direction="row">
          {initBattleFieldArray.map((numInColumn, columnIndex) => (
            <Stack
              key={columnIndex}
              sx={{ marginTop: 11.2 * columnIndex, marginLeft: -3 }}
            >
              {Array.from({ length: numInColumn }).map((_, rowIndex) => {
                let randomIndex; 
                do {
                  randomIndex = Math.floor(Math.random()*candidatesData.length);
                } while (selectedIndices.includes(randomIndex));
                selectedIndices.push(randomIndex);
                return (
                  <Avatar
                  key={rowIndex}
                  src={candidatesData[randomIndex].picture}
                  sx={{ width: 180, height: 180 }}
                  />
                );
              })}
            </Stack>
          ))}
        </Stack>
      </Paper>
      {/* </Grid> */}
      {/* </Grid> */}
    </Container>
  );
}
