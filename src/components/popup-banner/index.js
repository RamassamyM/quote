import React from 'react';
import { Paper, Box, Button, IconButton, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Clear as ClearIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';

const useStyles = props => makeStyles((theme) => ({
  root: {
    position: 'sticky',
    bottom: 'Opx',
    zIndex: '100',
    width: '100%',
  },
  message: {
    color: theme.palette.text.reverted,
    fontSize: '2rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.8rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: '5px',
    },
  },
  buttonAction: {
    backgroundColor: props.buttonColor,
    "&:hover": {
      backgroundColor: props.buttonColorHover,
    },
    color: theme.palette.text.reverted,
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
  },
  paper: {
    position: 'sticky', 
    bottom: '0px', 
    width: '100%', 
    zIndex: '100'
  },
  card: {
    height: '90px',
    backgroundColor: props.backgroundColor,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '0px',
  },
  iconClose: {
    color: theme.palette.text.primary,
  },
  leftPicture: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '70%',
    height: '100%',
  },
  middlePicture: {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '30%',
    height: '100%',
    position: 'relative',
    left: '-40px',
    top: '0px',
    marginTop: '2px',
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      left: '-10px',
    },
  },
  pictureWrapper: {
    width: '35%',
    height: '100%',
    [theme.breakpoints.down('md')]: {
      width: '30%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '25%',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  cardContent: {
  },
  cardActions: {
  },
  separator: {
    flexGrow: '1',
  },
}));

export default function PopupBanner({display, messageText, leftPictureUrl, middlePictureUrl, buttonText, handleClose, handleButtonClick, ...props}) {
  const classes = useStyles(props)();

  const handleClickOnButton = (event) => {
    event.preventDefault();
    console.log('Action Button Clicked');
  };

  const handleCloseBannerPopup = (event) => {
    event.preventDefault();
    console.log('Close Button Clicked');
    handleClose();
  };

  return (
    <Zoom in={display}>
      <Box className={classes.paper} >
        <Paper elevation={3} >
          <Card className={classes.card}>
            <Box display="flex" alignItems="center" justifyContent="flex-start" className={classes.pictureWrapper}>
              <CardMedia
                className={classes.leftPicture}
                image={leftPictureUrl}
              />
              <CardMedia
                className={classes.middlePicture}
                image={middlePictureUrl}
              />
            </Box>
            <Box flexGrow={1} display="flex" alignItems="center" justifyContent="space-between" >
            <CardContent className={classes.content}>
              <Typography component="h2" variant="h4" className={classes.message}>
                <strong>{messageText}</strong>
              </Typography>
            </CardContent>
            <CardActions>
              <Button disableElevation className={classes.buttonAction} variant="contained" onClick={handleClickOnButton}>
                {buttonText}
              </Button>
              <IconButton
                aria-label="Close"
                edge="end"
                onClick={handleCloseBannerPopup}
                className={classes.iconClose}
              >
                <ClearIcon fontSize="large"/>
              </IconButton>
            </CardActions>
            </Box>
          </Card>
        </Paper>
      </Box>
    </Zoom>
  )
};