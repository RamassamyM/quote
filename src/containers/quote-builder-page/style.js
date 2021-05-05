import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  heroContent: {
    backgroundColor: theme.palette.grey.main,
    padding: theme.spacing(2, 0, 2),
  },
  heroTitle: {
    color: theme.palette.secondary.lighter,
    fontSize: '38px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '34px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '28px',
    },
  },
  quoteContentWrapper: {
    paddingTop: theme.spacing(2),
    minHeight: 'calc(100vh - 212px)',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'calc(100vh - 208px)',
    },
    [theme.breakpoints.down('xs')]: {
      minHeight: 'calc(100vh - 192px)',
    },
  },
  backToTopButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  emptyContent: {
    maxWidth: '400px',
  },
  emptyBoximage: {
    maxHeight: '200px',
  },
  totalCostBar: {
    backgroundColor: theme.palette.grey.main,
    position: 'fixed',
    top: 'auto',
    bottom: 0,
    width: '100%',
    height: '74px',
  },
  grow: {
    flexGrow: 1,
  },
  quoteTotalCostText: {
    color: theme.palette.white.main,
    marginRight: '20px',
  },
  addABoxButton: {
    marginBottom: '10px',
  },
}));

export default useStyles;