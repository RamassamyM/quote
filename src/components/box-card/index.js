import React from 'react';
import { Tooltip, Button, Paper, InputBase, List, ListItem, Collapse, ListItemText, Slider, Input, Box, Grid, IconButton, Card, CardContent, Typography } from '@material-ui/core';
import { Delete as DeleteIcon, Done as DoneIcon, Inbox as InboxIcon, Edit as EditIcon, Help as HelpIcon, ExpandLess, ExpandMore } from '@material-ui/icons';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { setQuantityOfBoxesInQuote, removeBoxFromQuote, changeNameOfBoxInQuote } from './../../containers/quote-builder-page/quoteSlice';
import { resetBox, setBoxBuilderStateForBoxUpdate } from './../../containers/box-builder-page/boxSlice';
import { scrollUp } from './../../core/services/utils';
import { useHistory } from "react-router-dom";

export default function BoxCard(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  let history = useHistory();
  const box = props.box;
  const items = box.items.map(i => i.qty + 'x ' + i.product.title + ' ' + i.variantSelected.label);
  const [value, setValue] = React.useState(box.qty);
  const [displayEditName, setDisplayEditName] = React.useState(false);
  // const [newName, setNewName] = React.useState('');
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

  const handleSubmitNameForm = (event) => {
    event.preventDefault();
    console.log(textFieldRef.current.value);
    if (!!textFieldRef.current.value) {
      dispatch(changeNameOfBoxInQuote({ oldName: box.name, newName: textFieldRef.current.value }));
    }
    setDisplayEditName(!displayEditName);
  };
  const textFieldRef = React.useRef(null);

  const NameBlock = () => {
    if (displayEditName) {
      return (
        <Box p={1} flexGrow={1}>
          <Paper component="form" onSubmit={handleSubmitNameForm}>
            <Box ml={2} display="flex" alignItems="center" justifyContent="space-between" >
              <InputBase
                className={classes.inputEditName}
                placeholder={box.name}
                aria-label="edit name of box"
                inputRef={textFieldRef}
              />
              <Button
                size="small"
                aria-label="validate new name"
                type="submit"
                className={classes.buttonEditForm}
              >
                <DoneIcon className={classes.actionIcon}/>
              </Button>
            </Box>
          </Paper>
        </Box>
      );
    } else {
      return (
        <Box flexGrow={1} className={classes.boxCardHeader}>
          <Typography component="h2" variant="h6" className={classes.boxCardContentTitle}>
            {box.name}
          </Typography>
        </Box>
      );
    }
  };

  const handleClickOnEditNameButton = (event) => {
    event.preventDefault();
    setDisplayEditName(true);
  };
  
  const handleEditBoxFromQuote = (event) => {
    event.preventDefault();
    dispatch(resetBox());
    const payload = {
      items: box.items,
      display: true,
      options : {
        update : true,
        indexInQuote: box.id,
        boxName: box.name,
      },
    };
    dispatch(setBoxBuilderStateForBoxUpdate(payload));
    scrollUp(event);
    history.push("/box-builder");
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
          <Box display="flex" flexWrap="wrap" alignItems="center" justifyContent="flex-end" className={classes.boxCardHeaderBar}>
            <NameBlock/>
            <Box flexGrow={1}  className={classes.boxCardControls}>
              <IconButton aria-label="Edit Name" onClick={handleClickOnEditNameButton}>
                <EditIcon fontSize={'small'} className={classes.actionIcon} />
              </IconButton>
              <IconButton aria-label="Edit Name" onClick={handleEditBoxFromQuote}>
                <InboxIcon fontSize={'small'} className={classes.actionIcon} />
              </IconButton>
              <IconButton aria-label="Remove Item" onClick={handleRemoveBoxFromQuote}>
                <DeleteIcon fontSize={'small'} className={classes.actionIcon} />
              </IconButton>
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