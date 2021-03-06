import React from 'react';
// import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import { MobileStepper, Link, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { Chip, Box, Grid } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight, AddCircle } from "@material-ui/icons";
import useStyles from './style';
import { Dropdown } from 'react-dropdown-now';
import { useDispatch, useSelector } from 'react-redux';
import { addBoxToQuote, selectQuote } from './../../containers/quote-builder-page/quoteSlice';
import { useHistory } from "react-router-dom";
import { arrayMin, arrayMax, scrollUp } from './../../core/services/utils';

const BoxIdeaModal = (props) => {
  // Hooks init (useDispatch, useHistory, useLocation, etc.)
  const dispatch = useDispatch();
  let history = useHistory();
  // App state
  // Local state
  const boxIdea = props.boxIdea;
  const quote = useSelector(selectQuote);
  let images = [];
  if (boxIdea && boxIdea.picture_urls && boxIdea.picture_urls.length > 0) {
    images = boxIdea.picture_urls;
  }
  if (boxIdea && boxIdea.picture_urls && boxIdea.picture_urls.length === 0 && boxIdea.main_picture_url) {
    images = [boxIdea.main_picture_url];
  }
  const [variantSelection, setVariantSelection] = React.useState(null);
  const [activeStep, setActiveStep] = React.useState(1);
  // Other variables declaration(useRef, useStyles...)
  const classes = useStyles();
  const theme = useTheme();
  const display = props.display;
  const scroll = props.scroll;
  const reference = props.reference;
  const maxSteps = images.length;
  // const preventDefault = (event) => event.preventDefault();
  // Effect(s)
  // Logic
  const handleSelectVariant = (payload) => {
    const newVariant = boxIdea.variants.filter((variant) => variant.name === payload.value)[0];
    setVariantSelection(newVariant);
  }

  const checkIfNameOfBoxIsTaken = (name) => {
    const boxNamesList = quote.boxes.map((box) => box.name);
    return boxNamesList.includes(name)
  };

  const defineNameForBox = (boxIdeaTitle, variantName) => {
    let basicName = boxIdeaTitle + ' - ' + variantName;
    let increment = 2;
    let name = basicName;
    while (checkIfNameOfBoxIsTaken(name)) {
      name = basicName + '(' + increment + ')';
      increment += 1;
    }
    return name;
  }

  const handleAddToQuoteButton = (event, variantSelection, boxIdea) => {
    event.preventDefault();
    const payload = {
      items: variantSelection.items.map(item => {
        const productInfos = item.productInfos;
        return {
          product: {
            productId: item.productId,
            ...productInfos,
          },
          variantSelected: productInfos.variants.filter(variant => variant.sku === item.variantSKU)[0],
          qty: item.qty
        };
      }),
      unitPrice: variantSelection.boxPrice, 
      minPrice: variantSelection.minBoxPrice,
      name: defineNameForBox(boxIdea.title, variantSelection.name)
    }
    dispatch(addBoxToQuote(payload));
    setVariantSelection(null);
    scrollUp(event);
    history.push("/");
  };

  const handleClickOnViewProduct = (event, product) => {
    event.preventDefault();
    props.handleClickOnViewProduct(product)
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleCloseBoxIdeaView = () => {
    setActiveStep(1);
    setVariantSelection(null);
    props.handleCloseBoxIdeaView();
  }

  const priceToDisplay = (variantSelection) => {
    if (variantSelection) return "From " + variantSelection.currency + Number.parseFloat(variantSelection.minBoxPrice).toFixed(2);
    return "From ??" + Number.parseFloat(arrayMin(boxIdea.variants.map(v => v.minBoxPrice))).toFixed(2) + " to ??" + Number.parseFloat(arrayMax(boxIdea.variants.map(v => v.boxPrice))).toFixed(2);
  };

  return (
    <Dialog
      name='boxIdea View'
      maxWidth='md'
      open={display}
      onClose={props.handleCloseboxIdeaView}
      disableBackdropClick={false}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      ref={reference}
      >
      { display && (
        <React.Fragment>
          <DialogTitle id="scroll-dialog-title">{boxIdea.title}</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
              <Grid container spacing={2}>
                <Grid item sm={6} className={classes.boxIdeaImageColumn}>
                  <Box display="flex" alignItems="center" justifyContent="center" pb={4} className={classes.boxIdeaImageBlockWrapper}>
                    <Box className={classes.boxIdeaImageWrapper}>
                      <img
                        className={classes.boxIdeaImage}
                        src={images[activeStep - 1]}
                        alt={'image-' + activeStep}
                      />
                    <MobileStepper
                      steps={maxSteps}
                      position="static"
                      variant="text"
                      activeStep={activeStep - 1}
                      nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps}>
                          Next
                          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                      }
                      backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 1}>
                          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                          Back
                        </Button>
                      }
                      />
                      </Box>
                  </Box>
                </Grid>
                <Grid item sm={6}>
                  <Box m={2} className={classes.modalCategory} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography component="h3" >
                      {boxIdea.brand}
                    </Typography>
                    <Chip variant="outlined" key={"category-chip"} label={boxIdea.category} className={classes.modalChip}/>
                  </Box>
                  <Box className={classes.modalDescription}>
                    <Typography component="h5" >
                      {boxIdea.description}
                    </Typography>
                  </Box>
                  <Box className={classes.modalWrapperChip} display="flex">
                    {boxIdea.tags.map((tag) => (
                      <Chip size="small" key={"modalChip-" + tag} label={tag} className={classes.modalChip}/>
                    ))}
                  </Box>
                  <Box mt={2} className={classes.modalDescription}>
                    { variantSelection && variantSelection.items && variantSelection.items.length > 0 && (
                      <React.Fragment>
                        <Typography component="h6" >
                          The box "{variantSelection.name}" Includes :
                        </Typography>
                        {variantSelection.items.map((item) => {
                          return (
                            <React.Fragment key={item.variantSKU}>
                              <Typography component="h6" variant="body2" color='textSecondary'>
                                <Link href="#" onClick={(event) => handleClickOnViewProduct(event, item.productInfos)}>
                                  - {item.qty} x {item.productInfos.title} : {item.productInfos.variants.filter(v => v.sku === item.variantSKU)[0].property_value} {item.productInfos.variants.filter(v => v.sku === item.variantSKU)[0].property_unit} - min {item.productInfos.variants.filter(v => v.sku === item.variantSKU)[0].currency}{item.productInfos.variants.filter(v => v.sku === item.variantSKU)[0].min_price.toFixed(2)}
                                </Link>
                              </Typography>
                              <br/>
                            </React.Fragment>
                          );
                        })}
                        <br/>
                      </React.Fragment>
                    )}
                    <Typography component="h6" color='primary'>
                      <strong>Price : {priceToDisplay(variantSelection)}</strong>
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Dropdown
                      placeholder="Select an option"
                      options={boxIdea.variants.map(v => v.name)}
                      value={variantSelection && variantSelection.name}
                      onChange={(value) => handleSelectVariant(value)}
                    />
                    <div className={classes.separator}></div>
                    <Button
                      aria-label="Add box to quote"
                      edge="end"
                      onClick={(event) => handleAddToQuoteButton(event, variantSelection, boxIdea)}
                      color="primary"
                      disabled={!variantSelection}
                    >
                      <AddCircle fontSize="large"/>
                    </Button>
                  </Box>
                </Grid>
              </Grid>
          </DialogContent>
          <DialogActions>
            <Button name='Close' onClick={handleCloseBoxIdeaView} color="primary">
              Close
            </Button>
          </DialogActions>
        </React.Fragment>
      )}
    </Dialog>
  );
};

export default BoxIdeaModal;