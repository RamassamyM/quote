import React from 'react';
import clsx from 'clsx';
import { IconButton, GridList, GridListTile, Box, Chip, Drawer, Button, Grid, Typography, Container } from '@material-ui/core';
import { Zoom, Fab, useScrollTrigger, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import ProductCard from './../../components/product-card';
import { AddCircle, MailOutline as MailOutlineIcon, KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import { Dropdown } from 'react-dropdown-now';
import useStyles from './style';
import { loadProducts, loadProductsForCategory } from './../../core/services/firestore-requests';
// import { arrayRemove } from './../../core/services/utils';

export default function BoxBuilderPage() {
  // Hooks init (useDispatch, useHistory, useLocation, etc.)

  // App state
  
  // Local state
  const [displayBox, setDisplayBox] = React.useState(false)
  const [scroll, setScroll] = React.useState('paper');
  const [productViewModal, setProductViewModal] = React.useState({
    product: null,
    display: false
  });
  const [products, setProducts] = React.useState({
    list: null,
  })
  const [categories, setCategories] = React.useState({
    list: ["Body", "Food", "Room", "Other"],
    selected: "All"
  })
  // Other variables declaration(useRef, useStyles...)
  const classes = useStyles();
  const boxPanelPosition = 'bottom'
  const preventDefault = (event) => event.preventDefault();
  
  // Effect(s)
  React.useEffect(() => {
    (async function () {
      const loadedProducts = await loadProducts();
      await setProducts({list: loadedProducts});
    })();
    
  }, []);

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

  const toggleBoxPanel = (event) => {
    setDisplayBox(!displayBox);
  };
  const handleClickOnViewProduct = (product, scrollType) => {
    console.log(product);
    const variants = product.variants.map((variant) => {
      return { 
        "label": variant.property_value + " " + variant.property_unit + " - " + variant.price +  " " + variant.currency,
        "id": variant.sku,
        "value": variant.sku
      }
    })
    setProductViewModal({product: {
      ...product,
      variants: variants,
     },
     display: true});
    setScroll(scrollType);
  };
  const handleCloseProductView = (event) => {
    setProductViewModal({ product: null, display: false });
  };
  const descriptionElementRef = React.useRef(null);
  const modalDropdownRef = React.useRef(null);
  const modalRef = React.useRef(null);

  const handleSelectFilter = (tag) => {
    if (categories.selected !== tag) {
      console.log("load");
      setCategories({...categories, selected: tag });
      if (tag === "All") {
        (async function () {
          const loadedProducts = await loadProducts();
          await setProducts({list: loadedProducts});
        })();
      } else {
        (async function () {
          const loadedProducts = await loadProductsForCategory(tag);
          await setProducts({list: loadedProducts});
        })();
      }
    }
  };

  const BoxPanelContent = ({ position }) => (
    <div
      className={clsx(classes.boxPanel, {
        [classes.fullBoxPanel]: position === 'top' || position === 'bottom',
      })}
      role="presentation"
    >
      <Typography component='h1'>
        My Box
      </Typography>
    </div>
  );
    
  const ProductGrid = ({ products }) => {
    if (products) {
      return (
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.title} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} handleClickOnViewProduct={() => handleClickOnViewProduct(product, 'paper')}/>
            </Grid>
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
            <Box className={classes.heroBoxTitle}>
              <Typography component="h1" variant="h3" align="center" className={classes.heroTitle}>
                Build your box
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={5} lg={4} className={classes.grid}>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
              <Button component="a" href="mailto:sales@curakit.com" color="primary" className={classes.heroMail} >
                  <MailOutlineIcon className={classes.icon}/>
                  I need a customized box 
              </Button>
              <Box elevation={0} display="flex" flexDirection="row" alignItems="center" justifyContent="center" className={classes.heroButtons}>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  className={classes.buttonBoxPanel}
                  disabled
                >
                {'15'}£&nbsp;&nbsp;|&nbsp;&nbsp;{'12'} ITEMS
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  aria-label="show box content"
                  aria-controls={'boxShow'}
                  aria-haspopup="true"
                  onClick={toggleBoxPanel}
                  disableElevation
                  className={classes.buttonBoxPanel}
                >
                  VIEW MY BOX {'>'}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
      <Box className={classes.filterSection} display="flex" alignItems="center" justifyContent="center">
        <CategoryFilterSection tags={["All"].concat(categories.list)} />
      </Box>
      {/* End hero unit */}
      <Container className={classes.cardGrid} maxWidth="lg">
        <Box display="flex" alignItems="flex-start">
          <ProductGrid products={products.list}/>
        </Box>
      </Container>
      <Drawer anchor={boxPanelPosition} open={displayBox} onClose={toggleBoxPanel}>
        <BoxPanelContent position={boxPanelPosition} />
      </Drawer>
      <Dialog
        name='Product View'
        open={productViewModal.display}
        onClose={handleCloseProductView}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        ref={modalRef}
        >
        { productViewModal.display && (
          <React.Fragment>
            <DialogTitle id="scroll-dialog-title">{productViewModal.product.title}</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                <Grid container spacing={2}>
                  <Grid item md={6}>
                  <div className={classes.modalImageWrapper}>
                    <GridList className={classes.modalImageList} cols={2.5}>
                      {productViewModal.product.picture_urls.map((picture_url, index) => (
                        <GridListTile key={productViewModal.product.id + '-image-' + index} cols={2}>
                          <img src={picture_url} alt={productViewModal.product.id + '-image-' + index} />
                        </GridListTile>
                      ))}
                    </GridList>
                  </div>
                  </Grid>
                  <Grid item md={6}>
                    <Box m={1} className={classes.modalCategory} display="flex" justifyContent="space-between" alignItems="center">
                      <Typography component="h3" >
                        {productViewModal.product.brand}
                      </Typography>
                      <Chip variant="outlined" key={"category-chip"} label={productViewModal.product.category} className={classes.modalChip}/>
                    </Box>
                    <Box className={classes.modalDescription}>
                    {productViewModal.product.description}
                    </Box>
                    <Box className={classes.modalWrapperChip} display="flex">
                      {productViewModal.product.tags.map((tag) => (
                        <Chip size="small" key={"modalChip-" + tag} label={tag} className={classes.modalChip}/>
                      ))}
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Dropdown
                        placeholder="Select an option"
                        options={productViewModal.product.variants}
                        value={productViewModal.product.variants[0].value}
                        onChange={(value) => console.log('change!', value)}
                        // onSelect={(value) => console.log('selected!', value)} // always fires once a selection happens even if there is no change
                        onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
                        onOpen={() => console.log('opened!')}
                      />
                      <div className={classes.separator}></div>
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
                    </Box>
                  </Grid>
                </Grid>
              {/* <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
              </DialogContentText> */}
            </DialogContent>
            <DialogActions>
              <Button name='Close' onClick={handleCloseProductView} color="primary">
                Close
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
      <ScrollTop/>
    </React.Fragment>
  );
}