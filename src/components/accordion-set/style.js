import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
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

export default useStyles;