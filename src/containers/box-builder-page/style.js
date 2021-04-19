import { makeStyles } from '@material-ui/core/styles';

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
    // paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    minHeight: '100vh'
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
  filterSection: {
    // backgroundColor: theme.palette.white.main,
    minHeight: "80px",
  },
  filterChip: {
    border: "none",
  },
  backToTopButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

export default useStyles;