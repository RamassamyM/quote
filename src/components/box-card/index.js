import React from 'react';
import { Tooltip, List, ListItem, Collapse, ListItemText, Slider, Input, Box, Grid, IconButton, Card, CardContent, Typography } from '@material-ui/core';
import { DeleteOutline as DeleteIcon, Help as HelpIcon, ExpandLess, ExpandMore } from '@material-ui/icons';
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
    // {
    //   value: 0,
    //   label: '0',
    // },
    // {
    //   value: 100,
    //   label: '100',
    // },
    // {
    //   value: 500,
    //   label: '500',
    // },
    // {
    //   value: 1000,
    //   label: '1000',
    // }
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
  // const percentageDiscount = box.discount ? (box.discount / (box.unitPrice * box.qty) * 100) : 0;
  const percentageDiscount = ((box.discountedCost - box.prediscountedCost) / box.prediscountedCost) * 100;
  const discountedUnitPrice = box.discountedCost / box.qty;
  const netPrice = box.discountedCost;

  const handleExpandBoxContent = () => {
    setOpenBoxContent(!openBoxContent);
  };

  const ContentList = () => {
    return (
      <List dense className={classes.contentList} >
        <ListItem button onClick={handleExpandBoxContent} className={classes.boxContent}>
          <ListItemText align="right" primary="Show the box content" color="primary" className={classes.boxContentTitle}/>
          {openBoxContent ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openBoxContent} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className={classes.boxExpanded}>
            {items.map(item => (
              <ListItem key={item}>
                <ListItemText align="right" secondary={item} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    );
  };

  return (
    <Card className={classes.boxCard} elevation={0}>
      <Box flexGrow={1}>
        <CardContent className={classes.cardContentArea}>
          <Box display="flex" alignItems="center" className={classes.boxCardHeaderBar}>
            <Box flexGrow={1} display="flex" justifyContent="space-between">
              <Box p={1} display="flex" alignItems="center" className={classes.boxCardHeader}>
                {/* <InboxIcon fontSize="large" color="primary" className={classes.boxIcon} /> */}
                <Typography align="left" component="h3" variant="h5" className={classes.boxCardContentTitle}>
                  {box.name}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              {/* <Box className={classes.boxCardControls}>
                <IconButton aria-label="Edit Item" onClick={preventDefault}>
                <EditIcon className={classes.playIcon} />
                </IconButton>
              </Box> */}
              <Box className={classes.boxCardControls}>
                <IconButton aria-label="Remove Item" onClick={handleRemoveBoxFromQuote}>
                  <DeleteIcon className={classes.deleteIcon} />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <ContentList/>
          <Box mt={1} p={1} className={classes.qtySlider}>
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
              <Grid item>
                <Typography className={classes.boxLabel}>
                  box(es)
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip arrow title="Contact us for bigger quantity of boxes" placement="bottom-end">
                  <HelpIcon color="primary"/>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
          <Box display='flex'>
            <Box>
              <img
                className={classes.boxCardCover}
                alt="box"
                src="https://firebasestorage.googleapis.com/v0/b/curakit-7e00d.appspot.com/o/Curakit%20open%20box_1.png?alt=media&token=bedd4d94-45a8-4f2a-b0d8-c5f0bdbdff10"
              />
            </Box>
            <Box flexGrow={1} display="flex" alignItems="center" justifyContent="space-around">
              <Box>
                <Typography component="h5" variant="subtitle2" color="textSecondary">
                  Unit price:
                </Typography>
                <Typography component="h5" variant="subtitle2" color="textSecondary">
                  £{Number.parseFloat(box.unitPrice).toFixed(2)}
                </Typography>
              </Box>
              <Box>
                <Typography component="h5" variant="subtitle2" color="textSecondary">
                  Quantity discount:
                </Typography>
                <Typography component="h5" variant="subtitle2" color="textSecondary">
                  {Number.parseFloat(percentageDiscount).toFixed(2)}%
                </Typography>
              </Box>
              <Box>
                <Typography component="h5" variant="subtitle2" color="textSecondary">
                  Discounted unit price:
                </Typography>
                <Typography component="h5" variant="subtitle2" color="textSecondary">
                  £{Number.parseFloat(discountedUnitPrice).toFixed(2)}
                </Typography>
              </Box>
              <Box>
                <Typography component="h5" variant="subtitle2" color="primary" className={classes.totalText}>
                  Total:
                </Typography>
                <Typography component="h5" variant="subtitle2" color="primary" className={classes.totalText}>
                £ {Number.parseFloat(netPrice).toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};