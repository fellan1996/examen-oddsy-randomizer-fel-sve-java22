import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title.js';
import { db } from "../firebase.js";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  getDoc,
  getDocs,
} from "@firebase/firestore";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [totalVotes, setTotalVotes] = React.useState(0);

  const updateCurrentCandidates = async () => {
    const docRefCandidates = collection(db, "candidates");
    try {

      const documents = await getDocs(docRefCandidates);
      console.log(documents);
      let votes = 0;
      documents.forEach(doc => 
        votes += doc.data().votes
      );
      // setTotalVotes(5);
      setTotalVotes(votes);
      console.log(totalVotes);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    updateCurrentCandidates();
  }, []);

  return (
    <React.Fragment>
      <Title>Votes added</Title>
      <Typography component="p" variant="h4">
        Total: {totalVotes}
      </Typography>
      <Typography component="p" variant="h6">
        History: 
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        2 votes to Copenhagen
      </Typography>
    </React.Fragment>
  );
}
