import React from 'react';
import { Grid, IconButton, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import useStyles from './style';
import { useDispatch, useSelector } from 'react-redux';
import { addBoxToQuote, selectQuote } from './../../containers/quote-builder-page/quoteSlice';
import { useHistory } from "react-router-dom";
import { arrayMin, arrayMax, scrollUp } from './../../core/services/utils';

export default function BoxIdeaCard(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  let history = useHistory();
  // const preventDefault = (event) => event.preventDefault();
  const boxIdea = props.boxIdea;
  const quote = useSelector(selectQuote);
  const handleClickOnViewBoxIdea = props.handleClickOnViewBoxIdea;
  const [variantSelection, setVariantSelection] = React.useState(null);

  const handleSelectVariant = (payload) => {
    const newVariant = boxIdea.variants.filter((variant) => variant.name === payload.value)[0];
    setVariantSelection(newVariant);
  }
  
  const priceToDisplay = (variantSelection) => {
    if (variantSelection) return "From " + variantSelection.currency + Number.parseFloat(variantSelection.minBoxPrice).toFixed(2);
    return "From £" + Number.parseFloat(arrayMin(boxIdea.variants.map(v => v.minBoxPrice))).toFixed(2) + " to £" + Number.parseFloat(arrayMax(boxIdea.variants.map(v => v.boxPrice))).toFixed(2);
  };

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
              value={variantSelection && variantSelection.name}
              onChange={(value) => handleSelectVariant(value)}
              className={classes.variantList}
            />
            <div className={classes.separator}></div>
            <Typography  variant="body2" color="primary" component="p">
                {priceToDisplay(variantSelection)}
              </Typography>
            <IconButton
              aria-label="Add box to quote"
              edge="end"
              onClick={(event) => handleAddToQuoteButton(event, variantSelection, boxIdea)}
              color="primary"
              disabled={!variantSelection}
              >
              <AddCircle fontSize="large"/>
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  )
};