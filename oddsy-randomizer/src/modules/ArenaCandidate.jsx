import React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

export default function ArenaCandidate({
    handleCandidateClick,
    candidateData,
    rowIndex,
    columnIndex,
    pickedForNextBattle,
  }) {
    const [isHovered, setIsHovered] = React.useState(false);
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