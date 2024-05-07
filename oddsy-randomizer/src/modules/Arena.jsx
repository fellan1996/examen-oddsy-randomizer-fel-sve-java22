import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import initialBattlefieldApproach from "./listItems";

export default function Arena({ candidatesData }) {
  const [initBattleFieldArray, setInitBattleFieldArray] = React.useState(
    initialBattlefieldApproach(candidatesData.length)
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
        initBattleFieldArray.map((columnArr, columnIndex) => (
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
    </Container>
  );
}
