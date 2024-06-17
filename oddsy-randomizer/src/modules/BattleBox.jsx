import React from "react";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { ThemeContext } from "@emotion/react";

export default function BattleBox({ challengerOne, challengerTwo, handleBattle }) {
    const [challengerOneOdds, setChallengerOneOdds] = React.useState("");
    const [challengerTwoOdds, setChallengerTwoOdds] = React.useState("");
    const style = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        ml: 10,
        mr: 10,
    }
    function handleBattleClick() {
        handleBattle(parseFloat(challengerOneOdds.split("%")[0]));
    }
    React.useEffect(() => {
        if(challengerOne.votes && challengerTwo.votes){
            const totalVotes = challengerOne.votes + challengerTwo.votes;
            setChallengerOneOdds( Math.round(challengerOne.votes*1000/totalVotes)/10 + "%");
            setChallengerTwoOdds( Math.round(challengerTwo.votes*1000/totalVotes)/10 + "%");
        }else{
            setChallengerOneOdds("");
            setChallengerTwoOdds("");
        }

    },[challengerOne,challengerTwo]);
    return (
            <Stack direction="row" gap={4} sx={style}>
                <Typography>{challengerOne.name && challengerOne.name + " - " + challengerOne.votes + " votes - "}{challengerOneOdds}</Typography>
                <Typography> --- Vs --- </Typography>
                <Typography>{challengerTwo.name && challengerTwo.name + " - " + challengerTwo.votes + " votes - "}{challengerTwoOdds}</Typography>
                <Button onClick={handleBattleClick} disabled={challengerOneOdds ? false : true} color="error" variant="contained">Fight!</Button>
            </Stack>
    );
}