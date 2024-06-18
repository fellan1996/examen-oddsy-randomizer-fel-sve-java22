import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";
import BattleBox from "./BattleBox";
import ArenaCandidate from "./ArenaCandidate";
import { initialBattlefieldSetup } from "./listItems";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Arena({ candidatesData, handleBattle }) {
  const [challengerOne, setChallengerOne] = React.useState({});
  const [challengerTwo, setChallengerTwo] = React.useState({});
  const [initBattlefieldArr, setInitBattlefieldArr] = React.useState([]);


  React.useEffect(() => {
    setInitBattlefieldArr(initialBattlefieldSetup(candidatesData));
  }, [candidatesData]);

  function handleBattleClick(challengerOneWon) {

    handleBattle(challengerOne, challengerTwo, challengerOneWon);
    setChallengerOne({});
    setChallengerTwo({});
  }

  function handleCandidateClick(clickedCandidateData) {
    if (clickedCandidateData.name === challengerOne.name) setChallengerOne({});
    else if (clickedCandidateData.name === challengerTwo.name)
      setChallengerTwo({});
    else if (!challengerOne.name)
      setChallengerOne({
        name: clickedCandidateData.name,
        picture: clickedCandidateData.picture,
        votes: clickedCandidateData.votes,
      });
    else
      setChallengerTwo({
        name: clickedCandidateData.name,
        picture: clickedCandidateData.picture,
        votes: clickedCandidateData.votes,
      });
  }
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: 255,
          border: "4px ridge orange",
          borderWidth: "4px 4px 0 4px",
        }}
      >
        <Stack direction="row">
          {initBattlefieldArr[0] ? (
            initBattlefieldArr.map((columnArr, columnIndex) => (
              <Stack
                key={columnIndex}
                sx={{ marginTop: 11.2 * columnIndex, marginLeft: -3 }}
              >
                {columnArr.map((placingObj, rowIndex) => {
                  const pickedForNextBattle =
                    challengerOne.name === placingObj.name ||
                    challengerTwo.name === placingObj.name;
                  return (
                    <ArenaCandidate
                      handleCandidateClick={handleCandidateClick}
                      candidateData={placingObj}
                      columnIndex={columnIndex}
                      rowIndex={rowIndex}
                      key={columnIndex + "." + rowIndex}
                      pickedForNextBattle={pickedForNextBattle}
                    />
                  );
                })}
              </Stack>
            ))
          ) : (
            <Typography sx={{ mt: 10 }}>
              Add at least two candidates on the creator page in order to fight
            </Typography>
          )}
        </Stack>
      </Paper>
      <Paper
        sx={{
          p: 2,
          border: "4px ridge orange",
          borderWidth: "0 4px 4px 4px",
          position: "sticky",
          bottom: 0,
          backgroundImage:
            "linear-gradient(rgb(255,229,215), rgb(255,215,204))",
        }}
      >
        <BattleBox
          challengerOne={challengerOne}
          challengerTwo={challengerTwo}
          handleBattle={handleBattleClick}
        />
      </Paper>
    </Container>
  );
}
