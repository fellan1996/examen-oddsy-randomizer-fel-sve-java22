import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Avatar from '@mui/material/Avatar';

export default function CandidatesTable({ candidatesData, deleteCandidate }) {

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
              <TableCell><Avatar src={candidate.picture} alt={candidate.name + "profile picture"} /></TableCell>
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
