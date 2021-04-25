import React from 'react';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import useStyles from './style';

const BoxView = (props) => {
  // Hooks init (useDispatch, useHistory, useLocation, etc.)
  // App state
  // Local state
  // const [displayBox, setDisplayBox] = React.useState(false)
  // Other variables declaration(useRef, useStyles...)
  const classes = useStyles();
  const position = props.position;
  // const preventDefault = (event) => event.preventDefault();
  // Effect(s)
  React.useEffect(() => {
    (async function () {
      // todo;
    })();
    
  }, []);
  // Logic
  // const modalRef = React.useRef(null);
  // const handleSelectFilter = (tag) => {
  //   // todo;
  // };
  // Return
  return (
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
};

export default BoxView;
