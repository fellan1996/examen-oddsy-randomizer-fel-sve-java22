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
function createShuffledIndices(numOfCandidates) {
  const shuffledIndices = [];
  Array.from({ length: numOfCandidates }).map(() => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * numOfCandidates);
    } while (shuffledIndices.includes(randomIndex));
    shuffledIndices.push(randomIndex);
  });
  return shuffledIndices;
}
const createBattlefieldData = (dataArr) => [
  [
    createFighterDataObj(dataArr[0]),
    createFighterDataObj(dataArr[1]),
    createFighterDataObj(dataArr[2]),
  ],
  [
    createFighterDataObj(dataArr[3]),
    createFighterDataObj(dataArr[4]),
    createFighterDataObj(dataArr[5]),
  ],
  [
    createFighterDataObj(dataArr[6]),
    createFighterDataObj(dataArr[7]),
    createFighterDataObj(dataArr[8]),
  ],
];
const createFighterDataObj = (fighterData) => {
  if (fighterData === null) {
    return {
      name: null,
      picture: null,
      votes: null
    };
  } else {
    return {
      name: fighterData.name,
      picture: fighterData.picture,
      votes: fighterData.votes
    };
  }
};


export const initialBattlefieldSetup = (candidatesData) => {
  const shuffledIndices = createShuffledIndices(candidatesData.length);
  const shuffledCandidatesData = shuffledIndices.map((index) => ({
    name: candidatesData[index].name,
    picture: candidatesData[index].picture,
    votes: candidatesData[index].votes,
  }));
  switch (shuffledCandidatesData.length) {
    case 1:
      return createBattlefieldData([
        null,
        null,
        null,
        null,
        shuffledCandidatesData[0],
        null,
        null,
        null,
        null,
      ]);
    case 2:
      return createBattlefieldData([
        null,
        shuffledCandidatesData[0],
        null,
        null,
        shuffledCandidatesData[1],
        null,
        null,
        null,
        null,
      ]);
    case 3:
      return createBattlefieldData([
        null,
        shuffledCandidatesData[0],
        null,
        shuffledCandidatesData[1],
        shuffledCandidatesData[2],
        null,
        null,
        null,
        null,
      ]);
    case 4:
      return createBattlefieldData([
        null,
        shuffledCandidatesData[0],
        null,
        shuffledCandidatesData[1],
        shuffledCandidatesData[2],
        null,
        shuffledCandidatesData[3],
        null,
        null,
      ]);
    case 5:
      return createBattlefieldData([
        null,
        shuffledCandidatesData[0],
        shuffledCandidatesData[1],
        shuffledCandidatesData[2],
        shuffledCandidatesData[3],
        null,
        shuffledCandidatesData[4],
        null,
        null,
      ]);
    case 6:
      return createBattlefieldData([
        null,
        shuffledCandidatesData[0],
        shuffledCandidatesData[1],
        shuffledCandidatesData[2],
        shuffledCandidatesData[3],
        null,
        shuffledCandidatesData[4],
        shuffledCandidatesData[5],
        null,
      ]);
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
            picture: shuffledCandidatesData[1].picture,
            votes: shuffledCandidatesData[1].votes,
          },
        ],
        [
          {
            placement: 1.0,
            name: shuffledCandidatesData[2].name,
            neighbours: [0.0, 0.1, 1.1, 2.0, 2.1],
            picture: shuffledCandidatesData[2].picture,
            votes: shuffledCandidatesData[2].votes,
          },
          {
            placement: 1.1,
            name: shuffledCandidatesData[3].name,
            neighbours: [0.1, 0.2, 1.0, 1.2, 2.1, 2.2],
            picture: shuffledCandidatesData[3].picture,
            votes: shuffledCandidatesData[3].votes,
          },
          {
            placement: 1.2,
            name: shuffledCandidatesData[4].name,
            neighbours: [0.2, 1.1, 2.2],
            picture: shuffledCandidatesData[4].picture,
            votes: shuffledCandidatesData[4].votes,
          },
        ],
        [
          {
            placement: 2.0,
            name: shuffledCandidatesData[5].name,
            neighbours: [1.0, 2.1],
            picture: shuffledCandidatesData[5].picture,
            votes: shuffledCandidatesData[5].votes,
          },
          {
            placement: 2.1,
            name: shuffledCandidatesData[6].name,
            neighbours: [1.0, 1.1, 2.0, 2.2],
            picture: shuffledCandidatesData[6].picture,
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
      return createBattlefieldData([
        shuffledCandidatesData[0],
        shuffledCandidatesData[1],
        shuffledCandidatesData[2],
        shuffledCandidatesData[3],
        shuffledCandidatesData[4],
        shuffledCandidatesData[5],
        shuffledCandidatesData[6],
        shuffledCandidatesData[7],
        null,
      ]);
    case 9:
      return createBattlefieldData([
        shuffledCandidatesData[0],
        shuffledCandidatesData[1],
        shuffledCandidatesData[2],
        shuffledCandidatesData[3],
        shuffledCandidatesData[4],
        shuffledCandidatesData[5],
        shuffledCandidatesData[6],
        shuffledCandidatesData[7],
        shuffledCandidatesData[9],
      ]);
    default:
      return createBattlefieldData([
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ]);
  }
};
