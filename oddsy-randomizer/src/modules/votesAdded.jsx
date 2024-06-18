import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title.js';
import { Label } from '@mui/icons-material';


function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits({ totalVotes, history }) {



  return (
    <React.Fragment>
      <Title>Votes info</Title>
      <Typography component="p" variant="h5">
        Total votes: {totalVotes}
      </Typography>
      <Typography component="p" variant="h7" sx={{mt:2, mb:1}}>
        recent changes: 
      </Typography>
      {history[0] && 
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {history[0]}
        </Typography>
      }
      {history[1] && <Typography color="text.secondary" sx={{ flex: 1, mt:-2 }}>
        {history[1]}
      </Typography>}
    </React.Fragment>
  );
}
