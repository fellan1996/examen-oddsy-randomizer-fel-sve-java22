import * as React from 'react';
import Box from '@mui/material/Box';
import Dashboard from './modules/Dashboard.js';
import { db } from "./firebase.js";
import {
  collection,
  doc,
  updateDoc,
  getDocs,
  deleteDoc
} from "@firebase/firestore";

export default function App() {
  const [totalVotes, setTotalVotes] = React.useState(0);
  const [candidatesData, setCandidatesData] = React.useState([]);
  const [history, setHistory] = React.useState([]);
  const [pageToShow, setPageToShow] = React.useState("creator");
  

  const updateTotalVotes = (tempCandidatesData) => {
      let sumOfVotes = 0;
      tempCandidatesData.forEach(({votes}) => 
      sumOfVotes += votes
      );
      setTotalVotes(sumOfVotes);
  };

  const updateCandidatesData = async () => {
    const docRefCandidates = collection(db, "candidates");
    const tempCandidatesData = [];
    try {
      console.log(docRefCandidates);
      const documents = await getDocs(docRefCandidates);
      documents.forEach((doc) => {
        tempCandidatesData.push({name: doc.id, picture: doc.data().picture, votes: doc.data().votes});
      });
      setCandidatesData(tempCandidatesData.sort((a, b) => b.votes - a.votes)); // updating the candidatesData state
      updateTotalVotes(tempCandidatesData);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmitNewVotes = async (selectedCandidateName, addedVotes) => {
    const selectedCandidateObj = candidatesData.find(candidateData => candidateData.name === selectedCandidateName);
    const newTotal = selectedCandidateObj.votes + parseInt(addedVotes);
    
    try {
      const docRefVotes = doc(db, "candidates", selectedCandidateName);
      await updateDoc(docRefVotes, {
        votes: newTotal,
      });
    } catch (e) {
      console.log(e);
    }
    updateCandidatesData();

    const tempHistory = history;
    tempHistory.unshift(`${addedVotes} votes added to ${selectedCandidateName}`);
    setHistory(tempHistory);
  };

  async function handleDeleteCandidate(candidate) {
    await deleteDoc(doc(db, "candidates", candidate))
    await updateCandidatesData();
    console.log(`${candidate} has been deleted`);
  }


  React.useEffect(() => {
    updateCandidatesData();
  }, []);

  return (
      <Box>
      <Dashboard totalVotes={totalVotes} pageToShow={pageToShow} candidatesData={candidatesData} setPageToShow={(page) => setPageToShow(page)} updateCandidatesData={updateCandidatesData} history={history} handleSubmitNewVotes={handleSubmitNewVotes} deleteCandidate={handleDeleteCandidate} />
      </Box>
  );
}
