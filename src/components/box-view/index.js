import React from 'react';
import clsx from 'clsx';
import { Toolbar, AppBar, Typography, Box, IconButton, Card, CardActions, CardContent, CardMedia, Button } from '@material-ui/core';
import { Clear as ClearIcon, AddCircle as AddCircleIcon, RemoveCircle as RemoveCircleIcon } from '@material-ui/icons';
import useStyles from './style';
import { useSelector, useDispatch } from 'react-redux';
import { selectBoxItems, selectBoxTotalCost, selectBoxNumberOfItems, removeProductFromBox, addOneQuantityOfProductInBox, removeOneQuantityOfProductInBox } from './../../containers/box-builder-page/boxSlice';

const BoxView = (props) => {
  // Hooks init (useDispatch, useHistory, useLocation, etc.)
  const boxItems = useSelector(selectBoxItems);
  const boxNumberOfItems = useSelector(selectBoxNumberOfItems);
  const boxTotalCost = useSelector(selectBoxTotalCost);
  const dispatch = useDispatch();
  // App state
  // Local state
  // const [displayBox, setDisplayBox] = React.useState(false)
  // Other variables declaration(useRef, useStyles...)
  const classes = useStyles();
  const position = props.position;
  // const preventDefault = (event) => event.preventDefault();
  // Effect(s)
  // React.useEffect(() => {
  //   (async function () {
  //     // todo;
  //   })(); 
  // }, []);
  // Logic
  // const modalRef = React.useRef(null);
  const handleOneMore = (item) => {
    dispatch(addOneQuantityOfProductInBox(item));
  };
  const handleOneLess = (item) => {
    dispatch(removeOneQuantityOfProductInBox(item));
  };
  const handleClearItem = (item) => {
    dispatch(removeProductFromBox(item));
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
            <ClearIcon className={classes.playIcon} />
          </IconButton>

        </div>
      </Card>
    );
  }

  // Return
  return (
    <Box
      className={clsx(classes.boxPanel, {
        [classes.fullBoxPanel]: position === 'top' || position === 'bottom',
      })}
      role="presentation"
    >
      <Box display="flex" flexDirection="row-reverse">
        <IconButton
          aria-label="Close"
          edge="end"
          onClick={props.handleCloseBoxPanel}
          color="secondary"
          >
          <ClearIcon fontSize="large"/>
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="center" mb={4}>
        <Typography variant="h4" component="h2" >
          My Box
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-around" flexWrap="wrap">
        <Box className={classes.boxAnimationWrapper}>
          <img alt="box-image" src="https://firebasestorage.googleapis.com/v0/b/curakit-7e00d.appspot.com/o/box_sm_1024x.png?alt=media&token=4fa9c2cc-e1f6-4102-b2c8-ce1394b62c82"/>
        </Box>
        <Box className={classes.boxItemsWrapper}>
          {boxItems.map(item => (
            <ItemCard item={item} />
          ))}
        </Box>
      </Box>
      <AppBar position="fixed" color="primary" className={classes.totalCostBar}>
        <Toolbar>
          <div className={classes.grow} />
          <Typography className={classes.boxTotalCostText}>
            {boxTotalCost}&nbsp;£&nbsp;&nbsp;|&nbsp;&nbsp;{boxNumberOfItems}&nbsp;ITEM(S)
          </Typography>
          <Button variant="contained" color="secondary">
            Add box to quote
          </Button>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default BoxView;
