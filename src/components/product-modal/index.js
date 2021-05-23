import React from 'react';
// import clsx from 'clsx';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { Chip, Box, Grid, GridList, GridListTile, } from '@material-ui/core';
import { AddCircle } from "@material-ui/icons";
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
  const [variantSelection, setVariantSelection] = React.useState(null);
  // Other variables declaration(useRef, useStyles...)
  const classes = useStyles();
  const display = props.display;
  const scroll = props.scroll;
  const reference = props.reference;
  // const preventDefault = (event) => event.preventDefault();
  // Effect(s)
  // Logic
  const handleSelectVariant = (value) => {
    console.log("Select variant: ", value);
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
    setTimeout(() => {
      dispatch(toggleBoxPanel());
    }, 3000);
  };
  // Return
  return (
    <Dialog
      name='Product View'
      open={display}
      onClose={props.handleCloseProductView}
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
                <Grid item md={6}>
                <div className={classes.modalImageWrapper}>
                  <GridList className={classes.modalImageList} cols={3}>
                    {product.picture_urls.map((picture_url, index) => (
                      <GridListTile key={product.productId + '-image-' + index} cols={3}>
                        <img src={picture_url} alt={product.productId + '-image-' + index} />
                      </GridListTile>
                    ))}
                  </GridList>
                </div>
                </Grid>
                <Grid item md={6}>
                  <Box m={1} className={classes.modalCategory} display="flex" justifyContent="space-between" alignItems="center">
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
            <Button name='Close' onClick={props.handleCloseProductView} color="primary">
              Close
            </Button>
          </DialogActions>
        </React.Fragment>
      )}
    </Dialog>
  );
};

export default ProductModal;