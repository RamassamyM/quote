import React from 'react';
import { Slider, Input, Link, TextField, Box, Button, Grid, IconButton, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon, AddCircle as AddCircleIcon, RemoveCircle as RemoveCircleIcon } from '@material-ui/icons';
// import { Dropdown } from 'react-dropdown-now';
// import 'react-dropdown-now/style.css';
import useStyles from './style';
import { useDispatch } from 'react-redux';

export default function BoxCard(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, setValue] = React.useState(1);
  const preventDefault = (event) => event.preventDefault();
  const box = props.box;
  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 100,
      label: '100',
    },
    {
      value: 500,
      label: '500',
    },
    {
      value: 1000,
      label: '1000',
    }
  ];
  const handleSetQuantity = (event) => {
    event.preventDefault();
    // dispatch(setQuantityOfBox({name: box.name, qty: event.target.value}))
  };
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };
  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 1000) {
      setValue(1000);
    }
  };
  return (
    <Card className={classes.boxCard}>
      <CardMedia
        className={classes.boxCardCover}
        image="https://firebasestorage.googleapis.com/v0/b/curakit-7e00d.appspot.com/o/emptybox.png?alt=media&token=bcb553c5-add3-4bbe-8b36-32f583e338e3"
      />
      <Box  flexGrow={1}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>
              <Typography align="left" component="h5" variant="subtitle1" className={classes.boxCardContentTitle}>
                {box.name}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Box className={classes.boxCardControls}>
                <IconButton aria-label="Edit Item" onClick={preventDefault}>
                  <EditIcon className={classes.playIcon} />
                </IconButton>
              </Box>
              <Box className={classes.boxCardControls}>
                <IconButton aria-label="Remove Item" onClick={preventDefault}>
                  <DeleteIcon className={classes.playIcon} />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box className={classes.qtySlider}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  value={typeof value === 'number' ? value : 0}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                  marks={marks}
                  step={10}
                  max={1000}
                />
              </Grid>
              <Grid item>
                <Input
                  className={classes.input}
                  value={value}
                  margin="dense"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: 1000,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                  />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};