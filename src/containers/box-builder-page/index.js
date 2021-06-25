import React from 'react';
import { Box, Chip, Drawer, Button, Grid, Typography, Container } from '@material-ui/core';
import { Zoom, Fab, useScrollTrigger } from '@material-ui/core';
import ProductCard from './../../components/product-card';
import ProductModal from './../../components/product-modal';
import BoxView from './../../components/box-view';
import { MailOutline as MailOutlineIcon, KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import useStyles from './style';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsAsync, fetchProductsByCategoryAsync, selectProducts } from './productsSlice';
import { chooseCategoryFilter, selectCategories } from './categoriesSlice';
import { toggleBoxPanel, selectDisplayBoxPanel, selectBoxNumberOfItems, selectBoxTotalCost } from './boxSlice';

export default function BoxBuilderPage() {
  // Hooks init (useDispatch, useHistory, useLocation, etc.)
  const dispatch = useDispatch();
  // App state
  const products = useSelector(selectProducts);
  const boxTotalCost = useSelector(selectBoxTotalCost);
  const boxNumberOfItems = useSelector(selectBoxNumberOfItems);
  const categories = useSelector(selectCategories);
  const displayBox = useSelector(selectDisplayBoxPanel)
  // Local state
  // const [displayBox, setDisplayBox] = React.useState(false)
  const [scroll, setScroll] = React.useState('paper');
  const [productViewModal, setProductViewModal] = React.useState({
    product: null,
    display: false
  });
  // const [categories, setCategories] = React.useState({
  //   list: ["Body", "Food", "Room", "Other"],
  //   selected: "All"
  // })
  // Other variables declaration(useRef, useStyles...)
  const classes = useStyles();
  const boxPanelPosition = 'right'
  // const preventDefault = (event) => event.preventDefault();
  
  // Effect(s)

  // Logic
  const ScrollTop = () => {
    const trigger = useScrollTrigger({
      // target: window(),
      disableHysteresis: true,
      threshold: 100,
    });
    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
    return (
      <Zoom in={trigger}>
        <div onClick={handleClick} role="presentation" className={classes.backToTopButton}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </div>
      </Zoom>
    );
  }

  const toggleBoxView = (event) => {
    // setDisplayBox(!displayBox);
    dispatch(toggleBoxPanel());
  };
  const handleClickOnViewProduct = (product, scrollType) => {
    setProductViewModal({
      product, 
      display: true
    });
    setScroll(scrollType);
  };
  const handleCloseProductView = (event) => {
    setProductViewModal({ product: null, display: false });
  };
  const modalRef = React.useRef(null);

  const handleSelectFilter = (tag) => {
    if (categories.selected !== tag) {
      dispatch(chooseCategoryFilter(tag));
      if (tag === "All") {
        dispatch(fetchProductsAsync());
      } else {
        dispatch(fetchProductsByCategoryAsync(tag));
      }
    }
  };
    
  const ProductGrid = ({ products }) => {
    if (products) {
      return (
        <Grid container spacing={4}>
          {products.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              handleClickOnViewProduct={() => handleClickOnViewProduct(product, 'paper')}
            />
          ))}
        </Grid>
      );
    } else {
      return (
        <Typography component="h4" >
          No product found yet.
        </Typography>
      );
    }
  }

  const CategoryFilterSection = ({ tags }) => {
    if (tags) {
      return (
        <React.Fragment>
          {tags.map((tag) => {
            let variant;
            let color = "secondary"
            if (categories.selected !== tag) {
              variant = "outlined";
              color = undefined;
            }
            return (
              <Chip variant={variant} color={color} key={tag} label={tag} className={classes.filterChip} onClick={() => handleSelectFilter(tag)} ></Chip>
            );
          })}
        </React.Fragment>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
  // Return
  return (
    <React.Fragment>
      {/* Hero unit */}
      <div className={classes.heroContent} id="back-to-top-anchor">
        <Grid container spacing={2}>
          <Grid item md={1} lg={4}>
          </Grid>
          <Grid item xs={12} md={6} lg={4} className={classes.grid}>
            <Box className={classes.heroBoxTitle} display="flex" alignItems="center" justifyContent="center">
              <Typography component="h1" variant="h4" align="center" className={classes.heroTitle}>
                Build your box
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={5} lg={4} className={classes.grid}>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
              <Box elevation={0} display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                <Typography
                  className={classes.costText}
                >
                £&nbsp;{boxTotalCost}
                </Typography>
                <Typography
                  className={classes.nbItemsText}
                >
                &nbsp;&nbsp;{boxNumberOfItems} ITEM(S)
                </Typography>
                <Button
                  variant="contained"
                  aria-label="show box content"
                  aria-controls={'boxShow'}
                  aria-haspopup="true"
                  onClick={toggleBoxView}
                  disableElevation
                  className={classes.viewBoxbutton}
                >
                  VIEW MY BOX
                </Button>
              </Box>
              <Button component="a" href="mailto:sales@curakit.com" className={classes.heroMail} >
                  <MailOutlineIcon className={classes.heroMailIcon}/>
                  I need a customised box 
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>
      <Box className={classes.filterSection} display="flex" alignItems="center" justifyContent="center">
        <CategoryFilterSection tags={["All"].concat(categories.list)} />
      </Box>
      {/* End hero unit */}
      <Container className={classes.cardGrid} maxWidth="md">
        <Box display="flex" alignItems="flex-start">
          <ProductGrid products={products}/>
        </Box>
      </Container>
      <Drawer anchor={boxPanelPosition} open={displayBox} onClose={toggleBoxView}>
        <BoxView position={boxPanelPosition} handleCloseBoxPanel={toggleBoxView}/>
      </Drawer>
      <ProductModal 
        product={productViewModal.product}
        display={productViewModal.display}
        handleCloseProductView={handleCloseProductView}
        reference={modalRef}
        scroll={scroll}
      />
      <ScrollTop/>
    </React.Fragment>
  );
}