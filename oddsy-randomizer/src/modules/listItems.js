import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

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
  switch(numOfCandidates) {
    case 1:
      return [1];
    case 2:
      return [2];
    case 3: 
      return [2,1];
    case 4:
      return [2,2];
    case 5: 
      return [1,2,2];
    case 6: 
      return [2,2,2];
    case 7: 
      return [3,2,2];
    case 8: 
      return [3,2,3];
    case 9: 
      return [3,3,3];
    case 10: 
      return [3,4,3];
    case 11: 
      return [3,3,3,2];
    case 12: 
      return [2,3,2,3,2];
    case 13: 
      return [2,3,3,3,2];
    case 14: 
      return [2,3,4,3,2];
    case 15: 
      return [3,3,3,3,3];
    default:
      const by5 = Math.floor(numOfCandidates/5);
      const rest = Math.floor((numOfCandidates%5));
      return [by5,by5,by5,by5,by5,rest]
    
  }
}

