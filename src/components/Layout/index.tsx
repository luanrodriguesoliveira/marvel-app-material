import { Hidden, makeStyles } from '@material-ui/core';
import TopBar from './TopBar';
import NavBar from './NavBar';
import { useState } from 'react';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100vh',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 56,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256,
      paddingRight: 256,
    },
  },
  contentContainer: {
    backgroundColor: '#FFF',
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    zIndex: 2,
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
    backgroundColor: '#FFF',
  },
  backgroundContainer: {
    zIndex: -1,
    position: 'fixed',
    left: 0,
    top: 0,
    maxWidth: '100%',
    overflow: 'hidden',
    maxHeight: '100vh',
    backgroundAttachment: 'fixed',
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();

  const [navBarState, setNavBar] = useState(false);

  const changeNavBar = () => {
    setNavBar(!navBarState);
  };

  return (
    <>
      <div className={classes.root}>
        <TopBar changeNavBar={changeNavBar} />
        <NavBar navBarState={navBarState} />
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>{children}</div>
            <Box className={classes.backgroundContainer}>
              <img src="/images/wandaback.jpg" alt="" />
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}
