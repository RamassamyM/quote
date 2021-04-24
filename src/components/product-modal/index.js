import React from 'react';
// import clsx from 'clsx';
import { Button, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { Chip, IconButton, Box, Grid, GridList, GridListTile, } from '@material-ui/core';
import { AddCircle } from "@material-ui/icons";
import useStyles from './style';
import { Dropdown } from 'react-dropdown-now';


const ProductModal = (props) => {
  // Hooks init (useDispatch, useHistory, useLocation, etc.)
  // App state
  // Local state
  // Other variables declaration(useRef, useStyles...)
  const classes = useStyles();
  const product = props.product;
  const scroll = props.scroll;
  const preventDefault = (event) => event.preventDefault();
  // Effect(s)
  // Logic
  // Return
  return (
    <React.Fragment>
      <DialogTitle id="scroll-dialog-title">{product.title}</DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
          <Grid container spacing={2}>
            <Grid item md={6}>
            <div className={classes.modalImageWrapper}>
              <GridList className={classes.modalImageList} cols={3}>
                {product.picture_urls.map((picture_url, index) => (
                  <GridListTile key={product.id + '-image-' + index} cols={3}>
                    <img src={picture_url} alt={product.id + '-image-' + index} />
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
                  onChange={(value) => console.log('change!', value)}
                  // onSelect={(value) => console.log('selected!', value)} // always fires once a selection happens even if there is no change
                  onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
                  onOpen={() => console.log('opened!')}
                />
                <div className={classes.separator}></div>
                <IconButton
                  edge="end"
                  aria-label="add to box"
                  aria-controls={'buttonId'}
                  aria-haspopup="true"
                  onClick={preventDefault}
                  color="primary"
                >
                  <AddCircle fontSize="large"/>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        {/* <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
        </DialogContentText> */}
      </DialogContent>
      <DialogActions>
        <Button name='Close' onClick={props.handleCloseProductView} color="primary">
          Close
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default ProductModal;