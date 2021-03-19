import {
  makeStyles,
  Hidden,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@material-ui/core';

import { useRouter } from 'next/router';

import HomeIcon from '@material-ui/icons/Home';
import Subscriptions from '@material-ui/icons/Subscriptions';
import Whatshot from '@material-ui/icons/Whatshot';

// const svgIcon = (
//   <Icon>
//     <img alt="edit" src="/images/cions/superhero.svg" />
//   </Icon>
// );
const primaryMenu = [
  {
    id: 1,
    label: 'Personagens',
    path: '/',
    icon: '/images/icons/superhero.png',
  },
  { id: 2, label: 'Quadrinhos', path: '/comics', icon: '/images/icons/comic.png' },
  {
    id: 3,
    label: 'Eventos',
    path: 'events',
    icon: '/images/icons/events.png',
  },
];

const useStyles = makeStyles(theme => ({
  mobileDrawer: {
    width: 240,
  },
  desktopDrawer: {
    width: 240,
    top: 56,
    height: 'calc(100% - 64px)',
    borderRight: 'none',
  },
  avatar: {
    cursor: 'pointer',
    width: 24,
    height: 24,
  },
  listItem: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: theme.spacing(3),
  },
  listItemText: {
    fontSize: 14,
  },
  listItemIcon: {
    width: 20,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const router = useRouter();

  const isSelected = item => router.pathname === item.path;

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <List>
        {primaryMenu.map(item => {
          const iconSrc = item.icon;
          return (
            <ListItem
              key={item.id}
              button
              classes={{ root: classes.listItem }}
              selected={isSelected(item)}
            >
              <ListItemIcon>
                <img className={classes.listItemIcon} src={iconSrc} />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.listItemText,
                }}
                primary={item.label}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Hidden mdDown>
      <Drawer anchor="left" classes={{ paper: classes.desktopDrawer }} open variant="persistent">
        {content}
      </Drawer>
    </Hidden>
  );
}
