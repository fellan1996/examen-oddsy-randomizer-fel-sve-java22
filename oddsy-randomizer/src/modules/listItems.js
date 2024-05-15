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
      votes: null,
    };
  } else {
    return {
      name: fighterData.name,
      picture: fighterData.picture,
      votes: fighterData.votes,
    };
  }
};

export const initialBattlefieldSetup = (candidatesData) => {
  const shuffledIndices = createShuffledIndices(candidatesData.length);
  const shuffledCandidatesData = shuffledIndices
    .map((index) => ({
      name: candidatesData[index].name,
      picture: candidatesData[index].picture,
      votes: candidatesData[index].votes,
    }))
    .filter((obj) => obj.votes > 0);
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
      return createBattlefieldData([
        null,
        shuffledCandidatesData[0],
        shuffledCandidatesData[1],
        shuffledCandidatesData[2],
        shuffledCandidatesData[3],
        shuffledCandidatesData[4],
        shuffledCandidatesData[5],
        shuffledCandidatesData[6],
        null,
      ]);
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
      console.log("Im in here!")
      return createBattlefieldData([
        shuffledCandidatesData[0],
        shuffledCandidatesData[1],
        shuffledCandidatesData[2],
        shuffledCandidatesData[3],
        shuffledCandidatesData[4],
        shuffledCandidatesData[5],
        shuffledCandidatesData[6],
        shuffledCandidatesData[7],
        shuffledCandidatesData[8],
      ]);
    default:
      return null;
  }
};
