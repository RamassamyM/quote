import React from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle } from '@material-ui/core';
import useStyles from './style';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBoxPanel, selectBoxItems, selectBoxOptions, selectBoxTotalCost, selectBoxMinTotalCost, resetBox } from './../../containers/box-builder-page/boxSlice';
import { addBoxToQuote, selectQuote, updateBoxInQuote } from './../../containers/quote-builder-page/quoteSlice';
import { useHistory } from "react-router-dom";
import { scrollUp } from './../../core/services/utils';

const BoxConfirmationModal = (props) => {
  // Hooks init (useDispatch, useHistory, useLocation, etc.)
  const dispatch = useDispatch();
  // App state
  const boxItems = useSelector(selectBoxItems);
  const boxOptions = useSelector(selectBoxOptions);
  const quote = useSelector(selectQuote);
  const boxTotalCost = useSelector(selectBoxTotalCost);
  const boxMinPrice = useSelector(selectBoxMinTotalCost);
  // Local state
  const initalBoxName = boxOptions.update && boxOptions.boxName ? boxOptions.boxName : '';
  const [boxName, setBoxName] = React.useState({
    boxName: initalBoxName,
    errors: {},
  });
  // Other variables declaration(useRef, useStyles...)
  let history = useHistory();
  const handleAfterAddingBox = props.handleAfterAddingBox;
  const box = {items: boxItems, unitPrice: boxTotalCost, minPrice: boxMinPrice }
  const classes = useStyles();
  const display = props.display;
  const scroll = props.scroll;
  const reference = props.reference;
  // const preventDefault = (event) => event.preventDefault();
  // Effect(s)
  // Logic
  const handleCloseBoxConfirmationView = props.handleCloseBoxConfirmationView;

  const handleAddBoxToQuote = (event, thisBoxName) => {
    event.preventDefault();
    if (boxOptions.update && boxOptions.hasOwnProperty('indexInQuote')) {
      dispatch(updateBoxInQuote({ box:{ ...box, name: thisBoxName.boxName}, boxIndex: boxOptions.indexInQuote }))
    } else {
      dispatch(addBoxToQuote({ ...box, name: thisBoxName.boxName }))
    }
    dispatch(resetBox());
    setBoxName({
      ...boxName,
      boxName: ''
    });
    handleCloseBoxConfirmationView();
    dispatch(toggleBoxPanel());
    handleAfterAddingBox();
    scrollUp(event);
    history.push("/");
  };
  const checkIfNameOfBoxIsTaken = (name) => {
    const boxNamesList = quote.boxes.map((box) => box.name);
    return boxNamesList.includes(name)
  };
  const validate = ({ name, value }) => {
    const errors = boxName.errors;
    if (name === "boxName" && (value === null || value === "")) {
      errors.boxName = 'Please choose a name for your box.'
    } else if (name === "boxName" && checkIfNameOfBoxIsTaken(value)) {
      errors.boxName = 'A box has this name. Please choose another name.'
    } else {
      delete errors.boxName; 
    }
    return errors
  };
  const handleChangeOnNameTextField =(event) => {
    const name = event.target.name;
    const value = event.target.value;
    const errors = validate({ name, value });
    setBoxName({ ...boxName, [name]: value, errors });
  }

  const boxNameErrorText = boxName.errors.hasOwnProperty("boxName") ? boxName.errors.boxName : "";
  const boxNameError = boxName.errors.hasOwnProperty("boxName");
  // Return
  return (
    <Dialog
      name='Box Confirmation View'
      open={display}
      onClose={handleCloseBoxConfirmationView}
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
              To identify this box in your quote
            </DialogContentText>
              <TextField name="boxName" className={classes.boxNameField} helperText={boxNameErrorText} error={boxNameError} onChange={handleChangeOnNameTextField} id="outlined-basic" label="Name" value={boxName.boxName} placeholder={"ex: Box1, ChristmasBox, MenBox..."} variant="outlined"/>
          </DialogContent>
          <DialogActions>
            <Button name='Close' onClick={handleCloseBoxConfirmationView} color="default">
              Cancel
            </Button>
            <Button disabled={boxNameError || boxName.boxName === null} name='AddToQuote' onClick={(event) => handleAddBoxToQuote(event, boxName)} color="primary" variant="contained" autoFocus>
              { boxOptions.update ? 'Update box in quote' : 'Add box to quote' }
            </Button>
          </DialogActions>
        </React.Fragment>
      )}
    </Dialog>
  );
};

export default BoxConfirmationModal;