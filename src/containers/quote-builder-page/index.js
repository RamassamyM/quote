import React from 'react';
import { Box } from '@material-ui/core';
import { Button, Container, Grid, Zoom, Fab, useScrollTrigger, Typography } from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import useStyles from './style';
import { useSelector, useDispatch } from 'react-redux';
import { selectBoxesInQuote, selectQuoteTotalCost } from './quoteSlice';
import { Link as RouterLink } from 'react-router-dom'

export default function BoxBuilderPage() {
  // Hooks init (useDispatch, useHistory, useLocation, etc.)
  const dispatch = useDispatch();
  // App state
  const boxes = useSelector(selectBoxesInQuote);
  const quoteTotalCost = useSelector(selectQuoteTotalCost);
  // Local state
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

  const BoxesGrid = ({ boxes }) => {
    if (boxes) {
      return (
        <Grid container spacing={4}>
          {boxes.map((box) => (
            <Box>
              {box.toString}
            </Box>
          ))}
        </Grid>
      );
    } else {
      return (
        <>
          <Typography component="h4" >
            You have not added a box in your quote.
          </Typography>
          <Button component={RouterLink} to="/box-builder" aria-label="Add a box">
            Add a box
          </Button>
        </>
      );
    }
  }

  // Return
  return (
    <React.Fragment>
      {/* Hero unit */}
      <div className={classes.heroContent} id="back-to-top-anchor">
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.grid}>
            <Box className={classes.heroBoxTitle}>
              <Typography component="h1" variant="h3" align="center" className={classes.heroTitle}>
                Build your Quote
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
      {/* End hero unit */}
      <Container maxWidth="lg">
        <Box display="flex" alignItems="flex-start" className={classes.boxGridWrapper}>
          <BoxesGrid boxes={boxes}/>
        </Box>
      </Container>
      <ScrollTop/>
    </React.Fragment>
  );
}