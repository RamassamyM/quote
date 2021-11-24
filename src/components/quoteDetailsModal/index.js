import React from 'react';
import { Divider, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { Checkbox, Radio, RadioGroup, FormLabel, FormControl, FormControlLabel, FormHelperText } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { MailOutline as MailOutlineIcon } from '@material-ui/icons';
import useStyles from './style';
import { useSelector, useDispatch } from 'react-redux';
import { selectQuote, setQuoteDetails, deleteQuote, selectQuoteTotalDiscount, selectQuotePrediscountedCost, selectQuoteDiscountedCost } from './../../containers/quote-builder-page/quoteSlice';
import { resetBox } from './../../containers/box-builder-page/boxSlice';
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
  const quotePrediscountedCost = useSelector(selectQuotePrediscountedCost);
  const quoteDiscountedCost = useSelector(selectQuoteDiscountedCost);
  const quoteTotalDiscount = useSelector(selectQuoteTotalDiscount);
  const [pdfShow, setPdfShow] = React.useState(false);
  const [freeSampleModalShow, setFreeSampleModalShow] = React.useState(false);
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
    preDiscountedCost: quotePrediscountedCost,
    discountedCost: quoteDiscountedCost
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
    // in case an update box is waiting in the box builder view panel, it is better to reset everything
    dispatch(resetBox());
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

  // distinguish the two modals => not necerssary
  const generateQuoteModalRef = React.createRef();
  const getFreeSampleModalRef = React.createRef();

  const PdfSection = React.forwardRef((props, ref) => {
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
  });

  const handleGenerateQuote = async (event) => {
    event.preventDefault();
    await dispatch(setQuoteDetails({ quoteDetails: formInput }));
    const quoteData = {
      boxes: quote.boxes,
      quoteDetails: formInput,
      totalDiscount: quoteTotalDiscount,
      preDiscountedCost: quotePrediscountedCost,
      discountedCost: quoteDiscountedCost,
    };
    console.log("QuoteData: ", quoteData);
    if (!storedToFirestore) {
      setStoredToFirestore(true);
      const refId = await storeQuoteToDb(quoteData);
      setQuoteRef(refId);
    }
    setPdfShow(true);
  };

  const closeFreeSampleModal = (event) => {
    event.preventDefault();
    setFreeSampleModalShow(false);
  };

  const GetFreeSampleModal = React.forwardRef((props, ref) => {
    if (freeSampleModalShow) {
      return (
        <React.Fragment>
          <DialogTitle id="free-sample-infos-modal">WE RECEIVED YOUR REQUEST !</DialogTitle>
          <Divider/>
          <DialogContent>
            <Box p={1} textAlign="center" display="flex" flexDirection="column" alignItems="center" justifyContent="center" className={classes.imageWrapper}>
              <img alt="congratulations" className={classes.imageFreeSample} src="https://firebasestorage.googleapis.com/v0/b/curakit-7e00d.appspot.com/o/CURAKIT_Original_2.png?alt=media&token=eb1bbec3-4c36-4d47-a2b6-ecf39f203508"></img>
              <Typography  variant="h6" color="primary">
                Our Team will call you in a very short time to discuss your needs and organize the shipping of your free sample box.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
                <Button name='Close' onClick={closeFreeSampleModal} variant="contained" color="primary">
                  See your quote
                </Button>
          </DialogActions>
        </React.Fragment>
      );
    }
    return null;
  });

  const handleGetMyFreeSample = (event) => {
    event.preventDefault();
    setFreeSampleModalShow(true);
    handleGenerateQuote(event);
  };

  const validate = ({ name, value }) => {
    const errors = formInput.errors;
    if (
      name === "email" &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ) {
      errors.email = 'Invalid email address'
    } else if ( name === 'email') {
      delete errors.email; 
    }
    // validate all other errors because all are required field
    if (name !== "email" && value === '') {
      errors[name] = 'Field is required'
    } else if (name !== 'email') {
      delete errors[name];
    }
    return errors
  };

  const handleInput = evt => {
    const name = evt.target.name;
    const value = evt.target.value;
    const errors = validate({ name, value });
    setFormInput({ ...formInput, [name]: value, errors });
  };

  // For all errors, the submit action will check that all required fields are filled up 
  // but to allow action only if email are validated, then button will be disabled if email is invalid.
  const emailError = formInput.errors.hasOwnProperty("email");
  const emailErrorText = formInput.errors.hasOwnProperty("email") ? formInput.errors.email : "";

  const handleSubmitDetailsForm = (event) => {
    event.preventDefault();
    // There are 2 submit buttons : to distinguish between actions, we checked the button that was activated
    if (document.activeElement.getAttribute('name') === 'getFreeSampleButton') {
      handleGetMyFreeSample(event);
    } else {
      handleGenerateQuote(event);
    }
  };

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
          <form onSubmit={handleSubmitDetailsForm}>
            <DialogContent dividers={scroll === 'paper'}>
              <Box display="flex" justifyContent="center" className={classes.detailsFormContent}>
                <Box>
                  <Box mb={4}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">DELIVERY</FormLabel>
                      <RadioGroup aria-label="delivery" name="delivery" value={formInput.delivery} onChange={handleChangeDelivery}>
                        <FormControlLabel value="company" control={<Radio />} label="Company delivery (one drop-off)" />
                        <FormControlLabel value="individual" control={<Radio />} label="Individual deliveries (direct to recipients)" />
                      </RadioGroup>
                      <FormHelperText>
                        <Button size="small" component="a" href="mailto:sales@curakit.com" className={classes.contactLink} startIcon={<MailOutlineIcon />}>
                          Contact us for additional delivery options 
                        </Button>
                      </FormHelperText>
                    </FormControl>
                  </Box>
                  <Box mb={4}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">CUSTOMISATION</FormLabel>
                        <FormControlLabel
                          control={<Checkbox checked={formInput.addCompanyLogo} onChange={handleChangeOptionCompanyLogo} name="Company Logo Option" />}
                          label="Add my company logo to box (£ poa)"
                          />
                        <FormControlLabel
                          control={<Checkbox checked={formInput.addCustomMessage} onChange={handleChangeOptionCustomMessage} name="Custom Message Option" />}
                          label="Add a custom message in each box (£ free)"
                          />
                    </FormControl>
                  </Box>
                  <Box mb={3}>
                    <FormLabel color="primary" component="legend">CONTACT INFOS</FormLabel>
                    <TextField fullWidth name="firstName" value={formInput.firstName} helperText={formInput.errors.firstName} error={formInput.errors.hasOwnProperty('firstName')} onChange={handleInput} required id="first-name-required" label="First name"/>
                    <TextField fullWidth name="lastName" value={formInput.lastName} helperText={formInput.errors.lastName} error={formInput.errors.hasOwnProperty('lastName')} onChange={handleInput} required id="last-name-required" label="Last name"/>
                    <TextField fullWidth name="companyName" value={formInput.companyName} helperText={formInput.errors.companyName} error={formInput.errors.hasOwnProperty('companyName')} onChange={handleInput} required id="company-name-required" label="Company name"/>
                    <TextField fullWidth name="jobTitle" value={formInput.jobTitle} helperText={formInput.errors.jobTitle} error={formInput.errors.hasOwnProperty('phone')} onChange={handleInput} required id="job-title-required" label="Job title"/>
                    <TextField fullWidth name="email" value={formInput.email} helperText={emailErrorText} error={emailError} onChange={handleInput} required id="email-required" label="Email"/>
                    <TextField fullWidth name="phone" value={formInput.phone} helperText={formInput.errors.phone} error={formInput.errors.hasOwnProperty('phone')} onChange={handleInput} required id="phone-required" label="Phone"/>
                  </Box>
                </Box>
              </Box>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button name='getFreeSampleButton' disabled={emailError} variant="contained" type="submit" color="secondary">
                Get my Free Sample
              </Button>
              <Button type="submit" disabled={emailError} name='GenerateMyQuoteButton' variant="contained" color="primary">
                Generate my quote
              </Button>
              <Button name='closeButton' onClick={closeDetailsView} >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </React.Fragment>
      )}
      { display && pdfShow && !freeSampleModalShow && (
        <PdfSection ref={generateQuoteModalRef} />
      )}
      { display && freeSampleModalShow && (
        <GetFreeSampleModal ref={getFreeSampleModalRef} />
      )}
    </Dialog>
  );
};

export default QuoteDetailsModal;