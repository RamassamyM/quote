import React from 'react';
import { Divider, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { Checkbox, Radio, RadioGroup, FormLabel, FormControl, FormControlLabel, FormHelperText } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { MailOutline as MailOutlineIcon } from '@material-ui/icons';
import useStyles from './style';
import { useSelector, useDispatch } from 'react-redux';
import { selectQuote, setQuoteDetails, deleteQuote, selectQuoteTotalDiscount, selectQuoteTotalCost } from './../../containers/quote-builder-page/quoteSlice';
import GeneratePdf from './../../core/services/generatePdf';
import { storeQuoteToDb } from './../../core/services/firestore-requests';

const QuoteDetailsModal = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const display = props.display;
  const scroll = props.scroll;
  const reference = props.reference;
  const closeDetailsView = props.handleCloseDetailsView;
  const quote = useSelector(selectQuote);
  const quoteTotalCost = useSelector(selectQuoteTotalCost);
  const quoteTotalDiscount = useSelector(selectQuoteTotalDiscount);
  const [pdfShow, setPdfShow] = React.useState(false);
  const [quoteRef, setQuoteRef] = React.useState(null);
  const [storedToFirestore, setStoredToFirestore] = React.useState(false);
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
      addCompanyLogo: false,
      addCustomMessage: false,
    }
  );
  const data = {
    ...quote,
    totalDiscount: quoteTotalDiscount,
    preDiscountedCost: quoteTotalCost
  };
  const closeDownloadView = (event) => {
    event.preventDefault();
    setPdfShow(false);
    setStoredToFirestore(false);
    closeDetailsView();
  };
  const handleAfterDownload = () => {
    dispatch(deleteQuote(null));
    setPdfShow(false);
    setStoredToFirestore(false);
    closeDetailsView();
  };
  const handleChangeDelivery = (event) => {
    setFormInput({ ...formInput, delivery: event.target.value });
  };
  const handleChangeOptionCompanyLogo = (event) => {
    setFormInput({ ...formInput, addCompanyLogo: !formInput.addCompanyLogo });
  };
  const handleChangeOptionCustomMessage = (event) => {
    setFormInput({ ...formInput, addCustomMessage: !formInput.addCustomMessage });
  };

  const PdfSection = () => {
    if (pdfShow) {
      return (
        <React.Fragment>
          <DialogTitle id="quote-download-modal-title">YOUR QUOTE IS READY</DialogTitle>
          <Divider/>
          <DialogContent>
            <Box p={1} textAlign="center" display="flex" flexDirection="column" alignItems="center" justifyContent="center" className={classes.imageWrapper}>
              <img alt="congratulations" className={classes.image} src="https://firebasestorage.googleapis.com/v0/b/curakit-7e00d.appspot.com/o/trophy.png?alt=media&token=0208bffb-fcbb-48e8-bafa-f1573a02d319"></img>
              <Typography variant="h6">
                Congratulations !
              </Typography>
              <Typography  variant="h6">
                Our Team will contact you shortly to discuss your needs.
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-around" p={3} className={classes.downloadSection}>
                <GeneratePdf quoteRef={quoteRef} template="quote" pdfAccess="download" data={data}/>
            </Box>
          </DialogContent>
          <DialogActions>
                <Button name='Close' onClick={closeDownloadView} >
                  Edit quote
                </Button>
                <Button name='Close' variant="contained" color="primary" onClick={handleAfterDownload} >
                  Close
                </Button>
          </DialogActions>
        </React.Fragment>
      );
    }
    return null;
  }
  const handleGenerateQuote = async (event) => {
    event.preventDefault();
    await dispatch(setQuoteDetails({ quoteDetails: formInput }));
    const quoteData = {
      boxes: quote.boxes,
      quoteDetails: formInput,
      totalDiscount: quoteTotalDiscount,
      preDiscountedCost: quoteTotalCost
    };
    console.log("QuoteData: ", quoteData);
    if (!storedToFirestore) {
      setStoredToFirestore(true);
      const refId = await storeQuoteToDb(quoteData);
      setQuoteRef(refId);
    }
    setPdfShow(true);
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
      onClose={closeDetailsView}
      scroll={scroll}
      aria-labelledby="quote-details-modal"
      aria-describedby="quote-details-modal-description"
      ref={reference}
      >
      { display && !pdfShow && (
        <React.Fragment>
          <DialogTitle id="quote-details-modal-title">REQUEST YOUR QUOTE - STEP 2</DialogTitle>
          <Divider/>
          <form onSubmit={handleGenerateQuote}>
            <DialogContent dividers={scroll === 'paper'}>
              <Box display="flex" justifyContent="center" className={classes.detailsFormContent}>
                <Box>
                  <Box mb={4}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">DELIVERY</FormLabel>
                      <RadioGroup aria-label="delivery" name="delivery" value={formInput.delivery} onChange={handleChangeDelivery}>
                        <FormControlLabel value="company" control={<Radio />} label="Company delivery (one drop-off)" />
                        <FormControlLabel value="individual" control={<Radio />} label="Individual deliveries" />
                      </RadioGroup>
                      <FormHelperText>
                        <Button size="small" component="a" href="mailto:sales@curakit.com" className={classes.contactLink} startIcon={<MailOutlineIcon />}>
                          Contact us for mixed deliveries 
                        </Button>
                      </FormHelperText>
                    </FormControl>
                  </Box>
                  <Box mb={4}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">CUSTOMIZATION</FormLabel>
                        <FormControlLabel
                          control={<Checkbox checked={formInput.addCompanyLogo} onChange={handleChangeOptionCompanyLogo} name="Company Logo Option" />}
                          label="Add my company logo"
                          />
                        <FormControlLabel
                          control={<Checkbox checked={formInput.addCustomMessage} onChange={handleChangeOptionCustomMessage} name="Custom Message Option" />}
                          label="Add a custom message in each box"
                          />
                    </FormControl>
                  </Box>
                  <Box mb={3}>
                    <FormLabel color="primary" component="legend">CONTACT INFOS</FormLabel>
                    <TextField fullWidth name="firstName" value={formInput.firstName} onChange={handleInput} required id="first-name-required" label="First name"/>
                    <TextField fullWidth name="lastName" value={formInput.lastName} onChange={handleInput} required id="last-name-required" label="Last name"/>
                    <TextField fullWidth name="companyName" value={formInput.companyName} onChange={handleInput} required id="company-name-required" label="Company name"/>
                    <TextField fullWidth name="jobTitle" value={formInput.jobTitle} onChange={handleInput} required id="job-title-required" label="Job title"/>
                    <TextField fullWidth name="email" value={formInput.email} helperText={emailErrorText} error={emailError} onChange={handleInput} required id="email-required" label="Email"/>
                    <TextField fullWidth name="phone" value={formInput.phone} onChange={handleInput} required id="phone-required" label="Phone"/>
                  </Box>
                </Box>
              </Box>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button name='Close' onClick={closeDetailsView} >
                Cancel
              </Button>
              <Button type="submit" disabled={emailError} name='Generate' variant="contained" color="primary">
                Generate my quote
              </Button>
            </DialogActions>
          </form>
        </React.Fragment>
      )}
      { display && pdfShow && (
        <PdfSection />
      )}
    </Dialog>
  );
};

export default QuoteDetailsModal;