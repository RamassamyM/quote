import React from 'react';
import { Button, Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle, Typography } from '@material-ui/core';
// import useStyles from './style';
// import { useDispatch } from 'react-redux';
// import { addBoxToQuote } from './../../containers/quote-builder-page/quoteSlice';

const BoxConfirmationModal = (props) => {
  // Hooks init (useDispatch, useHistory, useLocation, etc.)
  // const dispatch = useDispatch();
  // App state
  // Local state
  // const box = props.box;
  // Other variables declaration(useRef, useStyles...)
  // const classes = useStyles();
  const display = props.display;
  const scroll = props.scroll;
  const reference = props.reference;
  // const preventDefault = (event) => event.preventDefault();
  // Effect(s)
  // Logic
  const handleCloseBoxConfirmationView = props.handleCloseBoxConfirmationView;
  const handleAddBoxToQuote = (event) => {
    event.preventDefault();
  };
  
  // Return
  return (
    <Dialog
      name='Box Confirmation View'
      open={display}
      onClose={props.handleCloseBoxConfirmationView}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      ref={reference}
      >
      { display && (
        <React.Fragment>
          <DialogTitle id="scroll-dialog-title">Please name your box</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText id="alert-dialog-description">
              To help keep things straight if you need to add more than one
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button name='Close' onClick={handleCloseBoxConfirmationView} color="default">
              Close
            </Button>
            <Button name='AddToQuote' onClick={handleAddBoxToQuote} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </React.Fragment>
      )}
    </Dialog>
  );
};

export default BoxConfirmationModal;