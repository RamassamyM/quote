import React from 'react';
import { Box } from '@material-ui/core';
import { Zoom, Fab, useScrollTrigger, Typography } from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import useStyles from './style';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectBoxesInQuote, selectQuoteTotalCost } from './boxSlice';

export default function BoxBuilderPage() {
  // Hooks init (useDispatch, useHistory, useLocation, etc.)
  // const dispatch = useDispatch();
  // App state
  // const boxes = useSelector(selectBoxesInQuote);
  // const quoteTotalCost = useSelector(selectQuoteTotalCost);
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
  // Return
  return (
    <React.Fragment>
      <Box className={classes.heroContent} id="back-to-top-anchor">
        <Box className={classes.heroBoxTitle}>
          <Typography component="h1" variant="h3" align="center" className={classes.heroTitle}>
            Build your quote
          </Typography>
        </Box>
      </Box>
      <ScrollTop/>
    </React.Fragment>
  );
}