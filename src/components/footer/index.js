import React from 'react';
// import { useEffect } from 'react'
import { Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
  },
}));

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