import * as React from "react";
import Box from "@mui/material/Box";
import Dashboard from "./modules/Dashboard.js";
import { db } from "./firebase.js";
import {
  collection,
  doc,
  updateDoc,
  getDocs,
  deleteDoc,
} from "@firebase/firestore";
import { ThemeProvider, styled, createTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  secondaryListItems,
  initialBattlefieldSetup,
} from "./modules/listItems";
import Arena from "./modules/Arena.jsx";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StadiumIcon from "@mui/icons-material/Stadium";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const theme = createTheme();

export default function App() {
  const [totalVotes, setTotalVotes] = React.useState(0);
  const [candidatesData, setCandidatesData] = React.useState([]);
  const [history, setHistory] = React.useState([]);
  const [pageToShow, setPageToShow] = React.useState("creator");
  const [open, setOpen] = React.useState(true);
  const [initBattlefieldArr, setInitBattlefieldArr] = React.useState([]);
  const [challengerOne, setChallengerOne] = React.useState({});
  const [challengerTwo, setChallengerTwo] = React.useState({});
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  async function handleBattle(challengerOneOdds) {
    try {
      // Assume challengerOneOdds is a property of challengerOne
      const randomResult = Math.random() * 100;
      const aWinnerIsToBeAnnounced = candidatesData.length === 2;
      console.log(
        `${challengerOne.name} -- ${challengerOneOdds} -- ${randomResult}`
      );
      const challengerOneWon = randomResult < challengerOneOdds;
      aWinnerIsToBeAnnounced ? setDialogOpen(true) : setDialogOpen(false);
      if (challengerOneWon) {
        await handleSubmitNewVotes(challengerOne.name, challengerTwo.votes);
        await handleDeleteCandidate(challengerTwo.name);
      } else {
        await handleSubmitNewVotes(challengerTwo.name, challengerOne.votes);
        await handleDeleteCandidate(challengerOne.name);
      }
    } catch (error) {
      console.error("Error handling battle:", error);
    }
  }

  function handleCandidateClick(clickedCandidate) {
    if (!challengerOne.name) {
      setChallengerOne({
        name: clickedCandidate.name,
        picture: clickedCandidate.picture,
        votes: clickedCandidate.votes,
      });
    } else {
      setChallengerTwo({
        name: clickedCandidate.name,
        picture: clickedCandidate.picture,
        votes: clickedCandidate.votes,
      });
    }
  }

  const handleSetBattlefield = () => {
    setInitBattlefieldArr(initialBattlefieldSetup(candidatesData));
    setChallengerOne({});
    setChallengerTwo({});
  };

  const updateTotalVotes = (tempCandidatesData) => {
    let sumOfVotes = 0;
    tempCandidatesData.forEach(({ votes }) => (sumOfVotes += votes));
    setTotalVotes(sumOfVotes);
  };

  const updateCandidatesData = async () => {
    const docRefCandidates = collection(db, "candidates");
    const tempCandidatesData = [];
    try {
      const documents = await getDocs(docRefCandidates);
      documents.forEach((doc) => {
        tempCandidatesData.push({
          name: doc.id,
          picture: doc.data().picture,
          votes: doc.data().votes,
        });
      });
      setCandidatesData(tempCandidatesData.sort((a, b) => b.votes - a.votes)); // updating the candidatesData state
      updateTotalVotes(tempCandidatesData);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmitNewVotes = async (selectedCandidateName, addedVotes) => {
    const selectedCandidateObj = candidatesData.find(
      (candidateData) => candidateData.name === selectedCandidateName
    );
    const newTotal = selectedCandidateObj.votes + parseInt(addedVotes);

    try {
      const docRefVotes = doc(db, "candidates", selectedCandidateName);
      await updateDoc(docRefVotes, {
        votes: newTotal,
      });
    } catch (e) {
      console.log(e);
    }
    await updateCandidatesData();

    const tempHistory = history;
    tempHistory.unshift(
      `${addedVotes} votes added to ${selectedCandidateName}`
    );
    setHistory(tempHistory);
  };

  async function handleDeleteCandidate(candidateName) {
    try {
      await deleteDoc(doc(db, "candidates", candidateName));
      await updateCandidatesData();
      console.log(`${candidateName} has been deleted`);
    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    updateCandidatesData();
  }, []);

  React.useEffect(() => {
    handleSetBattlefield();
  }, [candidatesData]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="absolute"
          open={open}
          color={pageToShow === "arena" ? "warning" : "primary"}
        >
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Oddsy-Randomizer
            </Typography>
            <IconButton color="inherit">
              {/* <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge> */}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton onClick={() => setPageToShow("creator")}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Creator" />
            </ListItemButton>
            <ListItemButton onClick={() => setPageToShow("arena")}>
              <ListItemIcon>
                <StadiumIcon />
              </ListItemIcon>
              <ListItemText primary="Arena" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {pageToShow === "creator" ? (
            <Dashboard
              totalVotes={totalVotes}
              pageToShow={pageToShow}
              candidatesData={candidatesData}
              setPageToShow={(page) => setPageToShow(page)}
              updateCandidatesData={updateCandidatesData}
              history={history}
              handleSubmitNewVotes={handleSubmitNewVotes}
              deleteCandidate={handleDeleteCandidate}
            />
          ) : pageToShow === "arena" ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 45,
                }}
              >
                <Typography variant="h1">Welcome to the arena!</Typography>
              </div>
              <Arena
                initBattlefieldArr={initBattlefieldArr}
                handleBattle={handleBattle}
                challengerOne={challengerOne}
                challengerTwo={challengerTwo}
                handleCandidateClick={handleCandidateClick}
              />
            </>
          ) : (
            <h1>Something went wrong</h1>
          )}
        </Box>
      </Box>
      <Dialog open={!!dialogOpen} onClose={() => setDialogOpen(false)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 250,
            minHeight: 250,
            padding: 7,
            boxShadow: "inset 0 0 15px 15px orange",
          }}
        >
          <Typography variant="h2" color="success">
            Winner!!
          </Typography>
          <Avatar
            src={candidatesData[0].picture}
            alt={candidatesData[0].name + " picture"}
            sx={{
              width: 180,
              height: 180,
              borderRadius: 100,
              boxShadow: "0 0 15px orange",
            }}
          />
          <Typography variant="h2" color="success">
            {candidatesData[0].name}
          </Typography>
        </Box>
      </Dialog>
    </ThemeProvider>
  );
}
