import React from 'react';
import { IconButton, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
  },
  separator: {
    flexGrow: '1',
  }
}));

export default function ProductCard(props) {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();
  let variants = [];
  const product = props.product;
  if (product && product["variants"]) {
    variants = product["variants"];
    variants = variants.map((variant) => {
      return { 
        "label": variant.property_value + " " + variant.property_unit + " - " + variant.price +  " " + variant.currency,
        "id": variant.sku,
        "value": variant.sku
      }
    })
  }
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.cardMedia}
          image={product["main_picture_url"]}
          title={product.title}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="h6" component="h2">
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
      <CardActions>
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
        <div className={classes.separator}></div>
        <Dropdown
          placeholder="Select an option"
          options={variants}
          value={variants[0].value}
          onChange={(value) => console.log('change!', value)}
          // onSelect={(value) => console.log('selected!', value)} // always fires once a selection happens even if there is no change
          onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
          onOpen={() => console.log('opened!')}
        />
      </CardActions>
    </Card>
  )
};