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
      <Link color="inherit" href="https://curakit.com/">
        Curakit
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Made by cosmike.com with 
          <FavoriteIcon fontSize="small" color="secondary" />
        </Typography>
        <Copyright />
      </footer>
    </React.Fragment>
  );
}