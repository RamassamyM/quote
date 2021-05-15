import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  heroContent: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2, 0, 2),
    minHeight: '98px',
  },
  heroTitle: {
    color: theme.palette.text.reverted,
    fontWeight: '700',
  },
  quoteContentWrapper: {
    backgroundColor: theme.palette.background.main,
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
    maxHeight: '300px',
  },
  totalCostBar: {
    backgroundColor: theme.palette.background.variant,
    position: 'fixed',
    top: 'auto',
    bottom: 0,
    width: '100%',
    height: '74px',
  },
  separator: {
    flexGrow: 1,
  },
  quoteTotalCostText: {
    color: theme.palette.text.reverted,
    marginRight: '20px',
  },
  addABoxButton: {
    marginBottom: '10px',
  },
}));

export default useStyles;