import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title.js';


function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits({ totalVotes }) {



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
