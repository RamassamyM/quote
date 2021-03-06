import React from 'react';
import clsx from 'clsx';
import useStyles from './style';
import { useLocation } from "react-router-dom";
import { Link, Tooltip, Box, Button, List, ListItem, ListItemText, Drawer } from '@material-ui/core';
import { AppBar, Toolbar, IconButton, Typography, Badge, MenuItem, Menu } from '@material-ui/core';
import { Home as HomeIcon, Clear as ClearIcon, Menu as MenuIcon, ExitToApp as ExitToAppIcon, Inbox as InboxIcon, AccountCircle } from '@material-ui/icons';
// import logo from './../../assets/curakit-logo-blue.png'; 
import { useSelector, useDispatch } from 'react-redux';
import { selectBoxNumberOfItems } from './../../containers/box-builder-page/boxSlice';
import { selectNumberOfBoxTypesInQuote } from './../../containers/quote-builder-page/quoteSlice';
import { toggleVideoModalDisplay } from '../popup-banner-free-sample/freeSampleSlice';
import { Link as RouterLink } from 'react-router-dom'
import ElevationScroll from './../elevationScroll';

export default function PrimaryAppBar(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const boxNumberOfItems = useSelector(selectBoxNumberOfItems) || 0;
  const quoteNumberOfBoxTypes = useSelector(selectNumberOfBoxTypesInQuote) || 0;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
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
  const handleRedirectToWebsite = () =>  {
    window.location.href = 'https://www.curakit.com';
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

  const handleGetFreeSampleClick = (event) => {
    event.preventDefault(); 
    console.log('clicked on Free sample link');
    dispatch(toggleVideoModalDisplay());
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box display="flex" justifyContent="flex-end" mr={2}>
        <IconButton
          aria-label="Close"
          edge="end"
          onClick={() => toggleDrawer(anchor, false)}
          className={classes.iconClose}
        >
          <ClearIcon fontSize="large"/>
        </IconButton>
      </Box>
      <List>
        <ListItem button component={RouterLink} to="/box-ideas" key="Box Ideas">
          <ListItemText primary={"Box Ideas"} className={classes.linkInMenu}/>
          <InboxIcon color="primary"/>
        </ListItem>
        <ListItem button component={RouterLink} to="/box-builder" key="Box Builder">
          <ListItemText primary={"Box Builder"} className={classes.linkInMenu}/>
          <Badge badgeContent={boxNumberOfItems} color="error">
            <InboxIcon color="primary"/>
          </Badge>
        </ListItem>
        <ListItem button component={RouterLink} to="/quote-builder" key="Quote Builder">
          <ListItemText primary={"Quote Builder"} className={classes.linkInMenu}/>
          <Badge badgeContent={quoteNumberOfBoxTypes} color="error">
            <InboxIcon color="primary"/>
          </Badge>
        </ListItem>
        {/* <ListItem button onClick={handleGetFreeSampleClick} key="Free Sample Popup">
          <ListItemText primary={"Get a free Sample"} className={classes.linkInMenu}/>
          <Box>
            <img src={'https://firebasestorage.googleapis.com/v0/b/curakit-7e00d.appspot.com/o/gift.png?alt=media&token=b9eee068-ab40-41c0-8cb4-edd6d513c3f8'} alt='free-sample-button' className={classes.freeSample}/>
          </Box>
        </ListItem> */}
        <ListItem button href="https://www.curakit.com" key="Back to Curakit Website" onClick={handleRedirectToWebsite}>
          <ListItemText primary={"Back to Curakit website"} className={classes.linkInMenu}/>
          <ExitToAppIcon color="primary"/>
        </ListItem>
        <ListItem button disabled key="Login" style={{display: isLoggedIn ? 'none' : 'block'  }} onClick={handleLogin}>
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
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar position="fixed" color="inherit">
          <Toolbar>
            <Link href="https://www.curakit.com" target="_blank">
              <Box>
                <img src="https://firebasestorage.googleapis.com/v0/b/curakit-7e00d.appspot.com/o/Curakit%20logotype%20v2%20blue.png?alt=media&token=f087db76-8205-4e88-890f-2210227dff7e" alt='curakit-logo' className={classes.logo}/>
              </Box>
            </Link>
              <Typography component="h1" className={classes.pro}>
                for business
              </Typography>
            <div className={classes.grow}></div>
            <div className={classes.sectionDesktop}>
              <Button 
                component={RouterLink} 
                to="/box-ideas" 
                aria-label="link to box ideas page" 
                className={clsx(classes.linkWithBadge, {
                  [classes.linkSelected]: location === "/box-ideas",
                })}
              >
                Box Ideas&nbsp;&nbsp;
              </Button>
              <Button 
                component={RouterLink} 
                to="/box-builder" 
                aria-label="link to box builder page" 
                className={clsx(classes.linkWithBadge, {
                  [classes.linkSelected]: location === "/box-builder",
                })}
              >
                <Badge badgeContent={boxNumberOfItems} color="error">
                  Box Builder&nbsp;&nbsp;
                </Badge>
              </Button>
              <Button 
                component={RouterLink} 
                to="/quote-builder" 
                aria-label="link to quote builder page" 
                className={clsx(classes.linkWithBadge, {
                  [classes.linkSelected]: location === "/quote-builder",
                })}
              >
                <Badge badgeContent={quoteNumberOfBoxTypes} color="error">
                  Quote Builder&nbsp;&nbsp;
                </Badge>
              </Button>
              {/* <Tooltip title="Get a free sample box" aria-label="Get a free sample box">
                <Link onClick={handleGetFreeSampleClick}>
                  <Box>
                    <img src={'https://firebasestorage.googleapis.com/v0/b/curakit-7e00d.appspot.com/o/gift.png?alt=media&token=b9eee068-ab40-41c0-8cb4-edd6d513c3f8'} alt='free-sample-button' className={classes.freeSample}/>
                  </Box>
                </Link>
              </Tooltip> */}
              <Button 
                color="inherit" 
                style={{display: isLoggedIn ? 'none' : 'block' }} 
                onClick={handleLogin}
                className={classes.loginLink}
                disabled
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
              <IconButton
                edge="end"
                aria-label="Exit builder"
                onClick={handleRedirectToWebsite}
                color="inherit"
                className={clsx(classes.linkWithBadge)}
              >
                <HomeIcon/>
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={menuMobileId}
                aria-haspopup="true"
                onClick={toggleDrawer(anchor, true)}
                color="inherit"
                >
                <MenuIcon />
              </IconButton>
              <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
              </Drawer>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar/>
      {renderMenu}
    </React.Fragment>
  );
}
