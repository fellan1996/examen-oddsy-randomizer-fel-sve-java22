import React from "react";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

export default function BattleBox({ challengerOne, challengerTwo, handleBattle }) {
    const style = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        ml: 10,
        mr: 10,
    }
    function handleBattleClick() {
        handleBattle(challengerOne, challengerTwo);
    }
    return (
            <Stack direction="row" gap={4} sx={style}>
                <Typography>{challengerOne.name}</Typography>
                <Typography> --- Vs --- </Typography>
                <Typography>{challengerTwo.name}</Typography>
                <Button onClick={handleBattleClick}sx={{bgcolor:"red", color:"white"}}>Fight!</Button>
            </Stack>
    );
}