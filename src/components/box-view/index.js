import React from 'react';
import clsx from 'clsx';
import { Toolbar, AppBar, Typography, Box, IconButton, Card, CardContent, CardMedia, Button } from '@material-ui/core';
import { Clear as ClearIcon, Delete as DeleteIcon, AddCircle as AddCircleIcon, RemoveCircle as RemoveCircleIcon } from '@material-ui/icons';
import useStyles from './style';
import { useSelector, useDispatch } from 'react-redux';
import { selectBoxItems, selectBoxTotalCost, selectBoxNumberOfItems, removeProductFromBox, addOneQuantityOfProductInBox, removeOneQuantityOfProductInBox } from './../../containers/box-builder-page/boxSlice';
import ElevationScroll from './../elevationScroll';
import BoxConfirmationModal from './../boxConfirmationModal';

const BoxView = (props) => {
  // Hooks init (useDispatch, useHistory, useLocation, etc.)
  const boxItems = useSelector(selectBoxItems);
  const boxNumberOfItems = useSelector(selectBoxNumberOfItems);
  const boxTotalCost = useSelector(selectBoxTotalCost);
  const dispatch = useDispatch();
  // App state
  // Local state
  const [boxConfirmationViewModal, setBoxConfirmationViewModal] = React.useState({
    display: false
  });
  const [scroll, setScroll] = React.useState('paper');
  // Other variables declaration(useRef, useStyles...)
  const classes = useStyles();
  const position = props.position;
  // const preventDefault = (event) => event.preventDefault();
  // Effect(s)
  // Logic
  const handleCloseBoxConfirmationView = (event) => {
    setBoxConfirmationViewModal({ display: false });
  };
  const modalRef = React.useRef(null);
  const handleClickOnAddBox = (scrollType) => {
    setBoxConfirmationViewModal({
      display: true
    });
    setScroll(scrollType);
  };

  const handleOneMore = (item) => {
    dispatch(addOneQuantityOfProductInBox(item));
  };
  const handleOneLess = (item) => {
    dispatch(removeOneQuantityOfProductInBox(item));
  };
  const handleClearItem = (item) => {
    dispatch(removeProductFromBox(item));
  };
  const handleCloseBoxPanel = props.handleCloseBoxPanel;
  const handleAfterAddingBox = handleCloseBoxPanel;
  const ItemsWrapper = (props) => {
    const boxItems = props.boxItems;
    if (boxItems && boxItems.length > 0) {
      return  (
        <Box className={classes.boxItemsWrapper}>
          {boxItems.map(item => (
            <ItemCard key={item.variantSelected.id} item={item} />
          ))}
        </Box>
      );
    } else {
      return (
        <Box className={classes.emptyItems}>
          <Typography component="p">
            Your box is empty, please select some products.
          </Typography>
        </Box>
      );
    }
  };

  const ItemCard = (props) => {
    const item = props.item
    return (
      <Card className={classes.boxItemCard}>
        <CardMedia
          className={classes.boxItemCardCover}
          image={item.product.main_picture_url}
          title={item.product.title}
        />
        <div className={classes.boxItemCardDetails}>
          <CardContent className={classes.boxItemCardContent}>
            <Typography component="h5" variant="subtitle1" className={classes.boxItemCardContentTitle}>
              {item.product.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {item.variantSelected.label}
            </Typography>
          </CardContent>
        </div>
        <div className={classes.boxItemCardControls}>
          <IconButton aria-label="Add one" onClick={() => handleOneMore(item)}>
            <AddCircleIcon className={classes.playIcon} />
          </IconButton>
          <Typography>
            {item.qty}
          </Typography>
          <IconButton aria-label="Remove one" onClick={() => handleOneLess(item)}>
            <RemoveCircleIcon className={classes.playIcon} />
          </IconButton>
        </div>
        <div className={classes.boxItemCardControls}>
          <IconButton aria-label="Remove Item" onClick={() => handleClearItem(item)}>
            <DeleteIcon className={classes.playIcon} />
          </IconButton>

        </div>
      </Card>
    );
  }

  // Return
  return (
    <React.Fragment>
      <Box
        className={clsx(classes.boxPanel, {
          [classes.fullBoxPanel]: position === 'top' || position === 'bottom',
        })}
        role="presentation"
      >
        <ElevationScroll {...props}>
          <AppBar position="sticky" className={classes.boxViewHeader}>
            <Toolbar>
              <Box className={classes.grow} display="flex" justifyContent="center">
                <Typography variant="h5" component="h2" >
                  My Box
                </Typography>
              </Box>
              <IconButton
                aria-label="Close"
                edge="end"
                onClick={handleCloseBoxPanel}
                className={classes.iconClose}
              >
              <ClearIcon fontSize="large"/>
            </IconButton>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Box display="flex" justifyContent="space-around" flexWrap="wrap" className={classes.boxContentWrapper}>
          {/* <Box className={classes.boxAnimationWrapper}>
            <img alt="box" src="https://firebasestorage.googleapis.com/v0/b/curakit-7e00d.appspot.com/o/box_sm_1024x.png?alt=media&token=4fa9c2cc-e1f6-4102-b2c8-ce1394b62c82"/>
          </Box> */}
          <ItemsWrapper boxItems={boxItems}/>
        </Box>
      <AppBar color="primary" className={classes.totalCostBar}>
        <Toolbar>
          <div className={classes.grow} />
          <Typography className={classes.boxTotalCostText}>
            {boxTotalCost}&nbsp;£
          </Typography>
          <Typography className={classes.boxTotalCostText}>
            {boxNumberOfItems}&nbsp;ITEM(S)
          </Typography>
          <Button disabled={boxNumberOfItems === 0} variant="contained" color="secondary" onClick={() => handleClickOnAddBox('paper')}>
            Add box to quote
          </Button>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
      </Box>
      <BoxConfirmationModal 
        display={boxConfirmationViewModal.display}
        handleCloseBoxConfirmationView={handleCloseBoxConfirmationView}
        reference={modalRef}
        scroll={scroll}
        handleAfterAddingBox={handleAfterAddingBox}
      />
    </React.Fragment>
  );
};

export default BoxView;
