import React from 'react';
import clsx from 'clsx';
import { IconButton, Button, Typography, Container } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import useStyles from './style';

const ExampleComponent = () => {
  // Hooks init (useDispatch, useHistory, useLocation, etc.)
  // App state
  // Local state
  const [displayBox, setDisplayBox] = React.useState(false)
  // Other variables declaration(useRef, useStyles...)
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();
  // Effect(s)
  React.useEffect(() => {
    (async function () {
      // todo;
    })();
    
  }, []);
  // Logic
  const modalRef = React.useRef(null);
  const handleSelectFilter = (tag) => {

  };
  // Return
  return (
    <React.Fragment>

    </React.Fragment>
  );
};

export default ExampleComponent;