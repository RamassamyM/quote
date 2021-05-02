import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  heroContent: {
    backgroundColor: theme.palette.grey.main,
    // marginTop: '56px',
    padding: theme.spacing(0, 0, 2),
    [theme.breakpoints.up('sm')]: {
      // marginTop: '64px',
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
  backToTopButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  separator: {
    flexGrow: '1',
  }
}));

export default useStyles;