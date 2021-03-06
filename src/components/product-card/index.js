import React from 'react';
import { Grid, IconButton, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { addProductToBox, toggleBoxPanel } from './../../containers/box-builder-page/boxSlice';
// import MuiAlert from '@material-ui/lab/Alert';

export default function ProductCard(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  // const preventDefault = (event) => event.preventDefault();
  const product = props.product;
  const [variantSelection, setVariantSelection] = React.useState(product.variants[0]);
  const [cardImageUrl, setCardImageUrl] = React.useState(product.main_picture_url);
  // const [openSnackbar, setOpenSnackbar] = React.useState(false);
  let secondProductPictureUrl = product.main_picture_url;
  if (product.picture_urls && product.picture_urls[0] && product.picture_urls[0] === product.main_picture_url && product.picture_urls[1]) {
    secondProductPictureUrl = product.picture_urls[1];
  } else if (product.picture_urls && product.picture_urls[0] && product.picture_urls[0] !== product.main_picture_url) {
    secondProductPictureUrl = product.picture_urls[0];
  }

  const handleSelectVariant = (value) => {
    setVariantSelection(value);
  }

  const handleAddToBoxButton = (event) => {
    event.preventDefault();
    dispatch(addProductToBox({ product, variantSelected: product.variants.filter((variant) => variant.id === variantSelection.id)[0] }))
    dispatch(toggleBoxPanel());
    // setTimeout(() => {
    //   dispatch(toggleBoxPanel());
    // }, 2000);
  };

  const handleMouseOnCardImage = (event) =>  {
    setCardImageUrl(secondProductPictureUrl)
  };
  const handleMouseOutCardImage = (event) =>  {
    setCardImageUrl(product.main_picture_url)
  };

  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card className={classes.card} elevation={0}>
          <CardActionArea
            aria-label="View product"
            aria-controls={'product-content-id'}
            aria-haspopup="true"
            onClick={props.handleClickOnViewProduct}
            onMouseOver={handleMouseOnCardImage} 
            onMouseOut={handleMouseOutCardImage}
            className={classes.cardActionClick}
          >
            <CardMedia
              className={classes.cardMedia}
              image={cardImageUrl}
              title={product.title}
            />
            <CardContent className={classes.cardContent}>
              <Typography variant="h6" color="textPrimary" component="h2" className={classes.productTitle}>
                {product.title}
              </Typography>
              <Typography  variant="body2" color="textSecondary" component="p">
                {product.category}
              </Typography>
              <Typography  variant="body2" color="primary" component="p">
                View
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.cardActions}>
            <Dropdown
              placeholder="Select an option"
              options={product.variants}
              value={product.variants[0].value}
              onChange={(value) => handleSelectVariant(value)}
              className={classes.variantList}
              // onSelect={(value) => console.log('selected!', value)} // always fires once a selection happens even if there is no change
              // onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
              // onOpen={(value) => handleSelectVariant(value)}
              />
            <div className={classes.separator}></div>
            <IconButton
              aria-label="Add"
              edge="end"
              onClick={handleAddToBoxButton}
              color="primary"
              >
              <AddCircle fontSize="large"/>
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  )
};