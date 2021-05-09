import React from 'react';
import { List, ListItem, Collapse, ListItemText, Slider, Input, Box, Grid, IconButton, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Delete as DeleteIcon, ExpandLess, ExpandMore, Edit as EditIcon, Inbox as InboxIcon } from '@material-ui/icons';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { setQuantityOfBoxesInQuote, removeBoxFromQuote } from './../../containers/quote-builder-page/quoteSlice';

export default function BoxCard(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const box = props.box;
  const items = box.items.map(i => i.qty + 'x ' + i.product.title + ' ' + i.variantSelected.label);
  const [value, setValue] = React.useState(box.qty);
  const [openBoxContent, setOpenBoxContent] = React.useState(false);
  const preventDefault = (event) => event.preventDefault();
  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 100,
      label: '100',
    },
    {
      value: 500,
      label: '500',
    },
    {
      value: 1000,
      label: '1000',
    }
  ];
  const setQuantity = (event, value) => {
    dispatch(setQuantityOfBoxesInQuote({name: box.name, qty: value}))
  };
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleInputChange = (event) => {
    const newValue = event.target.value === '' ? 0 : Number(event.target.value);
    dispatch(setQuantityOfBoxesInQuote({name: box.name, qty: newValue}))
  };
  const handleRemoveBoxFromQuote = (event) => {
    preventDefault(event);
    dispatch(removeBoxFromQuote({id: box.id}))
  }
  let calculatedPrice, discount, netPrice;
  if (box.unitPrice * box.qty > 30) {
    calculatedPrice = Math.round(box.unitPrice * box.qty);
    discount = Math.round(calculatedPrice * 0.1);
    netPrice = calculatedPrice - discount;
  } else {
    calculatedPrice = box.unitPrice * box.qty;
    discount = Math.floor(calculatedPrice * 10 / 100);
    netPrice = calculatedPrice - discount;
  }

  const handleExpandBoxContent = () => {
    setOpenBoxContent(!openBoxContent);
  };

  const ContentList = () => {
    return (
      <List>
        <ListItem button onClick={handleExpandBoxContent} className={classes.boxContent}>
          <ListItemText primary="What's in this box ?" color="primary"/>
          {openBoxContent ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openBoxContent} timeout="auto" unmountOnExit>
          <Box className={classes.boxExpanded}>
            {items.map(item => (
              <Box align="right">
                <Typography>
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Collapse>
      </List>
    );
  };

  return (
    <Card className={classes.boxCard} elevation={0}>
      <CardMedia
        className={classes.boxCardCover}
        image="https://firebasestorage.googleapis.com/v0/b/curakit-7e00d.appspot.com/o/emptybox.png?alt=media&token=bcb553c5-add3-4bbe-8b36-32f583e338e3"
      />
      <Box flexGrow={1}>
        <CardContent className={classes.cardContentArea}>
          <Box display="flex" alignItems="center">
            <Box flexGrow={1} display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center" className={classes.boxCardHeader}>
                <InboxIcon fontSize="large" color="primary" className={classes.boxIcon} />
                <Typography align="left" component="h3" variant="h5" className={classes.boxCardContentTitle}>
                  {box.name}
                </Typography>
              </Box>
              <Typography align="left" component="h4" variant="subtitle1">
               Unit price: £{box.unitPrice}&nbsp;&nbsp;&nbsp;
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              {/* <Box className={classes.boxCardControls}>
                <IconButton aria-label="Edit Item" onClick={preventDefault}>
                  <EditIcon className={classes.playIcon} />
                </IconButton>
              </Box> */}
              <Box className={classes.boxCardControls}>
                <IconButton aria-label="Remove Item" onClick={handleRemoveBoxFromQuote}>
                  <DeleteIcon className={classes.playIcon} />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box className={classes.qtySlider}>
            <Grid container spacing={2}>
              <Grid item xs>
                <Slider
                  value={typeof value === 'number' ? value : 0}
                  onChange={handleSliderChange}
                  onChangeCommitted={setQuantity}
                  aria-labelledby="input-slider"
                  marks={marks}
                  step={10}
                  max={1000}
                />
              </Grid>
              <Grid item>
                <Input
                  className={classes.input}
                  value={value}
                  margin="none"
                  onChange={handleInputChange}
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: 1000,
                    type: 'number',
                    'aria-labelledby': 'input-linked-to-slider',
                  }}
                  />
              </Grid>
            </Grid>
          </Box>
          <Box flexGrow={1} display="flex" justifyContent="space-around">
            <Typography align="left" component="h5" variant="subtitle1" color="error">
              <del>£ {calculatedPrice}</del>
            </Typography>
            <Typography align="left" component="h5" variant="subtitle1" color="primary">
            Save £ {discount} !
            </Typography>
            <Typography align="left" component="h5" variant="subtitle1" color="primary">
            Pay £ {netPrice}
            </Typography>
          </Box>
          <ContentList/>
        </CardContent>
      </Box>
    </Card>
  );
};