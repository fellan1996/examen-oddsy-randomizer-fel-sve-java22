import { useEffect, useState } from "react";
import { db } from "../firebase.js";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  getDoc,
} from "@firebase/firestore";
import { useTheme } from "@mui/material/styles";
import Title from "./Title";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";

export default function Form() {
  const theme = useTheme();
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [votesToBeAdded, setVotesToBeAdded] = useState(0);
  const [currentVotes, setCurrentVotes] = useState(0);
  let docRef;

  const updateCurrentVotes = async () => {
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCurrentVotes(parseInt(data.votes));
        console.log(
          "current votes for " + selectedCandidate + ": " + data.votes
        );
      } else {
        console.log("No such document!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (selectedCandidate) {
      docRef = doc(db, "candidates", selectedCandidate);
      updateCurrentVotes();
    }
  }, [selectedCandidate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTotal = parseInt(currentVotes) + parseInt(votesToBeAdded);
    try {
      docRef = doc(db, "candidates", selectedCandidate);
      await updateDoc(docRef, {
        votes: newTotal,
      });
    } catch (e) {
      console.log(e);
    }
    docRef = doc(db, "candidates", selectedCandidate);
    updateCurrentVotes();
  };

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
      <form onSubmit={handleSubmit}>
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
              onChange={(e) => setSelectedCandidate(e.target.value)}
              sx={{ minWidth: 150 }}
              size="small"
            >
              <MenuItem value={"Berlin"}>Berlin</MenuItem>
              <MenuItem value={"Stockholm"}>Stockholm</MenuItem>
              <MenuItem value={"Moscow"}>Moscow</MenuItem>
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
