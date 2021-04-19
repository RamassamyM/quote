import React from 'react';
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { Paper, Checkbox, Accordion, AccordionSummary, Typography, AccordionDetails, FormGroup, FormControlLabel } from '@material-ui/icons';
import useStyles from './style';

const FilterSet = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
    checkedD: true,
    checkedE: true,
    checkedF: true,
  });
  const handleChangeOnCheckbox = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
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
  );
};

export default FilterSet;