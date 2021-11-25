import React from 'react';
import { Tooltip, Button, Paper, TextField, List, ListItem, Collapse, ListItemText, Slider, Input, Box, Grid, IconButton, Card, CardContent, Typography } from '@material-ui/core';
import { Delete as DeleteIcon, Done as DoneIcon, Inbox as InboxIcon, Edit as EditIcon, Help as HelpIcon, ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import useStyles from './style';
import { useDispatch, useSelector } from 'react-redux';
import { setQuantityOfBoxesInQuote, selectQuote, removeBoxFromQuote, changeNameOfBoxInQuote } from './../../containers/quote-builder-page/quoteSlice';
import { resetBox, setBoxBuilderStateForBoxUpdate } from './../../containers/box-builder-page/boxSlice';
import { scrollUp } from './../../core/services/utils';
import { useHistory } from "react-router-dom";

const BoxCard = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  let history = useHistory();
  const quote = useSelector(selectQuote);
  const box = props.box;
  const textFieldRef = React.useRef(null);
  const qtyFieldRef = React.useRef(null);
  const [qty, setQty] = React.useState(box.qty);
  console.log("qty in local state: ", qty);
  const [displayEditQty, setDisplayEditQty] = React.useState(false);
  const items = box.items.map(i => i.qty + 'x ' + i.product.title + ' ' + i.variantSelected.label);
  const [boxNameError, setBoxNameError] = React.useState(false);
  const [displayEditName, setDisplayEditName] = React.useState(false);
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


  const handleRemoveBoxFromQuote = (event) => {
    preventDefault(event);
    dispatch(removeBoxFromQuote({id: box.id}))
  }
  const percentageDiscount = ((box.discountedCost - box.prediscountedCost) / box.prediscountedCost) * 100;
  const discountedUnitPrice = box.discountedCost / box.qty;
  const netPrice = box.discountedCost;

  // Edit Name functions and component

  const handleClickOnEditNameButton = (event) => {
    event.preventDefault();
    setDisplayEditName(true);
  };

  const checkIfNameOfBoxIsTaken = (name) => {
    const boxNamesList = quote.boxes.map((box) => box.name);
    return boxNamesList.includes(name)
  };

  const handleSubmitNameForm = (event) => {
    event.preventDefault();
    const newName = textFieldRef.current.value
    if (checkIfNameOfBoxIsTaken(newName)) {
      setBoxNameError(true)
    } else {
      setBoxNameError(false)
      if (!!textFieldRef.current.value) {
        dispatch(changeNameOfBoxInQuote({ oldName: box.name, newName: newName }));
      }
      setDisplayEditName(!displayEditName);
    }
  };
  const boxNameErrorHelpText = boxNameError ? 'Name already exists' : '';

  const NameBlock = () => {
    if (displayEditName) {
      return (
        <Box p={1} flexGrow={1}>
          <Paper component="form" onSubmit={handleSubmitNameForm}>
            <Box display="flex" alignItems="center" justifyContent="space-between" >
              <TextField
                className={classes.inputEditName}
                helperText={boxNameErrorHelpText} 
                error={boxNameError} 
                placeholder={box.name}
                aria-label="edit name of box"
                ref={textFieldRef}
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

  // Edit Quantity functions and component


  const setQuantityInQuote = (event, value) => {
    preventDefault(event);
    dispatch(setQuantityOfBoxesInQuote({name: box.name, qty: qty}))
  };

  const handleSliderChange = (event, newValue) => {
    preventDefault(event);
    setQty(newValue);
  };

  const handleSubmitQtyForm = (event) => {
    event.preventDefault();
    const newQty = parseInt(qtyFieldRef.current.value);
    if (newQty === 0 || !!newQty) {
      dispatch(setQuantityOfBoxesInQuote({name: box.name, qty: newQty}));
    }
    setDisplayEditQty(!displayEditQty);
  };

  const QtyBlock = () => {
    if (displayEditQty) {
      return (
        <Box component="form" onSubmit={handleSubmitQtyForm} display="flex" alignItems="center" justifyContent="space-between" >
          <Input
              className={classes.inputEditQty}
              placeholder={typeof qty === 'number' ? qty.toString() : '0'}
              margin="none"
              inputRef={qtyFieldRef}
              inputProps={{
                min: 0,
                max: 1000,
                type: 'number',
                'aria-labelledby': 'input-linked-to-slider',
              }}
          />
          <IconButton
            size="small"
            aria-label="validate new qty"
            type="submit"
            className={classes.buttonValidateQty}
          >
            <DoneIcon/>
          </IconButton>
        </Box>
      );
    } else {
      return (
        <Button
          variant="outlined" 
          color="primary"
          size="small"
          aria-label="qty of boxes"
          className={classes.buttonQtyForm}
          onClick={() => setDisplayEditQty(!displayEditQty)}
        >
          <Typography component="h6" variant="h6" className={classes.boxQtyFieldText}>
            {typeof qty === 'number' ? qty.toString() : 0}
          </Typography>
        </Button>
      );
    }
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

  // Show content of box

  const handleExpandBoxContent = () => {
    setOpenBoxContent(!openBoxContent);
  };

  const ContentList = () => {
    return (
      <List dense className={classes.contentList} >
        <ListItem button onClick={handleExpandBoxContent} className={classes.boxContent}>
          <ListItemText align="right" primary="Show the box content" color="primary" className={classes.boxContentTitle}/>
          {openBoxContent ? <ExpandLessIcon /> : <ExpandMoreIcon />}
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
              <Tooltip arrow title="Edit the name of the box" placement="bottom-end">
                <IconButton aria-label="Edit Name" onClick={handleClickOnEditNameButton}>
                  <EditIcon fontSize={'small'} className={classes.actionIcon} />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="See and edit the content of the box" placement="bottom-end">
                <IconButton aria-label="Edit Content" onClick={handleEditBoxFromQuote}>
                  <InboxIcon fontSize={'small'} className={classes.actionIcon} />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Remove this box" placement="bottom-end">
                <IconButton aria-label="Remove Item" onClick={handleRemoveBoxFromQuote}>
                  <DeleteIcon fontSize={'small'} className={classes.actionIcon} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <ContentList/>
          <Box mt={1} p={1} className={classes.qtySlider}>
            <Grid container spacing={2}>
              <Grid item xs>
                <Box display="flex" alignItems="center" className={classes.fullHeightBox}>
                  <Slider
                    value={typeof qty === 'number' ? qty : 0}
                    onChange={handleSliderChange}
                    onChangeCommitted={setQuantityInQuote}
                    aria-labelledby="input-slider"
                    marks={marks}
                    step={10}
                    max={1000}
                  />
                </Box>
              </Grid>
              <Grid item>
                <QtyBlock/>
              </Grid>
              <Grid item>
                <Box display="flex" alignItems="center" className={classes.fullHeightBox}>
                  <Typography className={classes.boxLabel}>
                    box(es)
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Tooltip arrow title="Choose the number of boxes using the slider to give an indicated price. We will formalise prices directly with you, and offer any additional discounts based on quantity in a formal quote." placement="bottom-end">
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

export default BoxCard;