import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import CandidatesTable from "./CandidatesTable";
import Button from "@mui/material/Button";
import BattleBox from "./BattleBox";

export default function Arena({
  initBattlefieldArr,
  setInitBattlefieldArr,
  candidatesData,
  deleteCandidate,
  challengerOne,
  challengerTwo,
  handleBattle,
  handleCandidateClick,
}) {
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
          {initBattlefieldArr.map((columnArr, columnIndex) => (
            <Stack
              key={columnIndex}
              sx={{ marginTop: 11.2 * columnIndex, marginLeft: -3 }}
            >
              {columnArr.map((placingObj, rowIndex) => {
                return (
                  <ArenaCandidate handleCandidateClick={handleCandidateClick} candidateData={placingObj} columnIndex={columnIndex} rowIndex={rowIndex} />
                );
              })}
            </Stack>
          ))}
        </Stack>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <BattleBox
          challengerOne={challengerOne}
          challengerTwo={challengerTwo}
          handleBattle={handleBattle}
        />
      </Paper>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          marginTop: 7,
          marginBottom: 20,
        }}
      >
        <CandidatesTable
          candidatesData={candidatesData}
          deleteCandidate={deleteCandidate}
        />
      </Paper>
    </Container>
  );
}


function ArenaCandidate({ handleCandidateClick, candidateData, rowIndex, columnIndex }) {
  function handleClick(event) {
    const data = JSON.parse(event.target.alt);
    handleCandidateClick(data);
  }
  return (
    <>
    {candidateData.name ?

(<Button
  sx={{
        padding: 0,
        borderRadius: 100,
        overflow: "hidden",
        boxShadow: "1px 1px 1px gray",
        "&:hover": {
          boxShadow: "1px 1px 1px black",
        },
      }}
      >
    <Avatar
        placement={candidateData.placement}
        neighbours={candidateData.neighbours}
        key={columnIndex + "." + rowIndex}
        alt={JSON.stringify(candidateData)}
        src={candidateData.picture}
        onClick={handleClick}
        sx={{
          width: 180,
          height: 180,
          border: "1px solid black",
          borderRadius: 100,
        }}
        />
    </Button>)
    : 
    (<div style={{width: 180, height: 180,}}></div>)
  }
  </>
  );
}
