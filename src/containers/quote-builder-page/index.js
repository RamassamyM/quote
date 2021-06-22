import React from 'react';
import { Box } from '@material-ui/core';
import { AppBar, Toolbar, Button, Grid, Zoom, Fab, useScrollTrigger, Typography } from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon, MailOutline as MailOutlineIcon } from '@material-ui/icons';
import useStyles from './style';
import { useSelector } from 'react-redux';
import { selectBoxesInQuote, selectQuoteTotalDiscount, selectQuoteTotalCost, selectNumberOfBoxesInQuote } from './quoteSlice';
import { Link as RouterLink } from 'react-router-dom'
import BoxCard from './../../components/box-card';
import QuoteDetailsModal from './../../components/quoteDetailsModal';

export default function BoxBuilderPage() {
  // Hooks init (useDispatch, useHistory, useLocation, etc.)
  // const dispatch = useDispatch();
  // App state
  const boxes = useSelector(selectBoxesInQuote);
  const quoteTotalCost = useSelector(selectQuoteTotalCost);
  const quoteTotalDiscount = useSelector(selectQuoteTotalDiscount);
  const quoteNetCost = quoteTotalCost - quoteTotalDiscount;
  const NumberOfBoxesInQuote = useSelector(selectNumberOfBoxesInQuote);
  // Local state
  const [scroll, setScroll] = React.useState('paper');
  const [quoteDetailsViewModal, setQuoteDetailsViewModal] = React.useState({
    display: false
  });
  // Other variables declaration(useRef, useStyles...)
  const classes = useStyles();
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

  const handleClickOnRequestQuote = (product, scrollType) => {
    setQuoteDetailsViewModal({
      display: true
    });
    setScroll(scrollType);
  };
  const handleCloseDetailsView = (event) => {
    setQuoteDetailsViewModal({ display: false });
  };

  const modalRef = React.useRef(null);

  const BoxesWrapper = ({ boxes }) => {
    if (boxes && boxes.length > 0) {
      return (
        <Grid container>
          <Grid item xs={1} sm={2} md={3}></Grid>
          <Grid item xs={10} sm={8} md={6} align="center">
            <Box>
            {boxes.map((box) => (
              <BoxCard key={box.name} box={box}/>
              ))}
            </Box>
            <Button disableElevation className={classes.addABoxButton} size="large" fullWidth={false} variant="outlined" color="primary" component={RouterLink} to="/box-builder" aria-label="Add a box">
              Build another box
            </Button>
          </Grid>
          <Grid item xs={1} sm={2} md={3}></Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container>
          <Grid item xs={12}  align="center">
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" className={classes.emptyContent}>
              <Box mb={4} mt={6}>
                <Typography component="h4">
                  Let's start by creating and adding amazing and personalized Curakit boxes !
                </Typography>
              </Box>
              <Box mb={4}>
              <Button disableElevation className={classes.addABoxButton} variant="outlined" color="primary" component={RouterLink} to="/box-builder" aria-label="Add a box">
                Build a box
              </Button>
              </Box>
              <Box mb={4}>
                <img alt="empty box" className={classes.emptyBoximage} src="https://firebasestorage.googleapis.com/v0/b/curakit-7e00d.appspot.com/o/empty.png?alt=media&token=87aafaa9-20ee-4cab-8853-30017f6656d2"></img>
              </Box>
            </Box>
          </Grid>
        </Grid>
      );
    }
  }

  // Return
  return (
    <React.Fragment>
      {/* Hero unit */}
      <Box className={classes.heroContent} id="back-to-top-anchor" display="flex" alignItems="center">
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.grid}>
            <Box className={classes.heroBoxTitle}>
              <Typography component="h1" variant="h4" align="center" className={classes.heroTitle}>
                Request a quote
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* End hero unit */}
      <Box className={classes.quoteContentWrapper}>
        <BoxesWrapper boxes={boxes}/>
      </Box>
      { boxes && boxes.length > 0 && (
        <AppBar color="primary" className={classes.totalCostBar}>
          <Toolbar>
            <div className={classes.separator} />
            <Box className={classes.totalCostInfosWrapper}>
              <Box flexGrow={1} display="flex" justifyContent="space-between">
                <Typography variant="subtitle2" className={classes.quoteTotalCostText}>
                  Boxes
                </Typography>
                <Typography variant="subtitle2" className={classes.quoteTotalCostText}>
                  {NumberOfBoxesInQuote}
                </Typography>
              </Box>
              <Box flexGrow={1} display="flex" justifyContent="space-between">
                <Typography variant="subtitle1" color="primary" className={classes.quoteTotalCostTextBold}>
                  Total
                </Typography>
                <Typography variant="subtitle1" color="primary" className={classes.quoteTotalCostTextBold}>
                  £&nbsp;{Math.round(quoteNetCost)}
                </Typography>
              </Box>
              {/* { quoteNetCost !== quoteTotalCost && (
                <Typography variant="h6" className={classes.quoteTotalCostText} >
                  <del>£&nbsp;{quoteTotalCost}</del>
                </Typography>
              )}           
              <Typography variant="h6"  className={classes.quoteTotalCostText}>
                £&nbsp;{quoteNetCost}
              </Typography> */}
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Button className={classes.requestQuoteButton} disableElevation disabled={NumberOfBoxesInQuote === 0} variant="contained" color="secondary" onClick={handleClickOnRequestQuote}>
                Request Quote
              </Button>
              <Button size="small" component="a" href="mailto:sales@curakit.com" className={classes.heroMail} >
                <MailOutlineIcon className={classes.heroMailIcon}/>
                Contact us
              </Button>
            </Box>
            <div className={classes.separator} />
          </Toolbar>
        </AppBar>
      )}
      <QuoteDetailsModal 
        display={quoteDetailsViewModal.display}
        handleCloseDetailsView={handleCloseDetailsView}
        reference={modalRef}
        scroll={scroll}
        />
      <ScrollTop/>
    </React.Fragment>
  );
}