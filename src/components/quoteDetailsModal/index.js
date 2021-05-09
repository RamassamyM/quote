import React from 'react';
import { Divider, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { Radio, RadioGroup, FormLabel, FormControl, FormControlLabel, FormHelperText } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import useStyles from './style';

const QuoteDetailsModal = (props) => {
  const classes = useStyles();
  const display = props.display;
  const scroll = props.scroll;
  const reference = props.reference;
  const handleGenerateAndSendQuote = props.handleGenerateAndSendQuote;
  const [formInput, setFormInput] = React.useState(
    {
      firstName: "",
      lastName: "",
      companyName: "",
      jobTitle: "",
      phone: "",
      email: "",
      delivery: "company",
      errors: {},
    }
  );
  const handleChangeDelivery = (event) => {
    setFormInput({ ...formInput, delivery: event.target.value });
  };
  const handleGenerateQuote = (event) => {
    event.preventDefault();
    handleGenerateAndSendQuote(formInput);
    props.handleCloseDetailsView();
  };
  const validate = ({ name, value }) => {
    const errors = formInput.errors;
    if (
      name === "email" &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ) {
      errors.email = 'Invalid email address'
    } else {
      delete errors.email; 
    }
    return errors
  };
  const handleInput = evt => {
    const name = evt.target.name;
    const value = evt.target.value;
    const errors = validate({ name, value });
    setFormInput({ ...formInput, [name]: value, errors });
  };
  const emailError = formInput.errors.hasOwnProperty("email");
  const emailErrorText = formInput.errors.hasOwnProperty("email") ? formInput.errors.email : "";

  return (
    <Dialog
      name='Details and options view'
      open={display}
      onClose={props.handleCloseDetailsView}
      scroll={scroll}
      aria-labelledby="quote-details-modal"
      aria-describedby="quote-details-modal-description"
      ref={reference}
      >
      { display && (
        <React.Fragment>
          <DialogTitle id="quote-details-modal-title">DETAILS FOR THE QUOTE</DialogTitle>
          <Divider/>
          <form onSubmit={handleGenerateQuote}>
          <DialogContent dividers={scroll === 'paper'}>
            <Box align="center" mb={2}>
              <Typography component="h4" variant="h6">
                Contact us to use your company logo and add a custom message inside the box.
              </Typography>
            </Box>
              <Box display="flex" justifyContent="center" className={classes.detailsFormContent}>
                <Box>
                  <Box mb={3}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">OPTIONS</FormLabel>
                      <RadioGroup aria-label="delivery" name="delivery" value={formInput.delivery} onChange={handleChangeDelivery}>
                        <FormControlLabel value="company" control={<Radio />} label="Company delivery (one drop-off)" />
                        <FormControlLabel value="individual" control={<Radio />} label="Individual deliveries" />
                      </RadioGroup>
                      <FormHelperText>Contact us for mixed deliveries</FormHelperText>
                    </FormControl>
                  </Box>
                  <Box mb={3}>
                    <FormLabel color="primary" component="legend">CONTACT</FormLabel>
                    <TextField fullWidth name="firstName" onChange={handleInput} required id="first-name-required" label="First name"/>
                    <TextField fullWidth name="lastName" onChange={handleInput} required id="last-name-required" label="Last name"/>
                    <TextField fullWidth name="companyName" onChange={handleInput} required id="company-name-required" label="Company name"/>
                    <TextField fullWidth name="jobTitle" onChange={handleInput} required id="job-title-required" label="Job title"/>
                    <TextField fullWidth name="email" helperText={emailErrorText} error={emailError} onChange={handleInput} required id="email-required" label="Email"/>
                    <TextField fullWidth name="phone" onChange={handleInput} required id="phone-required" label="Phone"/>
                  </Box>
                </Box>
              </Box>
            </DialogContent>
          <Divider />
          <DialogActions>
            <Button name='Close' onClick={props.handleCloseDetailsView} >
              Close
            </Button>
            <Button type="submit" disabled={emailError} name='Generate' variant="contained" color="primary">
              Generate my quote
            </Button>
          </DialogActions>
          </form>
        </React.Fragment>
      )}
    </Dialog>
  );
};

export default QuoteDetailsModal;