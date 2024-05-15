import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import BattleBox from "./BattleBox";
import { initialBattlefieldSetup } from "./listItems";

export default function Arena({ candidatesData, handleBattle }) {
  const [challengerOne, setChallengerOne] = React.useState({});
  const [challengerTwo, setChallengerTwo] = React.useState({});
  const [initBattlefieldArr, setInitBattlefieldArr] = React.useState([]);
  console.log("Arena");

  React.useEffect(() => {
    setInitBattlefieldArr(initialBattlefieldSetup(candidatesData));
  }, [candidatesData]);

  function handleBattleClick(challengerOneOdds) {
    handleBattle(challengerOne, challengerTwo, challengerOneOdds);
    setChallengerOne({});
    setChallengerTwo({});
  }

  function handleCandidateClick(clickedCandidateData) {
    if (clickedCandidateData.name === challengerOne.name)
      setChallengerOne({});
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
          {initBattlefieldArr &&
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
            ))}
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

function ArenaCandidate({
  handleCandidateClick,
  candidateData,
  rowIndex,
  columnIndex,
  pickedForNextBattle,
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  console.log("ArenaCandidate");
  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  function handleClick(event) {
    const data = JSON.parse(event.target.alt);
    handleCandidateClick(data);
  }
  return (
    <>
      {candidateData.name ? (
        <Button
          sx={{
            padding: 0,
            borderRadius: 100,
            overflow: "hidden",
            boxShadow: isHovered ? "1px 1px 1px black" : "1px 1px 1px gray",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
              border: pickedForNextBattle ? "2px solid red" : "1px solid black",
              borderRadius: 100,
            }}
          />
          {isHovered && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                padding: 8,
                transform: "translate(-50%, -50%)",
                color: "white",
                textAlign: "center",
                borderRadius: 100,
                background: "rgb(0,0,0,0.3)",
                boxShadow: "inset 1px 1px 1px black",
                pointerEvents: "none",
              }}
            >
              {candidateData.name}
              <br />
              {candidateData.votes}
            </div>
          )}
        </Button>
      ) : (
        <div style={{ width: 180, height: 180 }}></div>
      )}
    </>
  );
}
