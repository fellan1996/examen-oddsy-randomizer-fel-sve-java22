import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

// Generate Order Data


export default function Orders({ candidatesData, deleteCandidate }) {

  function handleDelete(e) {
    e.preventDefault();
    //add an alert to make sure that the user intended to press this button
    deleteCandidate(e);

  }

  return (
    <React.Fragment>
      <Title>Candidates</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ranking</TableCell>
            <TableCell>Picture</TableCell>
            <TableCell>Candidate</TableCell>
            <TableCell>Votes</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidatesData.map((candidate, index) => (
            <TableRow key={candidate.name}>
              <TableCell>{index+1}</TableCell>
              <TableCell>temporary</TableCell>
              <TableCell>{candidate.name}</TableCell>
              <TableCell>{candidate.votes}</TableCell>
              <TableCell align="right">
              <IconButton variant="text" onClick={() => deleteCandidate(candidate.name)} value={candidate}>
                <DeleteIcon />
              </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
