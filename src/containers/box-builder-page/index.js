import React from 'react';
import clsx from 'clsx';
import { Icon, Link, Box, Paper, Drawer, Button, Grid, Typography, Container } from '@material-ui/core';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { FormGroup, FormControlLabel, Checkbox, CheckBoxOutlineBlankIcon, CheckBoxIcon } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProductCard from './../../components/product-card';
import { ExpandMore as ExpandMoreIcon, MailOutline as MailOutlineIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  heroContent: {
    backgroundColor: theme.palette.secondary.main,
    marginTop: '56px',
    padding: theme.spacing(0, 0, 2),
    [theme.breakpoints.up('md')]: {
      marginTop: '64px',
      padding: theme.spacing(2, 0, 2),
    },
  },
  heroBoxTitle: {
    [theme.breakpoints.up('sm')]: {
      marginTop: '20px',
    },
  },
  heroTitle: {
    color: theme.palette.secondary.lighter,
    [theme.breakpoints.down('sm')]: {
      fontSize: '36px',
      '& h2': {
        margin: 'none',
      }
    },
  },
  heroButtons: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '5px',
    padding: theme.spacing(1),
    color: theme.palette.secondary.lighter,
  },
  heroMail: {
    margin: theme.spacing(1),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  boxPanel: {
    width: 250,
    padding: theme.spacing(2),
  },
  fullBoxPanel: {
    width: 'auto',
    minHeight: '200px',
  },
  buttonBoxPanel: {
    color: theme.palette.white.main,
    '&:disabled': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.white.main
    }
  },
  filterPanel: {
    marginRight: theme.spacing(4),
    padding: theme.spacing(2),
    width: '300px',
    backgroundColor: 'transparent',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  }
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function BoxBuilderPage() {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();
  const [displayBox, setDisplayBox] = React.useState(false)
  const toggleBoxPanel = (event) => {
    setDisplayBox(!displayBox);
  };
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
  
  const [scroll, setScroll] = React.useState('paper');

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

  const boxPanelContent = (anchor) => (
    <div
      className={clsx(classes.boxPanel, {
        [classes.fullBoxPanel]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    >
      <Typography component='h1'>
        My Box
      </Typography>
    </div>
  );
  const boxPanelPosition = 'bottom'

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
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <ProductCard />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Drawer anchor={boxPanelPosition} open={displayBox} onClose={toggleBoxPanel}>
        {boxPanelContent(boxPanelPosition)}
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