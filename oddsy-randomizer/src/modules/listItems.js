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

export default function initialBattlefieldApproach(numOfCandidates) {
  switch (numOfCandidates) {
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
            name: "Tin",
            neighbours: [0.0, 1.0, 1.1, 0.2],
            picture:
              "https://firebasestorage.googleapis.com/v0/b/oddsy-randomizer.appspot.com/o/images%2Fnorway%20landscape.jpg?alt=media&token=cf370874-4c1f-402c-9231-107f7d390492",
            votes: 5,
          },
          {
            placement: 0.2,
            name: "Christian",
            neighbours: [0.1, 1.1, 1.2],
            picture:
              "https://firebasestorage.googleapis.com/v0/b/oddsy-randomizer.appspot.com/o/images%2Fnordic%20landscape.jpg?alt=media&token=e2fae026-3fda-477a-86f6-5ec425d1abcc",
            votes: 6,
          },
        ],
        [
          {
            placement: 1.0,
            name: "Felix",
            neighbours: [0.0, 0.1, 1.1, 2.0, 2.1],
            picture:
              "https://firebasestorage.googleapis.com/v0/b/oddsy-randomizer.appspot.com/o/images%2Fchilling.png?alt=media&token=5224d64c-67d9-4cc8-87a4-f469f46a61c6",
            votes: 3,
          },
          {
            placement: 1.1,
            name: "Rafa",
            neighbours: [0.1, 0.2, 1.0, 1.2, 2.1, 2.2],
            picture:
              "https://firebasestorage.googleapis.com/v0/b/oddsy-randomizer.appspot.com/o/images%2Fmadrid.jpg?alt=media&token=e172ad43-0eb2-4095-97ac-500168a6bfdd",
            votes: 4,
          },
          {
            placement: 1.2,
            name: "Anna",
            neighbours: [0.2, 1.1, 2.2],
            picture:
              "https://firebasestorage.googleapis.com/v0/b/oddsy-randomizer.appspot.com/o/images%2Fcalm_lake.jpg?alt=media&token=9d430980-865b-4c97-9935-ff5bf46a1cb7",
            votes: 5,
          },
        ],
        [
          {
            placement: 2.0,
            name: "Holm",
            neighbours: [1.0, 2.1],
            picture:
              "https://firebasestorage.googleapis.com/v0/b/oddsy-randomizer.appspot.com/o/images%2Fberlin.jpg?alt=media&token=eac5cffe-57f4-4638-8a17-5b9ec94b87af",
            votes: 6,
          },
          {
            placement: 2.1,
            name: "Björn",
            neighbours: [1.0, 1.1, 2.0, 2.2],
            picture:
              "https://firebasestorage.googleapis.com/v0/b/oddsy-randomizer.appspot.com/o/images%2Ftomater.jpg?alt=media&token=7dc92f3f-a0b2-41ef-b25f-71cc1de41a4f",
            votes: 6,
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
      const by5 = Math.floor(numOfCandidates / 5);
      const rest = Math.floor(numOfCandidates % 5);
      return [by5, by5, by5, by5, by5, rest];
  }
}
