import React from 'react';
import { IconButton, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
// import Select from 'react-select';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
  },
  separator: {
    flexGrow: '1',
  }
}));

export default function ProductCard() {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();
  const options = [
    { id: 'variant1', value: 'variant1', label: '40cL - 7£' },
    { id: 'variant2', value: 'variant2', label: '100cL - 10£' },
  ];

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.cardMedia}
          image="https://source.unsplash.com/random"
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="h6" component="h2">
            ProductName
          </Typography>
          <Typography  variant="body2" color="textSecondary" component="p">
            40cl
          </Typography>
        </CardContent>
        <Button size="small" color="primary">
          View
        </Button>
      </CardActionArea>
      <CardActions>
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
        <div className={classes.separator}></div>
        <Dropdown
          placeholder="Select an option"
          options={options}
          value="variant1"
          onChange={(value) => console.log('change!', value)}
          onSelect={(value) => console.log('selected!', value)} // always fires once a selection happens even if there is no change
          onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
          onOpen={() => console.log('opened!')}
        />
      </CardActions>
    </Card>
  )
};