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
  const [selectedCandidateCurrentVotes, setSelectedCandidateCurrentVotes] = useState(0);

  //skapa state som innehåller alla candidates.
  let docRefVotes;
  let docRefCandidates;

  const updateselectedCandidateCurrentVotes = async () => {
    try {
      const docSnap = await getDoc(docRefVotes);
      if (docSnap.exists()) {
        const data = docSnap.data();

        setSelectedCandidateCurrentVotes(parseInt(data.votes)); // Updating the selectedCandidateCurrentVotes state
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

  const updateCurrentCandidates = async () => {
    const candidatesNames = [];
    try {
      console.log(docRefCandidates);
      const documents = await getDocs(docRefCandidates);
      documents.forEach((doc) => {
        candidatesNames.push(doc.id);
      });
      console.log(candidatesNames);
      setCurrentCandidates(candidatesNames); // updating the currentCandidates state
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (selectedCandidate) {
      docRefVotes = doc(db, "candidates", selectedCandidate);
      updateselectedCandidateCurrentVotes();
    }
  }, [selectedCandidate]);

  useEffect(() => {
    docRefCandidates = collection(db, "candidates");
    updateCurrentCandidates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTotal = parseInt(selectedCandidateCurrentVotes) + parseInt(votesToBeAdded);
    try {
      docRefVotes = doc(db, "candidates", selectedCandidate);
      await updateDoc(docRefVotes, {
        votes: newTotal,
      });
    } catch (e) {
      console.log(e);
    }
    docRefVotes = doc(db, "candidates", selectedCandidate);
    updateselectedCandidateCurrentVotes();
    handleSubmitNewVotes();
  };

  const handleSubmitNewCandidate = async (e) => {
    e.preventDefault();
    updateCurrentCandidates();
  }

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
              {currentCandidates.map((candidate) => (
                <MenuItem key={candidate} value={candidate}>
                  {candidate}
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
