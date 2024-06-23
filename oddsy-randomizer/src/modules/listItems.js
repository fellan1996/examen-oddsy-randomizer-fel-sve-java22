import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";

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
    createFighterDataObj(dataArr[0], 0.0, [0.1, 1.0]),
    createFighterDataObj(dataArr[1], 0.1, [0.0, 1.0, 1.1, 0.2]),
    createFighterDataObj(dataArr[2], 0.2, [0.1, 1.2, 1.2]),
  ],
  [
    createFighterDataObj(dataArr[3], 1.0, [0.0, 0.1, 1.1, 2.0]),
    createFighterDataObj(dataArr[4], 1.1, [0.1, 1.0, 1.2, 0.2, 2.2, 2.1]),
    createFighterDataObj(dataArr[5], 1.2, [0.2, 1.1, 2.1, 2.2]),
  ],
  [
    createFighterDataObj(dataArr[6], 2.0, [1.0, 1.1, 2.1]),
    createFighterDataObj(dataArr[7], 2.1, [1.1, 1.2, 2.0, 2.2]),
    createFighterDataObj(dataArr[8], 2.2, [1.2, 2.1]),
  ],
];
//placement and neighbours exist because I might add a feature that needs it
const createFighterDataObj = (fighterData, placement, neighbours) => ({
      name: fighterData.name,
      picture: fighterData.picture,
      votes: fighterData.votes,
  })


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
        {},
        {},
        {},
        shuffledCandidatesData[0],
        {},
        {},
        {},
        {},
        {},
      ]);
    case 2:
      return createBattlefieldData([
        {},
        {},
        {},
        shuffledCandidatesData[0],
        shuffledCandidatesData[1],
        {},
        {},
        {},
        {},
      ]);
    case 3:
      return createBattlefieldData([
        {},
        shuffledCandidatesData[0],
        {},
        shuffledCandidatesData[1],
        shuffledCandidatesData[2],
        {},
        {},
        {},
        {},
      ]);
    case 4:
      return createBattlefieldData([
        {},
        shuffledCandidatesData[0],
        {},
        shuffledCandidatesData[1],
        shuffledCandidatesData[2],
        {},
        shuffledCandidatesData[3],
        {},
        {},
      ]);
    case 5:
      return createBattlefieldData([
        {},
        shuffledCandidatesData[0],
        shuffledCandidatesData[1],
        shuffledCandidatesData[2],
        shuffledCandidatesData[3],
        {},
        shuffledCandidatesData[4],
        {},
        {},
      ]);
    case 6:
      return createBattlefieldData([
        {},
        shuffledCandidatesData[0],
        shuffledCandidatesData[1],
        shuffledCandidatesData[2],
        shuffledCandidatesData[3],
        {},
        shuffledCandidatesData[4],
        shuffledCandidatesData[5],
        {},
      ]);
    case 7:
      return createBattlefieldData([
        {},
        shuffledCandidatesData[0],
        shuffledCandidatesData[1],
        shuffledCandidatesData[2],
        shuffledCandidatesData[3],
        shuffledCandidatesData[4],
        shuffledCandidatesData[5],
        shuffledCandidatesData[6],
        {},
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
        {},
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
      if (shuffledCandidatesData.length > 9){
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
      }
      else{
        return {};
      }
  }
};
