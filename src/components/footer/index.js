import React from 'react';
// import { useEffect } from 'react'
import { Typography, Link } from '@material-ui/core';
import useStyles from './style';
import FavoriteIcon from '@material-ui/icons/Favorite';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://curakit.com/" target="_blank">
        Curakit
      </Link>
      {' '}{new Date().getFullYear()}{'. Made with'}
      <Link color="inherit" href="https://www.cosmike.com/" target="_blank">
        <FavoriteIcon fontSize="small" color="secondary" />
      </Link>
    </Typography>
  );
}

export default function Footer() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </React.Fragment>
  );
}