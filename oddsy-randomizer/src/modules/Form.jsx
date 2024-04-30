import { useEffect, useState } from "react";
import { db } from "../firebase.js";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  getDoc,
  getDocs,
} from "@firebase/firestore";
import Title from "./Title";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";

export default function Form({ currentCandidates, handleSubmitNewVotes }) {
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [votesToBeAdded, setVotesToBeAdded] = useState(0);

  //skapa state som innehåller alla candidates.

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Title>Creator</Title>
      <Box marginBottom={2} marginTop={4}>
        <Button
          id="new-selectedCandidate"
          variant="outlined"
          size="small"
          endIcon={<AddRoundedIcon fontSize="small" />}
        >
          New Candidate
        </Button>
      </Box>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmitNewVotes(selectedCandidate, votesToBeAdded);
        }}
      >
        <FormControl
          fullWidth
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "15px",
          }}
        >
          <Box sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label" size="small" required>
              Candidate
            </InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Candidate"
              value={selectedCandidate}
              onChange={(e) => setSelectedCandidate(e.target.value)}
              sx={{ minWidth: 150 }}
              size="small"
            >
              {currentCandidates.map(({ name }) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <TextField
            id="outlined-number"
            label="Votes"
            value={votesToBeAdded}
            onChange={(e) => setVotesToBeAdded(e.target.value)}
            type="number"
            size="small"
            sx={{ maxWidth: 120 }}
          />
          <Button variant="outlined" type="submit">
            Add
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}
