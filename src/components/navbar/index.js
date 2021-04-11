import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Link, Typography, Toolbar, AppBar, Button, IconButton, MenuIcon } from '@material-ui/core';
import logo from './../../assets/curakit-logo-white.png'; 

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(2),
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
  logo: {
    height: '100%',
    maxHeight: '30px',
  },
  navbarItems: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
}));

export default function Navbar() {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();

  return (
    <div className={classes.root}>
    <AppBar position="fixed">
      <Toolbar>
        {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton> */}
        <Box>
          <img src={logo} alt='curakit-logo' className={classes.logo}/>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end" alignItems="center">
          <Typography className={classes.link}>
            <Link href="#" onClick={preventDefault}>
              ABOUT
            </Link>
            <Link href="#" onClick={preventDefault}>
              FOR BUSINESS
            </Link>
            <Link href="#" onClick={preventDefault}>
              SHOP
            </Link>
            <Link href="#" onClick={preventDefault}>
              CONTACT
            </Link>
          </Typography>
          <Button color="inherit" disabled>Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  </div>
  )
}