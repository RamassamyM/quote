import React from 'react';
// import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import { MobileStepper, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { Chip, Box, Grid } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight, AddCircle } from "@material-ui/icons";
import useStyles from './style';
import { Dropdown } from 'react-dropdown-now';
import { useDispatch } from 'react-redux';
import { addProductToBox, toggleBoxPanel } from './../../containers/box-builder-page/boxSlice';

const ProductModal = (props) => {
  // Hooks init (useDispatch, useHistory, useLocation, etc.)
  const dispatch = useDispatch();
  // App state
  // Local state
  const product = props.product;
  let images = [];
  if (product && product.picture_urls && product.picture_urls.length > 0) {
    images = product.picture_urls;
  }
  if (product && product.picture_urls && product.picture_urls.length === 0 && product.main_picture_url) {
    images = [product.main_picture_url];
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
  const handleSelectVariant = (value) => {
    setVariantSelection(value);
  }
  const handleAddToBoxButton = (event) => {
    event.preventDefault();
    dispatch(addProductToBox({ product, variantSelected: product.variants.filter((variant) => {
      if (!variantSelection) {
        return variant.id === product.variants[0].id;
      }
      return variant.id === variantSelection.id;
    })[0] }));
    dispatch(toggleBoxPanel());
    // setTimeout(() => {
    //   dispatch(toggleBoxPanel());
    // }, 2000);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleCloseProductView = () => {
    setActiveStep(1);
    props.handleCloseProductView();
  }

  return (
    <Dialog
      name='Product View'
      maxWidth='md'
      open={display}
      onClose={props.handleCloseProductView}
      disableBackdropClick={false}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      ref={reference}
      >
      { display && (
        <React.Fragment>
          <DialogTitle id="scroll-dialog-title">{product.title}</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
              <Grid container spacing={2}>
                <Grid item sm={6} className={classes.productImageColumn}>
                  <Box display="flex" alignItems="center" justifyContent="center" pb={4} className={classes.productImageBlockWrapper}>
                    <Box className={classes.productImageWrapper}>
                      <img
                        className={classes.productImage}
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
                      {product.brand}
                    </Typography>
                    <Chip variant="outlined" key={"category-chip"} label={product.category} className={classes.modalChip}/>
                  </Box>
                  <Box className={classes.modalDescription}>
                  {product.description}
                  </Box>
                  <Box className={classes.modalDescription}>
                    { product.has_ingredients && (
                      <React.Fragment>
                        <strong>Ingredients: </strong>
                        {product.ingredients}
                      </React.Fragment>
                    )}
                  </Box>
                  <Box className={classes.modalWrapperChip} display="flex">
                    {product.tags.map((tag) => (
                      <Chip size="small" key={"modalChip-" + tag} label={tag} className={classes.modalChip}/>
                    ))}
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Dropdown
                      placeholder="Select an option"
                      options={product.variants}
                      value={product.variants[0].value}
                      onChange={(value) => handleSelectVariant(value)}
                      // onSelect={(value) => console.log('selected!', value)} // always fires once a selection happens even if there is no change
                      // onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
                      // onOpen={() => console.log('opened!')}
                    />
                    <div className={classes.separator}></div>
                    <Button
                      edge="end"
                      aria-label="add to box"
                      onClick={handleAddToBoxButton}
                      color="primary"
                    >
                      <AddCircle fontSize="large"/>
                    </Button>
                  </Box>
                </Grid>
              </Grid>
          </DialogContent>
          <DialogActions>
            <Button name='Close' onClick={handleCloseProductView} color="primary">
              Close
            </Button>
          </DialogActions>
        </React.Fragment>
      )}
    </Dialog>
  );
};

export default ProductModal;