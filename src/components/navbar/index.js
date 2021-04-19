import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, List, ListItem, ListItemText, Drawer } from '@material-ui/core';
import { AppBar, Toolbar, IconButton, Typography, Badge, MenuItem, Menu } from '@material-ui/core';
import { Menu as MenuIcon, Inbox as InboxIcon, AccountCircle } from '@material-ui/icons';
import logo from './../../assets/curakit-logo-white.png'; 

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  avatarMenuIcon: {
    '& span': {
      color: "#ffffff",
    }
  },
  link: {
    '& a': {
      color: '#FFF',
      marginRight: '20px',
      '&:hover': {
        textDecoration: 'none',
        color: theme.palette.secondary.main,
      } 
    }
  },
  linkWithBadge: {
    color: theme.palette.white.main,
    marginRight: '5px',
    '& span': {
      color: theme.palette.white.main,
    }
  },
  loginLink: {
    color: theme.palette.white.main,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  logo: {
    height: '100%',
    maxHeight: '30px',
  },
  pro: {
    color: 'white',
    marginLeft: '10px',
    fontWeight: '500',
    fontSize: '28px',
    fontFamily: 'montserrat',
  }
}));

export default function PrimaryAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => { setAnchorEl(event.currentTarget); };
  const handleMenuClose = () => { 
    setAnchorEl(null);
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    handleMenuClose ();
  };
  const handleLogin = () => {
    setIsLoggedIn(true);
    handleMenuClose ();
  };
  // Menu for profile when logged in
  const menuId = 'loggedin-profile-menu';

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem key="dropdown my quotes" onClick={handleMenuClose}>My Quotes</MenuItem>
      <MenuItem key="dropdown my account" onClick={handleMenuClose}>My Account</MenuItem>
      <MenuItem key="dropdown log out" onClick={handleLogout}>Log Out</MenuItem>
    </Menu>
  );
  
  const menuMobileId = 'mobile-menu';
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button key="Box Builder">
          <ListItemText primary={"Box Builder"} />
          <Badge badgeContent={4} color="secondary">
            <InboxIcon />
          </Badge>
        </ListItem>
        <ListItem button key="Quote Builder">
          <ListItemText primary={"Quote Builder"} />
          <Badge badgeContent={17} color="secondary">
            <InboxIcon />
          </Badge>
        </ListItem>
        <ListItem button key="Login" style={{display: isLoggedIn ? 'none' : 'block'  }} onClick={handleLogin}>
          <ListItemText primary={"Login"} />
        </ListItem>
        <ListItem button key="My Quotes" style={{display: isLoggedIn ? 'block' : 'none' }} >
          <ListItemText primary={"My Quotes"} />
        </ListItem>
        <ListItem button key="My Account" style={{display: isLoggedIn ? 'block' : 'none' }}>
          <ListItemText primary={"My Account"} />
        </ListItem>
        <ListItem button key="Log Out" style={{display: isLoggedIn ? 'block' : 'none' }} onClick={handleLogout}>
          <ListItemText primary={"Log Out"} />
        </ListItem>
      </List>
    </div>
  );
  const anchor = 'top';
  // const preventDefault = (event) => event.preventDefault();
  
  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <Box>
            <img src={logo} alt='curakit-logo' className={classes.logo}/>
          </Box>
          <Typography component="h1" className={classes.pro}>
            PRO
          </Typography>
          <div className={classes.grow}></div>
          <div className={classes.sectionDesktop}>
            <Button aria-label="show 4 new mails" className={classes.linkWithBadge}>
              <Badge badgeContent={4} color="secondary">
                Box Builder<InboxIcon />
              </Badge>
            </Button>
            <Button aria-label="show 17 new notifications" className={classes.linkWithBadge}>
              <Badge badgeContent={17} color="secondary">
                Quote Builder<InboxIcon />
              </Badge>
            </Button>
            <Button 
              color="inherit" 
              style={{display: isLoggedIn ? 'none' : 'block' }} 
              onClick={handleLogin}
              className={classes.loginLink}
            >
              Login
            </Button>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              style={{display: isLoggedIn ? 'block' : 'none' }}
              className={classes.avatarMenuIcon}
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={menuMobileId}
              aria-haspopup="true"
              onClick={toggleDrawer(anchor, true)}
              color="secondary"
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              {list(anchor)}
            </Drawer>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
