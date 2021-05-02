import React from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle } from '@material-ui/core';
import useStyles from './style';
import { useDispatch, useSelector } from 'react-redux';
import { addBoxToQuote } from './../../containers/quote-builder-page/quoteSlice';
import { selectBoxItems, selectBoxTotalCost } from './../../containers/box-builder-page/boxSlice';

const BoxConfirmationModal = (props) => {
  // Hooks init (useDispatch, useHistory, useLocation, etc.)
  const dispatch = useDispatch();
  // App state
  const boxItems = useSelector(selectBoxItems);
  const boxTotalCost = useSelector(selectBoxTotalCost);
  // Local state
  const [boxName, setBoxName] = React.useState(null);
  // Other variables declaration(useRef, useStyles...)
  const box = {items: boxItems, unitPrice: boxTotalCost }
  const classes = useStyles();
  const display = props.display;
  const scroll = props.scroll;
  const reference = props.reference;
  // const preventDefault = (event) => event.preventDefault();
  // Effect(s)
  // Logic
  const handleCloseBoxConfirmationView = props.handleCloseBoxConfirmationView;
  const handleAddBoxToQuote = (event, name) => {
    event.preventDefault();
    dispatch(addBoxToQuote({ ...box, name: name }))
  };
  const handleChangeOnNameTextField =(event) => {
    console.log(event.target.value);
    if (event.target.value) {
      setBoxName(event.target.value);
    } else {
      setBoxName(null);
    }
  }
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
          <DialogContent dividers={scroll === 'paper'} className={classes.modalContent}>
            <DialogContentText id="alert-dialog-description">
              To help keep things straight if you need to add more than one
            </DialogContentText>
              <TextField id="outlined-basic" label="Name" variant="outlined" onChange={handleChangeOnNameTextField}/>
          </DialogContent>
          <DialogActions>
            <Button name='Close' onClick={handleCloseBoxConfirmationView} color="default">
              Cancel
            </Button>
            <Button disabled={boxName === null} name='AddToQuote' onClick={(event) => handleAddBoxToQuote(event, boxName)} color="primary" variant="contained" autoFocus>
              Add to quote
            </Button>
          </DialogActions>
        </React.Fragment>
      )}
    </Dialog>
  );
};

export default BoxConfirmationModal;