import React from 'react';
import clsx from 'clsx';
import { Box, Paper, Drawer, Button, Grid, Typography, Container } from '@material-ui/core';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import ProductCard from './../../components/product-card';
import { ExpandMore as ExpandMoreIcon, MailOutline as MailOutlineIcon } from '@material-ui/icons';
import fire from './../../fire';
import useStyles from './style';

export default function BoxBuilderPage() {
  // Hooks init (useDispatch, useHistory, useLocation, etc.)

  // App state
  
  // Local state
  const [displayBox, setDisplayBox] = React.useState(false)
  const [scroll, setScroll] = React.useState('paper');
  const [products, setProducts] = React.useState({
    // list: [{
    //   title: "title",
    //   description: "",
    //   category: "",
    //   main_picture_url: "https://firebasestorage.googleapis.com/v0/b/curakit-7e00d.appspot.com/o/CURAKIT_Original_2.png?alt=media&token=eb1bbec3-4c36-4d47-a2b6-ecf39f203508",
    //   variants: [{
    //     sku: "-",
    //     price: "",
    //     price_unit: "",
    //     property_unit: "",
    //     property_value: "",
    //     currency: ""
    //   }]
    // }],
    list: null,
  })
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
    checkedD: true,
    checkedE: true,
    checkedF: true,
    viewProductA: false,
    viewProductB: false,
    viewProductC: false,
    viewProductD: false,
    viewProductE: false,
  });
  
  // Other variables declaration(useRef, useStyles...)
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();
  const boxPanelPosition = 'bottom'
  
  // Effect(s)
  React.useEffect(() => {
    // Create an scoped async function in the hook
    async function handleLoadProducts() {
      const db = await fire.firestore();
      let products = [];
      await db.collection("products").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          products.push({id: doc.id, ...doc.data()});
        });
      });
      return products;
    }
    // Execute the created function directly
    // Set state of list of products
    (async function () {
      const loadedProducts = await handleLoadProducts();
      await setProducts({list: loadedProducts});
    })();
    
  }, []);


  // Logic
  const toggleBoxPanel = (event) => {
    setDisplayBox(!displayBox);
  };
  const handleChangeOnCheckbox = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleClickOnProductView = (event, scrollType) => () => {
    setState({ ...state, [event.target.name]: true });
    setScroll(scrollType);
  };
  const handleCloseProductView = (event) => {
    setState({ ...state, [event.target.name]: false });
  };
  const descriptionElementRef = React.useRef(null);

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
            <Grid item key={product.title} xs={12} sm={6} md={4}>
              <ProductCard product={product}/>
            </Grid>
          ))}
        </Grid>
      )
    } else {
      return (
        <Typography component="h4" >
          No product found yet.
        </Typography>
      );
    }
  }

  // Return
  return (
    <React.Fragment>
      {/* Hero unit */}
      <div className={classes.heroContent}>
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
      {/* End hero unit */}
      <Container className={classes.cardGrid} maxWidth="lg">
        <Box display="flex" alignItems="flex-start">
          <Paper className={classes.filterPanel} elevation={0} >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Category 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={state.checkedA} onChange={handleChangeOnCheckbox} name="checkedA" />}
                    label="Protections"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={state.checkedB} onChange={handleChangeOnCheckbox} name="checkedB" />}
                    label="Creams"
                  />
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>Category 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={state.checkedC} onChange={handleChangeOnCheckbox} name="checkedC" />}
                    label="Food"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={state.checkedD} onChange={handleChangeOnCheckbox} name="checkedD" />}
                    label="Drinks"
                  />
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography className={classes.heading}>Category 3</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={state.checkedE} onChange={handleChangeOnCheckbox} name="checkedE" />}
                    label="Oils"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={state.checkedF} onChange={handleChangeOnCheckbox} name="checkedF" />}
                    label="Therapy"
                  />
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          </Paper>
          <ProductGrid products={products.list}/>
        </Box>
      </Container>
      <Drawer anchor={boxPanelPosition} open={displayBox} onClose={toggleBoxPanel}>
        <BoxPanelContent position={boxPanelPosition} />
      </Drawer>
      <Dialog
        name='viewProductA'
        open={state['viewProductA']}
        onClose={handleCloseProductView}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button name='viewProductA' onClick={handleCloseProductView} color="primary">
            Cancel
          </Button>
          <Button name='viewProductA' onClick={handleCloseProductView} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}