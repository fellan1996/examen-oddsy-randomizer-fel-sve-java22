import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
export default function createShuffledIndices(numOfCandidates) {
  const shuffledIndices = [];
  Array.from({ length: numOfCandidates }).map((_, index ) => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random()*numOfCandidates);
    } while (shuffledIndices.includes(randomIndex));
    shuffledIndices.push(randomIndex);
  })
  return shuffledIndices;
}
export const blabla = (candidatesData) => {
  return candidatesData[0].name;
}

export const initialBattlefieldSetup = (candidatesData) => {
  const shuffledIndices = createShuffledIndices(candidatesData.length);
  const shuffledCandidatesData = shuffledIndices.map((index) => (
    {name: candidatesData[index].name,
      picture: candidatesData[index].picture,
      votes: candidatesData[index].votes
    }
  )
)
  switch (shuffledCandidatesData.length) {
    case 1:
      return [1];
    case 2:
      return [2];
    case 3:
      return [2, 1];
    case 4:
      return [2, 2];
    case 5:
      return [1, 2, 2];
    case 6:
      return [2, 2, 2];
    case 7:
      return [
        [
          {
            placement: 0.0,
            name: null,
            neighbours: [0.1, 1.0],
            picture: null,
            votes: null,
          },
          {
            placement: 0.1,
            name: shuffledCandidatesData[0].name,
            neighbours: [0.0, 1.0, 1.1, 0.2],
            picture: shuffledCandidatesData[0].picture,
            votes: shuffledCandidatesData[0].votes,
          },
          {
            placement: 0.2,
            name: shuffledCandidatesData[1].name,
            neighbours: [0.1, 1.1, 1.2],
            picture:
              shuffledCandidatesData[1].picture,
            votes: shuffledCandidatesData[1].votes,
          },
        ],
        [
          {
            placement: 1.0,
            name: shuffledCandidatesData[2].name,
            neighbours: [0.0, 0.1, 1.1, 2.0, 2.1],
            picture:
              shuffledCandidatesData[2].picture,
            votes: shuffledCandidatesData[2].votes,
          },
          {
            placement: 1.1,
            name: shuffledCandidatesData[3].name,
            neighbours: [0.1, 0.2, 1.0, 1.2, 2.1, 2.2],
            picture:
              shuffledCandidatesData[3].picture,
            votes: shuffledCandidatesData[3].votes,
          },
          {
            placement: 1.2,
            name: shuffledCandidatesData[4].name,
            neighbours: [0.2, 1.1, 2.2],
            picture:
              shuffledCandidatesData[4].picture,
              votes: shuffledCandidatesData[4].votes,
          },
        ],
        [
          {
            placement: 2.0,
            name: shuffledCandidatesData[5].name,
            neighbours: [1.0, 2.1],
            picture:
            shuffledCandidatesData[5].picture,
            votes: shuffledCandidatesData[5].votes,
          },
          {
            placement: 2.1,
            name: shuffledCandidatesData[6].name,
            neighbours: [1.0, 1.1, 2.0, 2.2],
            picture:
              shuffledCandidatesData[6].picture,
            votes: shuffledCandidatesData[6].votes,
          },
          {
            placement: 2.2,
            name: null,
            neighbours: [1.1, 1.2, 2.1],
            picture: null,
            votes: null,
          },
        ],
      ];
    case 8:
      return [3, 2, 3];
    case 9:
      return [3, 3, 3];
    case 10:
      return [3, 4, 3];
    case 11:
      return [3, 3, 3, 2];
    case 12:
      return [2, 3, 2, 3, 2];
    case 13:
      return [2, 3, 3, 3, 2];
    case 14:
      return [2, 3, 4, 3, 2];
    case 15:
      return [3, 3, 3, 3, 3];
    default:
      const by5 = Math.floor(candidatesData.length / 5);
      const rest = Math.floor(candidatesData.length % 5);
      return [by5, by5, by5, by5, by5, rest];
  }
}
