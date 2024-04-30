import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './ProTip';
import Dashboard from './modules/Dashboard.js';
import { db } from "./firebase.js";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  getDoc,
  getDocs,
} from "@firebase/firestore";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  const [totalVotes, setTotalVotes] = React.useState(0);
  const [currentCandidates, setCurrentCandidates] = React.useState([]);
  

  const getTotalVotes = async () => {
    const docRefCandidates = collection(db, "candidates");
    try {

      const documents = await getDocs(docRefCandidates);
      console.log(documents);
      let votes = 0;
      documents.forEach(doc => 
        votes += doc.data().votes
      );
      setTotalVotes(votes);
      console.log(totalVotes);
    } catch (e) {
      console.log(e);
    }
  };

  const updateCurrentCandidates = async () => {
    const docRefCandidates = collection(db, "candidates");
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
  const handleSubmitNewVotes = () => {
    getTotalVotes();
  };

  React.useEffect(() => {
    getTotalVotes();
  }, []);
  React.useEffect(() => {
    updateCurrentCandidates();
  }, []);

  return (
      <Box>
      <Dashboard totalVotes={totalVotes} currentCandidates={currentCandidates} handleSubmitNewVotes={handleSubmitNewVotes}/>
      </Box>
  );
}
