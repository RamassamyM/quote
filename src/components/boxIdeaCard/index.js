import React from 'react';
import { Grid, IconButton, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { addBoxToQuote } from './../../containers/quote-builder-page/quoteSlice';
import { useHistory } from "react-router-dom";

export default function BoxIdeaCard(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  // const preventDefault = (event) => event.preventDefault();
  const boxIdea = props.boxIdea;
  const handleAfterAddingBox = props.handleAfterAddingBox;
  const handleClickOnViewBoxIdea = props.handleClickOnViewBoxIdea;
  const [variantSelection, setVariantSelection] = React.useState(boxIdea.variants[0]);
  let history = useHistory();

  const handleSelectVariant = (value) => {
    setVariantSelection(value);
  };

  const handleAddToQuoteButton = (event) => {
    event.preventDefault();
    const box = {items: variantSelection.items, unitPrice: 0, minPrice: 0 }
    dispatch(addBoxToQuote({ ...box, name: boxIdea.name }))
    handleAfterAddingBox();
    history.push("/");
  };

  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} >
        <Card className={classes.card} elevation={0}>
          <CardActionArea
            aria-label="View product"
            aria-controls={'product-content-id'}
            aria-haspopup="true"
            onClick={handleClickOnViewBoxIdea}
            className={classes.cardActionClick}
          >
            <CardMedia
              className={classes.cardMedia}
              image={boxIdea.main_picture_url}
              title={boxIdea.title}
            />
            <CardContent className={classes.cardContent}>
              <Typography variant="h6" color="textPrimary" component="h2" className={classes.productTitle}>
                {boxIdea.title}
              </Typography>
              <Typography  variant="body2" color="textSecondary" component="p">
                {boxIdea.category}
              </Typography>
              <Typography  variant="body2" color="primary" component="p">
                View
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.cardActions}>
            <Dropdown
              placeholder="Select an option"
              options={boxIdea.variants.map(v => v.name)}
              value={boxIdea.variants[0]}
              onChange={(value) => handleSelectVariant(value)}
              className={classes.variantList}
            />
            <div className={classes.separator}></div>
            <IconButton
              aria-label="Add"
              edge="end"
              onClick={handleAddToQuoteButton}
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