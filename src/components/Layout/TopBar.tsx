import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { Hidden } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useState } from 'react';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256,
      paddingRight: 256,
    },
  },
  logo: {
    width: '100px',
    paddingLeft: '10px',
    cursor: 'pointer',
  },
  logoButton: {
    cursor: 'pointer',
  },
  toolbar: {
    minHeight: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: 35,
    width: 400,
    [theme.breakpoints.down('lg')]: {
      width: 200,
      marginLeft: 60,
    },
    [theme.breakpoints.only('xs')]: {
      width: 180,
      marginLeft: 60,
    },
  },
  input: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    paddingLeft: '130px',
  },
  buttonIcon: {
    width: '20px',
    marginRight: '10px',
  },
  menuButton: {
    color: 'white',
    zIndex: 1000,
    margin: 0,
    padding: 0,
  },
}));

export default function TopBar({ changeNavBar }) {
  const classes = useStyles();
  const router = useRouter();

  const [search, setSearch] = useState('');

  return (
    <AppBar className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Box display="flex" alignItems="center">
          <Hidden only={['lg', 'xl', 'md']}>
            <Button className={classes.menuButton} onClick={changeNavBar}>
              <MenuIcon />
            </Button>
          </Hidden>
          <Button className={classes.logoButton} onClick={() => router.push(`/`)}>
            <img className={classes.logo} src="/images/marvel-logo-white.png" />
          </Button>
        </Box>
        <Hidden only={['xs', 'sm']}>
          <Box className={classes.menu}>
            <Button color="inherit" onClick={() => router.push(`/`)}>
              {/* <img className={classes.buttonIcon} src="/images/icons/superhero.png" alt="" /> */}
              Personagens
            </Button>
            <Button color="inherit">
              {/* <img className={classes.buttonIcon} src="/images/icons/comic.png" alt="" /> */}
              Quadrinhos
            </Button>
            <Button color="inherit">
              {/* <img className={classes.buttonIcon} src="/images/icons/events.png" alt="" /> */}
              Eventos
            </Button>
          </Box>
        </Hidden>
        <Box>
          <Paper component="form" className={classes.search}>
            <InputBase
              className={classes.input}
              placeholder="Personagem"
              inputProps={{ 'aria-label': 'search google maps' }}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Button onClick={() => router.push(`/search?query=${search}`)} aria-label="search">
              <SearchIcon />
            </Button>
          </Paper>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
